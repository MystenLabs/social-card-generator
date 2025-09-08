# Twitter OAuth Server

A simple Express server to handle Twitter OAuth 2.0 authentication flow.

## Setup

1. **Install dependencies:**

   ```bash
   cd server
   npm install
   ```

2. **Configure Twitter App:**
   - Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
   - Create a new app or use existing one
   - Set up OAuth 2.0 settings:
     - Callback URL: `http://localhost:3001/auth/twitter/callback`
     - Website URL: `http://localhost:3000`
   - Get your Client ID and Client Secret

3. **Environment Variables:**
   Update `.env` file with your Twitter credentials:

   ```
   TWITTER_CLIENT_ID=your_actual_client_id
   TWITTER_CLIENT_SECRET=your_actual_client_secret
   ```

4. **Run the server:**
   ```bash
   npm run dev    # Development with auto-reload
   npm start      # Production
   ```

## API Endpoints

- `GET /health` - Health check
- `GET /auth/twitter` - Start OAuth flow
- `GET /auth/twitter/callback` - OAuth callback (handled automatically)
- `GET /api/user/:userId` - Get user profile

## Frontend Integration

```javascript
// Start Twitter login
const response = await fetch('http://localhost:3001/auth/twitter');
const { authUrl } = await response.json();
window.location.href = authUrl;

// Handle callback (user will be redirected back to your frontend)
// Check URL params for auth=success and user data
```

## Security Notes

- This is a basic implementation for development
- In production:
  - Use secure session management
  - Store tokens in secure storage
  - Implement proper CSRF protection
  - Use HTTPS
  - Validate all requests
