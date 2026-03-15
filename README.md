# Bandhu - Disaster Preparedness App

## Project Structure

```
BANDHU/
├── frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── components/   # UI components (Navbar, shadcn/ui)
│   │   ├── contexts/     # React context (Auth)
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # API client, utilities
│   │   └── pages/        # Page components
│   ├── public/
│   └── package.json
├── backend/           # Express API server
│   ├── src/
│   │   ├── routes/       # API routes (auth, profile, scores, etc.)
│   │   ├── middleware/   # Auth middleware
│   │   └── lib/          # Supabase client
│   ├── database-setup.sql
│   └── package.json
└── package.json       # Root scripts
```

## Getting Started

```sh
# Install all dependencies
npm run install:all

# Run both frontend and backend
npm run dev

# Or run separately:
npm run dev:frontend   # http://localhost:8080
npm run dev:backend    # http://localhost:3001
```

## Environment Variables

**frontend/.env.local**
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_API_URL=http://localhost:3001/api
```

**backend/.env**
```
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
PORT=3001
```

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e9f70013-c2bf-45f9-95b8-2b320470474d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
