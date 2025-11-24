# CampusThrift Frontend

A modern Next.js application for a campus marketplace platform. Users can buy, sell, and rent items within their campus community, with a dedicated "Night Market" section for hostel essentials.

## Features

- **Buy & Sell**: Browse and list items for sale
- **Rent & Borrow**: Request items for short-term use
- **Night Market**: Late-night essentials delivered to hostels
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG compliant with semantic HTML
- **Error Handling**: Graceful error boundaries and user feedback

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm/bun

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env.local
```

### Development Server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── auth/           # Authentication pages
│   ├── create-listing/ # Create product listing
│   ├── marketplace/    # Main marketplace view
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home/landing page
│   ├── error.tsx       # Error boundary
│   └── not-found.tsx   # 404 page
├── components/         # Reusable components
│   ├── ui/            # Shadcn UI components
│   ├── Navbar.tsx     # Navigation component
│   ├── ProductCard.tsx # Product display card
│   └── FormField.tsx  # Reusable form input
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── assets/            # Images and static files
```

## Best Practices Implemented

### 1. **Accessibility**
- Semantic HTML with proper heading hierarchy
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management with ring indicators
- Alt text for images
- Form error states with `aria-invalid`

### 2. **Performance**
- Image optimization with `next/image`
- Lazy loading for images
- Responsive image sizes
- Code splitting via Next.js
- CSS optimization with Tailwind

### 3. **Code Quality**
- TypeScript for type safety
- Component composition
- Reusable form components
- Proper error handling
- Loading states management

### 4. **Mobile-First Design**
- Responsive Navbar with mobile menu
- Touch-friendly button sizes
- Flexible grid layouts
- Optimized for all screen sizes

### 5. **User Experience**
- Error boundaries with fallback UI
- 404 Not Found page
- Loading states on buttons
- Form validation feedback
- Visual feedback on interactions

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Creating New Pages

1. Create a file in `src/app/` following Next.js conventions
2. Use the layout from existing pages as a template
3. Wrap with `<Navbar />` for consistent navigation
4. Use semantic HTML with proper heading hierarchy
5. Include proper error handling

## Creating New Components

1. Create component in `src/components/`
2. Use TypeScript interfaces for props
3. Add proper accessibility attributes
4. Export as named export
5. Example:

```typescript
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  onAction 
}) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};
```

## Form Handling

Use the `FormField` component for consistent form inputs:

```typescript
import { FormField } from "@/components/FormField";

<FormField
  label="Email"
  type="email"
  placeholder="user@college.edu"
  error={errors.email}
  helperText="Use your college email"
/>
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | `http://localhost:3001/api` |

## Troubleshooting

### Images not showing
- Check that image files exist in `src/assets/`
- Verify the import path is correct
- Ensure Next.js has permissions to access the file

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

### Styling issues
- Make sure Tailwind CSS is properly configured in `tailwind.config.ts`
- Clear browser cache or restart dev server
- Verify class names match Tailwind conventions

## Contributing

1. Follow the project structure
2. Maintain TypeScript types
3. Add comments for complex logic
4. Test on multiple screen sizes
5. Check accessibility with keyboard navigation

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

## License

This project is part of CampusThrift - Campus Marketplace Initiative
