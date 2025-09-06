import path from 'path';
import { fileURLToPath } from 'url';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { engine } from 'express-handlebars';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { TwitterApi } from 'twitter-api-v2';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure Handlebars
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: false,
  })
);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Configure S3 client for Supabase
const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true, // Required for Supabase
  signatureVersion: 'v4', // Ensure correct signature version
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// S3 bucket configuration
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'suifest-uploads';

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://192.168.3.128:5173',
  'http://localhost:3000',
  'http://1td35nyksqqhwehzziwo0rr8ubzbh9rb42vci7u5dj3rqd0web.localhost:3000', // Your specific Walrus site
  /^http:\/\/.*\.localhost:3000$/, // Allow any subdomain on localhost:3000
  /^https:\/\/.*\.walrus\.site$/, // Future public Walrus portals
  /^http:\/\/.*\.walrus\.site$/, // Future public Walrus portals (http)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // Check if origin matches any allowed origins or patterns
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === 'string') {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// JWT Token validation middleware
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  console.log('Auth header:', authHeader);
  console.log('Extracted token:', token ? token.substring(0, 20) + '...' : 'No token');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    console.log('Token verified successfully for user:', user.username);
    req.user = user;
    next();
  });
};

// Twitter OAuth client
const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

// Store for OAuth state (in production, use Redis or database)
const oauthStates = new Map();

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Twitter OAuth server is running' });
});

// Upload image for sharing
app.post('/api/upload-image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageId = uuidv4();
    const fileExtension = req.file.originalname.split('.').pop() || 'png';
    const s3Key = `${imageId}.${fileExtension}`; // Remove uploads/ prefix

    // Upload to S3 with optimized caching for Twitter crawler
    const uploadCommand = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: s3Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      CacheControl: 'public, max-age=31536000, immutable', // Cache for 1 year (images don't change)
      Metadata: {
        'twitter-optimized': 'true',
        'uploaded-at': new Date().toISOString(),
      },
    });

    await s3Client.send(uploadCommand);

    // Return server's share URL instead of frontend URL
    const shareUrl = `${req.protocol}://${req.get('host')}/share/${imageId}`;

    res.json({
      success: true,
      shareUrl,
      imageId,
      s3Key, // Include for debugging/reference
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Serve uploaded image (optimized for Twitter crawler)
app.get('/api/image/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const userAgent = req.get('User-Agent') || '';
    const isTwitterBot = userAgent.includes('Twitterbot') || userAgent.includes('facebookexternalhit');

    // Try common image extensions
    const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
    let imageUrl = null;
    let s3Key = null;

    for (const ext of extensions) {
      s3Key = `${imageId}.${ext}`;
      try {
        // Check if the object exists by attempting to get its metadata
        await s3Client.send(
          new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: s3Key,
          })
        );

        // If we get here, the object exists
        imageUrl = `https://${S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${s3Key}`;
        break;
      } catch (error) {
        // Object doesn't exist with this extension, try next
        continue;
      }
    }

    if (!imageUrl) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // For Twitter bots, use permanent redirect with aggressive caching
    if (isTwitterBot) {
      res.set({
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Robots-Tag': 'noindex, nofollow',
      });
      return res.redirect(301, imageUrl); // Permanent redirect for bots
    }

    // For regular users, use temporary redirect
    res.redirect(302, imageUrl);
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({ error: 'Failed to serve image' });
  }
});

// Serve share page with proper meta tags for Twitter crawler
app.get('/share/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;

    // Try to find the image in S3
    const extensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
    let imageExists = false;
    let imageExtension = 'png';

    for (const ext of extensions) {
      const s3Key = `${imageId}.${ext}`;
      try {
        await s3Client.send(
          new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: s3Key,
          })
        );
        imageExists = true;
        imageExtension = ext;
        break;
      } catch (error) {
        continue;
      }
    }

    if (!imageExists) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Image Not Found</title>
        </head>
        <body>
          <h1>Image Not Found</h1>
          <p>The requested image could not be found.</p>
        </body>
        </html>
      `);
    }

    // Generate direct S3 URL for better X/Twitter compatibility
    const s3Key = `${imageId}.${imageExtension}`;
    const directImageUrl = `https://${S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${s3Key}`;
    const shareUrl = `${req.protocol}://${req.get('host')}/share/${imageId}`;

    // Optimize for Twitter crawler with aggressive caching
    res.set({
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      Vary: 'User-Agent',
    });

    res.render('share', {
      title: 'SuiFest Card',
      description: 'Check out this amazing SuiFest Card! Create your own and join the community.',
      shareUrl: shareUrl,
      imageUrl: directImageUrl,
    });
  } catch (error) {
    console.error('Error serving share page:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start Twitter OAuth flow
app.get('/auth/twitter', async (req, res) => {
  try {
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(process.env.REDIRECT_URI, {
      scope: ['tweet.read', 'users.read', 'offline.access'],
    });

    // Store the code verifier and state (in production, use session/database)
    oauthStates.set(state, { codeVerifier, timestamp: Date.now() });

    // Clean up old states (older than 10 minutes)
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    for (const [key, value] of oauthStates.entries()) {
      if (value.timestamp < tenMinutesAgo) {
        oauthStates.delete(key);
      }
    }

    res.json({ authUrl: url });
  } catch (error) {
    console.error('Error generating Twitter auth link:', error);
    res.status(500).json({ error: 'Failed to generate auth link' });
  }
});

// Handle Twitter OAuth callback
app.get('/auth/twitter/callback', async (req, res) => {
  const { code, state } = req.query;

  try {
    // Retrieve the stored code verifier
    const storedData = oauthStates.get(state);
    if (!storedData) {
      throw new Error('Invalid or expired state parameter');
    }

    const { codeVerifier } = storedData;
    oauthStates.delete(state); // Clean up

    // Exchange code for access token
    const {
      client: loggedClient,
      accessToken,
      refreshToken,
    } = await twitterClient.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: process.env.REDIRECT_URI,
    });

    // Get user information
    const user = await loggedClient.v2.me({
      'user.fields': ['profile_image_url', 'public_metrics', 'verified'],
    });

    // Generate JWT token for the user
    const jwtToken = jwt.sign(
      {
        id: user.data.id,
        username: user.data.username,
        name: user.data.name,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userData = {
      id: user.data.id,
      username: user.data.username,
      name: user.data.name,
      profileImageUrl: user.data.profile_image_url,
      verified: user.data.verified,
      publicMetrics: user.data.public_metrics,
      token: jwtToken, // JWT token for API authentication
    };

    // Redirect back to frontend with user data
    const frontendUrl = new URL(process.env.FRONTEND_URL);
    frontendUrl.searchParams.set('auth', 'success');
    frontendUrl.searchParams.set('user', encodeURIComponent(JSON.stringify(userData)));

    res.redirect(frontendUrl.toString());
  } catch (error) {
    console.error('Twitter OAuth callback error:', error);

    // Redirect to frontend with error
    const frontendUrl = new URL(process.env.FRONTEND_URL);
    frontendUrl.searchParams.set('auth', 'error');
    frontendUrl.searchParams.set('message', error.message);

    res.redirect(frontendUrl.toString());
  }
});

// Get user profile (protected route)
app.get('/api/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await twitterClient.v2.user(userId, {
      'user.fields': ['profile_image_url', 'public_metrics', 'verified'],
    });

    res.json(user.data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Export for Vercel
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Twitter OAuth server running on http://localhost:${PORT}`);
    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`🔄 Redirect URI: ${process.env.REDIRECT_URI}`);
  });
}
