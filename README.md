# Omnibox Help

Omnibox help center for feedback and account migration - a React-based web application for collecting user feedback and facilitating WeChat account migrations.

## Features

- **Issue Feedback**: Comprehensive feedback form with image upload support, categorized feedback types, and contact information collection
- **WeChat Account Migration**: Step-by-step migration process for WeChat accounts with QR code scanning and account binding
- **Multi-language Support**: Internationalization with i18next
- **Responsive Design**: Mobile-friendly interface with touch support
- **Dark Mode**: Theme switching capability

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router DOM v7
- **UI Components**: Radix UI + TailwindCSS + shadcn/ui
- **Forms**: React Hook Form + Zod validation  
- **Styling**: TailwindCSS with custom animations
- **Internationalization**: i18next + react-i18next
- **HTTP Client**: Axios
- **Package Manager**: pnpm

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build production version
pnpm build

# Preview production build
pnpm preview

# Lint and format code
pnpm lint
pnpm format
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_REMOVE_GENERATED_CITE=FALSE
VITE_API_PATH=http://127.0.0.1:8000
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── button/         # Custom button components
│   ├── input/          # Custom input components
│   └── ...
├── pages/              # Page components
│   ├── feedback/       # Feedback form page
│   └── migration/      # WeChat migration pages
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization setup
├── lib/                # Utility functions and API client
└── layout/             # Layout components
```

## Docker Deployment

```bash
# Build image
docker build -t omnibox-help .

# Run container
docker run -p 3000:3000 omnibox-help
```

## Code Quality

The project uses:
- **ESLint** + **Prettier** for code formatting
- **Husky** + **lint-staged** for pre-commit hooks
- **Commitlint** for conventional commit messages
- **TypeScript** for type safety
