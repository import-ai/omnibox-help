# Omnibox Help

Operations management platform providing issue feedback and account migration features.

## Features

- **Issue Feedback**: Collect and manage user feedback
- **Account Migration**: Help users securely migrate account data

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- TailwindCSS

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build

# Start production server
npm start
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=Omnibox Operation
```

## Docker Deployment

```bash
# Build image
docker build -t omnibox-help .

# Run container
docker run -p 3000:3000 omnibox-help
```
