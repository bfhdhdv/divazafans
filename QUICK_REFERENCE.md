# DivazaFans - Quick Reference Guide

## Key File Locations

All files are located in: `/sessions/wonderful-adoring-volta/mnt/Documents/divazafans/`

## Important File Paths

### Entry Points
- **Landing Page**: `src/app/page.tsx`
- **Layout**: `src/app/layout.tsx`
- **Styles**: `src/app/globals.css`

### Authentication
- **Login**: `src/app/auth/login/page.tsx`
- **Register**: `src/app/auth/register/page.tsx`
- **Callback**: `src/app/auth/callback/route.ts`

### Main Features
- **Dashboard**: `src/app/dashboard/page.tsx`
- **Creators Browse**: `src/app/creators/page.tsx`
- **Creator Profile**: `src/app/creators/[id]/page.tsx`
- **Messages List**: `src/app/messages/page.tsx`
- **Chat**: `src/app/messages/[id]/page.tsx`

### Libraries
- **Supabase Client**: `src/lib/supabase.ts`
- **Utilities**: `src/lib/utils.ts`

### Database
- **Schema**: `supabase/schema.sql`

## Supabase Client Setup

```typescript
import { createClient } from '@/lib/supabase'

// In client components:
const supabase = createClient()

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})
```

## Styling

### Gold Color
- Variable: `#d4af37`
- Used for: Buttons, links, highlights, borders
- Tailwind: Use `style={{ color: '#d4af37' }}` for custom gold

### Dark Backgrounds
- Primary black: `#0a0a0a`
- Card backgrounds: `bg-zinc-900`, `bg-black`
- Borders: `border-zinc-800`

### Typography
- Text color: `text-white`
- Secondary text: `text-zinc-400`
- Headings: `font-bold`

## Common Component Patterns

### Button with Gold Background
```tsx
<button
  className="px-6 py-3 rounded-lg font-semibold text-black transition hover:opacity-90"
  style={{ backgroundColor: '#d4af37' }}
>
  Click Me
</button>
```

### Card Component
```tsx
<div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-gold transition">
  {/* Content */}
</div>
```

### Navigation Link
```tsx
<Link
  href="/path"
  className="text-white hover:text-gold transition"
>
  Link Text
</Link>
```

## Form Pattern

```tsx
'use client'

const [email, setEmail] = useState('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)
  setLoading(true)

  try {
    // Your async logic here
  } catch (err) {
    setError('Error message')
  } finally {
    setLoading(false)
  }
}

return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition"
    />
    {error && <div className="text-red-400">{error}</div>}
    <button disabled={loading}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  </form>
)
```

## Grid Layouts

### 3-Column Grid (Responsive)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### 2-Column Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Items */}
</div>
```

## Database Tables Reference

### profiles
- `id` (UUID, primary key)
- `email` (text)
- `full_name` (text)
- `role` ('fan' | 'creator')
- `avatar_url` (text)
- `bio` (text)
- `is_verified` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### creators
- `id` (UUID)
- `user_id` (UUID) - references profiles
- `title` (text)
- `description` (text)
- `category` (text)
- `price_monthly` (numeric)
- `rating` (numeric)
- `followers_count` (integer)

### subscriptions
- `id` (UUID)
- `fan_id` (UUID) - references profiles
- `creator_id` (UUID) - references creators
- `tier` ('free' | 'premium' | 'vip')
- `price` (numeric)
- `is_active` (boolean)

### conversations
- `id` (UUID)
- `participant1_id` (UUID)
- `participant2_id` (UUID)

### messages
- `id` (UUID)
- `conversation_id` (UUID)
- `sender_id` (UUID)
- `content` (text)
- `is_read` (boolean)

## Common Utility Functions

### formatPrice
```typescript
import { formatPrice } from '@/lib/utils'

formatPrice(2.99)  // Returns: "€2,99"
```

### formatDate
```typescript
import { formatDate } from '@/lib/utils'

formatDate(new Date())  // Returns: "25 de febrero de 2026"
```

### cn (classname merger)
```typescript
import { cn } from '@/lib/utils'

cn('px-4 py-2', condition && 'bg-gold')
```

## Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=https://divazafans.vercel.app
```

## npm Scripts

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Image Optimization

All images are optimized with Next.js Image component:
- Supabase bucket images
- Pravatar images (for testing)

```tsx
import Image from 'next/image'

<Image
  src="https://i.pravatar.cc/150?img=1"
  alt="Description"
  width={150}
  height={150}
/>
```

## Mobile Responsive Breakpoints

- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px

Examples:
```tsx
{/* Hidden on mobile, visible on md and up */}
<div className="hidden md:flex">Desktop only</div>

{/* Visible on mobile, hidden on md and up */}
<div className="md:hidden">Mobile only</div>

{/* Different text sizes */}
<h1 className="text-3xl md:text-5xl">Responsive Heading</h1>
```

## Route Structure

```
/ ............................ Landing page
/auth/login .................... Login page
/auth/register ................. Registration page
/auth/callback ................. OAuth callback
/dashboard ..................... User dashboard
/creators ...................... Creators browse
/creators/[id] ................. Creator profile
/messages ...................... Messages list
/messages/[id] ................. Chat page
```

## Deployment Checklist

- [ ] Update environment variables in hosting platform
- [ ] Execute supabase/schema.sql in Supabase dashboard
- [ ] Enable CORS in Supabase settings
- [ ] Set up email templates in Supabase Auth
- [ ] Configure social auth providers (optional)
- [ ] Update NEXT_PUBLIC_APP_URL in .env
- [ ] Run `npm run build` to verify build
- [ ] Deploy to Vercel/Railway/Netlify

## Support

For detailed information, see:
- `README.md` - Full setup guide
- `PROJECT_SUMMARY.md` - Project overview
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs
