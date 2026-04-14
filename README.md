# Rahul Mahesh — Portfolio Website

A modern, high-performance portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Featuring project case studies with modal popups, advanced filtering, and a design system inspired by clean, bold typography.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS v4
- **Animated Hero Section**: Eye-catching hero with gradient blobs and smooth animations
- **Project Showcase**: Grid layout with filters, search, and sortable projects
- **Modal Case Studies**: Deep-linkable modal popups for project details
- **MDX Support**: Write case studies in MDX with custom components
- **Design System**: Custom color palette with brand colors (iris, mint, amber, coral)
- **Dark Mode**: Full dark mode support with system preference detection
- **Accessibility**: WCAG AA compliant, keyboard navigable, screen reader friendly
- **Performance**: Optimized images, lazy loading, sub-2.5s LCP
- **SEO**: Metadata, Open Graph, sitemap, robots.txt
- **Responsive**: Mobile-first design, 320px → 1536px+

## 📦 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **MDX**: [@next/mdx](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- **Content**: MDX with gray-matter, remark-gfm, rehype-pretty-code

## 🎨 Brand Colors

```css
--iris: #7C5CFC    /* Primary accent */
--mint: #00D1B2    /* Secondary accent */
--amber: #FFB703   /* Tertiary accent */
--coral: #FF5A5F   /* Quaternary accent */
--ink: #0B0B0C     /* Dark text */
--paper: #F7F7F7   /* Light background */
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone or download the project**

```bash
cd portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

4. **Open browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Homepage
│   ├── work/              # Work index and project pages
│   │   ├── page.tsx       # Projects grid with filters
│   │   ├── work-client.tsx
│   │   └── [slug]/        # Dynamic project routes
│   │       ├── page.tsx
│   │       └── project-detail.tsx
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── ui/               # shadcn/ui primitives
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   ├── hero-section.tsx  # Animated hero
│   ├── project-card.tsx  # Project card component
│   ├── filter-chips.tsx  # Multi-select filters
│   ├── search-input.tsx  # Search with Cmd+K
│   └── ...
├── content/              # MDX content
│   └── projects/         # Project case studies
│       ├── onboarding-conversion-uplift.mdx
│       ├── design-system-revamp.mdx
│       └── pricing-paywall-optimization.mdx
├── lib/                  # Utilities
│   ├── mdx.ts           # MDX file reading
│   ├── projects.ts      # Project filtering/sorting
│   └── utils.ts         # Utility functions
├── types/               # TypeScript types
│   └── project.ts       # Project data types
├── public/              # Static assets
│   ├── images/          # Project covers, etc.
│   └── cv.pdf           # Downloadable CV
└── mdx-components.tsx   # Custom MDX components
```

## 📝 Adding a New Project

1. **Create MDX file** in `content/projects/`

```mdx
---
title: "Your Project Title"
year: 2024
role: ["Product Design", "UX Research"]
tags: ["Tag1", "Tag2", "Tag3"]
impact_metric: "+25% conversion"
summary: "Brief one-liner about the project"
cover: "/images/projects/your-project-cover.jpg"
team: ["Designer", "Engineer", "PM"]
tools: ["Figma", "React"]
timeline: "8 weeks"
featured: true
links:
  prototype: "https://..."
  live: "https://..."
---

## Overview

Your content here...

## Problem

Describe the problem...

## Outcomes

Results and impact...
```

2. **Add cover image** to `public/images/projects/`

3. **Project automatically appears** on homepage and work page

## 🎨 Design System

### Typography

- **Display Font**: Inter Variable
- **Body Font**: Inter Variable (1.05–1.15 line-height)
- **Scales**: Fluid type with clamp()

### Spacing

8px base unit scale:
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px

### Motion

- **Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- **Durations**: 180–320ms
- **Respects**: `prefers-reduced-motion`

## ♿ Accessibility

- **WCAG AA compliant** color contrast (4.5:1 for text)
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Focus management**: Visible focus rings, focus trap in modals
- **Screen reader friendly**: Semantic HTML, ARIA labels
- **Reduced motion support**: Disables animations for users who prefer reduced motion

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Build for Production

```bash
npm run build
npm start
```

## 📊 Performance Targets

- **CLS**: < 0.05
- **LCP**: < 2.5s on 4G
- **TBT**: < 200ms
- **Lighthouse**: ≥ 95 (Performance/Accessibility/Best Practices/SEO)

## 🧪 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 📄 License

This project is open source and available for personal and commercial use.

## 👤 Author

**Rahul Mahesh**
- Website: [rahulmahesh.design](https://rahulmahesh.design)
- LinkedIn: [linkedin.com/in/rahulmahesh](https://linkedin.com)
- Email: hello@rahulmahesh.design

---

**Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion**
