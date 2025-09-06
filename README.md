# SuiFest Card Generator

Create your own SuiFest 2025 card and share it on social media!

## Features

- 🎨 Custom card templates
- 👤 Twitter login integration
- 📸 Profile picture upload
- 🚀 Share on X (Twitter) with Open Graph metadata
- 📱 Responsive design
- 🎯 Real-time preview

## Setup

### Frontend

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

3. Start the development server:

```bash
pnpm dev
```

### Backend

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
pnpm install
```

3. Create `.env` file in the server directory:

```env
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
REDIRECT_URI=http://localhost:3001/auth/twitter/callback
FRONTEND_URL=http://localhost:5173
```

4. Start the server:

```bash
pnpm dev
```

## Share on X Feature

The Share on X functionality works as follows:

1. **Image Capture**: When users click "Share on X", the app captures the current card as an image using html2canvas
2. **Image Upload**: The image is uploaded to the server and stored temporarily (24-hour cleanup)
3. **URL Generation**: A shareable URL is generated with the format `http://localhost:3001/share/{imageId}`
4. **Twitter Share Intent**: The app opens Twitter's share intent with the generated URL
5. **Twitter Crawler**: When the URL is shared, Twitter's crawler visits the server endpoint and sees the proper meta tags
6. **Image Display**: Twitter displays the card image in the tweet with proper Open Graph metadata

### How Twitter Crawling Works

The server serves a dedicated HTML page at `/share/{imageId}` that includes:

```html
<!-- Open Graph tags for Facebook/Twitter --> <meta
  property="og:image"
  content="http://localhost:3001/api/image/{imageId}"
/> <meta property="og:title" content="SuiFest 2025 Card" /> <meta
  property="og:description"
  content="Check out this amazing SuiFest 2025 card!"
/> <!-- Twitter Card tags --> <meta name="twitter:card" content="summary_large_image" /> <meta
  name="twitter:image"
  content="http://localhost:3001/api/image/{imageId}"
/>
```

When Twitter crawls the URL, it fetches the image from `/api/image/{imageId}` and displays it in the tweet.

### API Endpoints

- `POST /api/upload-image` - Upload card image and get share URL
- `GET /api/image/:imageId` - Serve uploaded image
- `GET /share/:imageId` - Serve share page with meta tags for crawlers

## Technologies Used

- **Frontend**: React, TypeScript, Vite, TanStack Router, Tailwind CSS
- **Backend**: Node.js, Express, Multer
- **Authentication**: Twitter OAuth 2.0
- **Image Processing**: html2canvas
- **Deployment**: Vercel (Backend), Walrus Sites (Frontend)

## Testing the Share Feature

1. Create a card and go to the preview page
2. Click "Share on X" button
3. The image will be uploaded and a share URL generated
4. Twitter share intent will open with the URL
5. When shared, the tweet will show the card image

The share URL format will be: `http://localhost:3001/share/{unique-id}`

## Walrus Sites Deployment

The frontend is deployed on Walrus Sites, a decentralized web hosting solution built on Sui blockchain.

### Current Deployment

- **Site Object ID**: `0xed3720de02f5b18b1cb78a66b12ccf0b10f7ccb524509a0e26f9633fad9424d0`
- **Site URL**: `https://5wudzi8iqzioeqx68ypaj74hvvasp62qj57u32xl1c2sogycpc.wal.app`
- **Base36 ID**: `5wudzi8iqzioeqx68ypaj74hvvasp62qj57u32xl1c2sogycpc`
- **Wallet Address**: `0x9cdb991bd39f8b61b83c6606f63f2abf4bcac75d27e412b64f5d7e3d49286f94`

### Prerequisites

1. **Install Walrus CLI**:

   ```bash
   # Install Walrus CLI (if not already installed)
   # Follow instructions at: https://docs.wal.app/walrus/installation.html
   ```

2. **Install Site Builder**:

   ```bash
   # Install site-builder (if not already installed)
   # Follow instructions at: https://docs.wal.app/walrus-sites/tutorial-publish.html
   ```

3. **Configure Walrus**:
   - Ensure you have Walrus configuration at `~/.config/walrus/client_config.yaml`
   - Ensure you have Sites configuration at `~/.config/walrus/sites-config.yaml`
   - Make sure your Sui wallet is configured and has testnet SUI tokens

### Deployment Commands

#### Initial Deployment

```bash
# Build the project
npm run build

# Deploy new site (first time)
site-builder deploy ./dist
```

#### Update Existing Site

```bash
# Build the project
npm run build

# Update existing site (recommended)
site-builder update --epochs 5 ./dist 0xed3720de02f5b18b1cb78a66b12ccf0b10f7ccb524509a0e26f9633fad9424d0
```

#### Check Deployment Status

```bash
# Get site information and resource list
site-builder sitemap 0xed3720de02f5b18b1cb78a66b12ccf0b10f7ccb524509a0e26f9633fad9424d0

# Convert object ID to Base36 for URL
site-builder convert 0xed3720de02f5b18b1cb78a66b12ccf0b10f7ccb524509a0e26f9633fad9424d0

# Check blob status (example with index.html blob)
walrus blob-status --blob-id <blob-id>
```

### Troubleshooting

#### Site Returns 404

- **Cause**: Blobs may have expired (Walrus blobs have expiration dates)
- **Solution**: Redeploy/update the site to refresh expired blobs

#### Build Issues

- Ensure all dependencies are installed: `pnpm install`
- Check that the build completes successfully: `npm run build`
- Verify `dist/` directory contains all necessary files

#### Configuration Issues

- Verify Walrus configuration files exist and are properly configured
- Ensure you have sufficient SUI tokens in your testnet wallet
- Check that your wallet address matches the one in `sites-config.yaml`

### Important Notes

1. **Blob Expiration**: Walrus blobs have expiration dates. Monitor your site and redeploy when blobs expire.

2. **Gas Costs**: Each deployment/update consumes SUI tokens for gas fees.

3. **Build Before Deploy**: Always run `npm run build` before deploying to ensure you're deploying the latest version.

4. **Resource Files**: The `dist/ws-resources.json` file contains the site object ID - don't delete this file.

### Portal URLs

- **Official Portal**: `https://<site-id>.wal.app` (Mainnet only)
- **Local Portal**: `http://<site-id>.localhost:3000` (Testnet/Development)
- **Alternative Portals**: Other Walrus portals may become available in the future

### Local Portal Setup (For Testnet Access)

Since there's no public portal for testnet sites, you need to run a local portal to access your testnet deployment:

#### Prerequisites

- [Bun](https://bun.sh/) runtime installed

#### Setup Steps

1. **Clone Walrus Sites repository**:

   ```bash
   git clone https://github.com/MystenLabs/walrus-sites.git
   cd walrus-sites
   git checkout mainnet  # Use stable branch
   ```

2. **Configure for testnet**:

   ```bash
   cp ./portal/server/.env.testnet.example ./portal/server/.env.local
   ```

3. **Install Bun** (if not already installed):

   ```bash
   curl -fsSL https://bun.sh/install | bash
   export PATH="$HOME/.bun/bin:$PATH"
   ```

4. **Install dependencies**:

   ```bash
   cd portal
   bun install
   ```

5. **Start the portal**:

   ```bash
   bun run server
   ```

6. **Access your site**:
   - Portal running on: `http://localhost:3000`
   - Your site URL: `http://5wudzi8iqzioeqx68ypaj74hvvasp62qj57u32xl1c2sogycpc.localhost:3000`

#### Portal Configuration

The testnet portal is configured with:

- **Aggregator URL**: `https://aggregator.walrus-testnet.walrus.space`
- **RPC URL**: `https://fullnode.testnet.sui.io`
- **Site Package**: `0xf99aee9f21493e1590e7e5a9aea6f343a1f381031a04a732724871fc294be799`
- **Network**: `testnet`
- **Metrics Port**: `9184` (Prometheus)

#### Troubleshooting Portal

- If subdomain resolution doesn't work, add to `/etc/hosts`:
  ```
  127.0.0.1 5wudzi8iqzioeqx68ypaj74hvvasp62qj57u32xl1c2sogycpc.localhost
  ```
- Check portal logs for any RPC or blob fetching errors
- Ensure all site blobs haven't expired (check with `walrus blob-status`)

### Deployment Comparison

| Aspect            | Testnet                   | Mainnet                 |
| ----------------- | ------------------------- | ----------------------- |
| **Portal Access** | Local portal required     | Public `wal.app` portal |
| **Cost**          | Free (testnet tokens)     | Real WAL/SUI tokens     |
| **Stability**     | May be wiped periodically | Production stable       |
| **Public Access** | Local only                | Globally accessible     |
| **Use Case**      | Development/Testing       | Production deployment   |
