# 🎓 G-Scores Frontend

> Frontend application for G-Scores - High School Exam Score Management System (THPT 2024)

A modern, responsive web application built with Next.js 16, React 19, and Tailwind CSS v4 for viewing and analyzing Vietnamese high school exam scores from the 2024 academic year.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwind-css)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Features Implementation](#features-implementation)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

## ✨ Features

### Core Features

- 🔍 **Score Lookup**: Search exam scores by registration number (7-8 digits, auto-normalized)
- 📊 **Score Distribution Reports**: Visual reports with 4 performance levels:
  - Excellent (Giỏi): ≥ 8 points
  - Good (Khá): 6.5-8 points
  - Average (Trung bình): 5-6.5 points
  - Poor (Yếu): < 5 points
- 📈 **Subject Statistics**: Interactive charts with bar, pie, and line visualizations
- 🏆 **Top 10 Group A**: Leaderboard ranking by Math + Physics + Chemistry total
- 🌍 **Internationalization**: Vietnamese (default) and English
- 🎨 **Dark Mode**: Automatic theme switching with next-themes
- 🔄 **Unified Loading States**: Consistent loading spinners across all pages

## 🛠 Tech Stack

### Core Technologies

- **Framework**: [Next.js 16.1](https://nextjs.org/) (React Framework with App Router)
- **UI Library**: [React 19.2](https://react.dev/)
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS plugin

### UI Components & Utilities

- **Component Library**: [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) - Vietnamese & English support
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **Component Variants**: `class-variance-authority` - Type-safe component variants
- **CSS Utilities**: `clsx` & `tailwind-merge` - Dynamic class names
- **Icons**: `lucide-react` - Beautiful open-source icons

### Development Tools

- **Linting**: ESLint 9 with Next.js configuration
- **Build Tool**: Turbopack (Next.js 16 default)
- **HTTP Client**: Native Fetch API with custom wrapper

## 📦 Prerequisites

Before running this application, make sure you have:

- **Node.js** >= 18.x
- **npm** or **yarn** or **pnpm**
- **Backend API** running at `http://localhost:5000` (see g-scores-backend README)
- **Backend Database**: MongoDB Atlas with seeded data (1,061,605 records)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/g-scores-frontend.git
cd g-scores-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

## ⚙️ Configuration

**Environment variables** (Optional):

The app uses `http://localhost:5000` as default backend URL. To change it:

```bash
# Create .env.local file
echo NEXT_PUBLIC_API_URL=http://localhost:5000 > .env.local
```

**Important Notes:**

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- The backend API must be running before starting the frontend
- Default API URL is already configured in `lib/api.ts`

## 🎯 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
g-scores-frontend/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalized routes
│   │   ├── layout.tsx       # Main layout with sidebar
│   │   ├── page.tsx         # Dashboard page
│   │   ├── check-score/     # Score lookup page
│   │   ├── statistics/      # Statistics page
│   │   ├── top10/           # Top 10 leaderboard
│   │   │   └── reports/        # Score reports page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles with Tailwind
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── loading-spinner.tsx  # Unified loading component
│   │   └── ...              # Other UI components
│   ├── dashboard-overview.tsx
│   ├── score-checker.tsx
│   ├── statistics.tsx
│   ├── top10-group-a.tsx
│   ├── score-reports.tsx
│   ├── sidebar.tsx
│   └── theme-provider.tsx
├── lib/                     # Utility libraries
│   ├── api.ts               # API client with fetch wrapper
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions (cn)
├── messages/                # i18n translation files
│   ├── vi.json              # Vietnamese translations
│   └── en.json              # English translations
├── public/                  # Static assets
├── components.json          # shadcn/ui configuration
├── i18n.ts                  # next-intl configuration
├── next.config.ts           # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🎨 Features Implementation

### 1. Score Lookup Feature

**Location**: `app/[locale]/check-score/page.tsx`  
**Component**: `components/score-checker.tsx`

```typescript
import { api } from "@/lib/api";

// Auto-normalizes SBD (removes leading zeros)
const result = await api.checkScore(normalizedSBD);
```

Features:

- 7-8 digit SBD validation
- Auto-normalization (01000001 → 1000001)
- Subject scores table with performance levels
- Color-coded score display

### 2. Statistics Dashboard

**Location**: `app/[locale]/statistics/page.tsx`  
**Component**: `components/statistics.tsx`

Displays interactive **Recharts** visualizations:

- Bar chart: Distribution across 4 levels
- Pie chart: Percentage breakdown
- Line chart: Trend analysis
- Subject-wise statistics with averages

### 3. Score Reports

**Location**: `app/[locale]/reports/page.tsx`  
**Component**: `components/score-reports.tsx`

Shows score distribution by subject:

- 4 performance levels with counts
- Gradient progress bars
- Percentage calculations
- Interactive subject selector

### 4. Top 10 Group A Leaderboard

**Location**: `app/[locale]/top10/page.tsx`  
**Component**: `components/top10-group-a.tsx`

Features:

- Ranking table with medal icons (🥇🥈🥉)
- Total scores (Math + Physics + Chemistry)
- Individual subject breakdown
- Color-coded score badges

### 5. shadcn/ui Components

Installed components:

- `button`, `card`, `input`, `label`, `select`, `tabs`
- `table`, `badge`, `alert`, `dropdown-menu`, `form`
- Custom: `loading-spinner` (unified loading states)

## 💻 Development

### Using the API Client

The project includes a custom API client in `lib/api.ts`:

```typescript
import { api } from "@/lib/api";

// GET request
const data = await api.get<ResponseType>("/api/endpoint");

// POST request
const result = await api.post<ResponseType>("/api/endpoint", { data });

// Error handling
try {
  const scores = await api.get("/api/scores/12345678");
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}: ${error.message}`);
  }
}
```

### Adding New Pages

1. Create new page in `app/` directory:

```tsx
// app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page</div>;
}
```

2. Add route to navigation
3. Update types in `lib/types.ts` if needed

### Styling Guidelines

This project uses **Tailwind CSS v4** with PostCSS plugin:

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-family-sans: "Rubik", sans-serif;
}
```

**Best Practices:**

- Use Tailwind utility classes
- Use `clsx` for conditional classes
- Use `cn()` utility from `lib/utils.ts` for merging classes
- Follow responsive-first approach (`md:`, `lg:` prefixes)

### React Hooks Usage

This project extensively uses React Hooks:

- ✅ `useState` - Component state management
- ✅ `useEffect` - Side effects and data fetching
- ✅ `useContext` - Global state (if implemented)
- ✅ `useMemo` - Performance optimization
- ✅ `useCallback` - Memoized callbacks

## 📱 Responsive Design

Breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Example:

```tsx
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">G-Scores Dashboard</h1>
</div>
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git push origin main
```

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy!

3. **Set Environment Variables on Vercel**

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

### Deploy to Fly.io

```bash
fly launch
fly deploy
```

## 🔧 Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Build production-optimized bundle        |
| `npm start`     | Start production server                  |
| `npm run lint`  | Run ESLint for code quality              |

## 🌐 Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ (Performance)
- 🎯 **First Contentful Paint**: < 1.5s
- 🚀 **Time to Interactive**: < 3s
- 📦 **Bundle Size**: Optimized with Next.js code splitting

## 🔒 Environment Variables

| Variable              | Description          | Required | Default                 |
| --------------------- | -------------------- | -------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes      | `http://localhost:5000` |

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
# or
lsof -ti:3000 | xargs kill -9
```

### API Connection Issues

1. Verify backend is running at `http://localhost:5000`
2. Check CORS configuration in backend
3. Verify `.env` file has correct `NEXT_PUBLIC_API_URL`

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📝 License

This project is part of the **Golden Owl Web Developer Intern Assignment**.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Golden Owl](https://goldenowl.asia/) for the internship opportunity
- Vietnamese Ministry of Education for the THPT 2024 data

## 📚 Additional Resources

- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Made with ❤️ for Golden Owl Internship Assignment**
