# Nuxt Auth Utils Demo

A full-featured authentication demo application built with Nuxt 3, showcasing OAuth integration, email magic links, role-based access control, and a modern UI using shadcn-vue components.

![Nuxt Version](https://img.shields.io/badge/Nuxt-3.x-00DC82.svg?style=flat&logo=nuxt.js)
![Vue Version](https://img.shields.io/badge/Vue-3.x-4FC08D.svg?style=flat&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat&logo=tailwind-css)

<table>
<tr>
<td width="50%">
<img src="https://github.com/user-attachments/assets/83c2c4b8-21d6-48be-9a4c-e074b9ee426e" alt="Login Screen" />
</td>
<td width="50%">
<img src="https://github.com/user-attachments/assets/e17bbfa0-74db-4ec2-aafc-3068b0c0b870" alt="Dashboard" />
</td>
</tr>
<tr>
<td align="center"><strong>Login Screen</strong></td>
<td align="center"><strong>Dashboard</strong></td>
</tr>
</table>
## Features

- 🔐 Multiple authentication methods:
  - OAuth (GitHub & Google)
  - Magic link email authentication
  - OTP (One-Time Password) verification
- 👥 Role-based access control (User/Admin)
- 🎨 Modern UI with shadcn-vue components
- 🌓 Dark/Light mode support
- 📱 Responsive design
- 🔄 Session management and refresh
- 🛡️ Protected routes with middleware
- 🗄️ PostgreSQL database with Prisma ORM

## Tech Stack

- **Framework**: Nuxt 3
- **Authentication**: nuxt-auth-utils
- **Database**: PostgreSQL + Prisma
- **UI Components**: shadcn-vue
- **Styling**: Tailwind CSS
- **Email Service**: Resend
- **Icons**: Nuxt Icon

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- GitHub OAuth application
- Google OAuth application
- Resend API key

## Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# OAuth
NUXT_SESSION_PASSWORD="your_session_password"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email
NUXT_RESEND_API_KEY="your_resend_api_key"
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nuxt-auth-utils-demo.git
cd nuxt-auth-utils-demo
```

2. Install dependencies:
```bash
bun install
```

3. Set up the database:
```bash
bun prisma generate
bun prisma db push
```

4. Start the development server:
```bash
bun run dev
```


## Features in Detail

### Authentication Flow

1. **OAuth Authentication**
   - Supports GitHub and Google OAuth providers
   - Automatically creates or updates user accounts
   - Handles email verification status

2. **Magic Link Authentication**
   - Sends secure login links via email
   - Includes OTP (One-Time Password) as backup
   - 4-hour expiration on verification tokens

3. **Role-Based Access**
   - User and Admin role support
   - Protected routes using middleware
   - Role-specific UI components and navigation

### User Interface

1. **Navigation**
   - Responsive navigation menu
   - Role-based menu items
   - Mobile-friendly drawer menu

2. **Theme Support**
   - Light/Dark mode toggle
   - System preference detection
   - Persistent theme selection

3. **Components**
   - Shadcn-vue component library
   - Custom avatar components
   - Responsive cards and layouts

## API Routes

- `/auth/github` - GitHub OAuth handler
- `/auth/google` - Google OAuth handler
- `/api/auth/email/login` - Magic link authentication
- `/api/auth/verify/otp` - OTP verification
- `/api/user/change-role` - Role management
