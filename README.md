# Gabriel Transportation Limited

A modern transportation booking and management platform built with React, Node.js, and PostgreSQL.

## Features

- User authentication (sign up/login)
- Browse and search transportation options
- Real-time booking system
- User dashboard and booking history
- Admin panel for managing routes and vehicles
- Payment integration ready

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT tokens

## Project Structure

```
gabriel-transportation-limited/
├── frontend/                 # React frontend
├── backend/                  # Node.js backend
├── database/                 # Database migrations and seeds
└── docs/                     # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd backend && npm install`
4. Set up environment variables (see `.env.example` files)
5. Run database migrations: `cd backend && npm run migrate`
6. Start the development servers

## Development

- Frontend: `cd frontend && npm start`
- Backend: `cd backend && npm run dev`

## License

MIT