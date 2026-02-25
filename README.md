# DivazaFans - Luxury Dark Marketplace for Content Creators

A premium Next.js 14 platform for exclusive content creators to connect with fans, share exclusive content, and monetize their creations.

## Features

- **Beautiful Dark UI** with gold accents (#d4af37)
- **Authentication** with Supabase (Email/Password)
- **Creator Profiles** with subscription tiers (Free, Premium €2.99, VIP €5.99)
- **Fan Dashboard** for managing subscriptions
- **Real-time Messaging** between creators and fans
- **Creator Discovery** with search and category filtering
- **Responsive Design** optimized for mobile and desktop
- **Database** with PostgreSQL on Supabase including RLS policies and triggers

## Tech Stack

- **Framework**: Next.js 14.2.5
- **React**: 18
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Utilities**: clsx, date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
4. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_APP_URL=https://divazafans.vercel.app
   ```

5. Set up the database:
   - Go to Supabase dashboard
   - Create a new project
   - Open SQL Editor
   - Copy contents of `supabase/schema.sql`
   - Execute the SQL to create tables and policies

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
divazafans/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css              # Global styles
│   │   ├── auth/
│   │   │   ├── login/page.tsx       # Login page
│   │   │   ├── register/page.tsx    # Registration page
│   │   │   └── callback/route.ts    # OAuth callback
│   │   ├── dashboard/page.tsx       # User dashboard
│   │   ├── creators/
│   │   │   ├── page.tsx             # Creators browse page
│   │   │   └── [id]/page.tsx        # Creator profile page
│   │   └── messages/
│   │       ├── page.tsx             # Messages list
│   │       └── [id]/page.tsx        # Chat page
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client
│   │   └── utils.ts                 # Utility functions
│   ├── components/                  # Reusable components
│   └── hooks/                       # Custom hooks
├── public/                          # Static files
├── supabase/
│   └── schema.sql                   # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Database Schema

The Supabase database includes:

- **profiles** - User profiles with role (fan/creator)
- **creators** - Creator profile information
- **subscriptions** - Fan subscriptions to creators
- **conversations** - Message conversations
- **messages** - Individual messages with realtime support

All tables include:
- Row Level Security (RLS) policies
- Automatic `updated_at` triggers
- Proper indexes for performance
- Realtime subscriptions enabled for messages

## Features

### For Fans
- Discover and browse creators
- Search and filter by category
- Subscribe to creators
- Receive exclusive content
- Direct messaging with creators
- Manage subscriptions

### For Creators
- Create exclusive content
- Set subscription tiers
- Manage subscribers
- Direct messaging with fans
- View analytics (ready for enhancement)

## Customization

### Styling
- Gold color: `#d4af37`
- Dark backgrounds: `#0a0a0a`, `#000000`
- Zinc backgrounds: `#18181b`, `#27272a`, `#3f3f46`

All colors can be customized in `tailwind.config.js` and `src/app/globals.css`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

```bash
npm run build
npm start
```

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
