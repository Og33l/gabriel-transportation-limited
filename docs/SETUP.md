# Gabriel Transportation Limited - Complete Setup Guide

## Prerequisites

- Node.js v16 or higher
- PostgreSQL v12 or higher
- npm or yarn

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Update the `.env` file with your PostgreSQL credentials:

```
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gabriel_transportation
JWT_SECRET=your-secret-key-change-this
NODE_ENV=development
```

### 3. Database Setup

```bash
# Create database
creatdb gabriel_transportation

# Run migrations
npm run migrate
```

### 4. Start Backend Server

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

### 3. Start Frontend Development Server

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Running the Application

1. Make sure PostgreSQL is running
2. Start the backend server: `cd backend && npm run dev`
3. In a new terminal, start the frontend: `cd frontend && npm start`
4. Open your browser and go to `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Routes

- `GET /api/routes` - Get all available routes
- `GET /api/routes?departure=city&arrival=city` - Search routes
- `GET /api/routes/:id` - Get specific route
- `POST /api/routes` - Create new route (admin)

### Bookings

- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:user_id` - Get user's bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking

## Troubleshooting

### Database Connection Error

- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify the database exists: `psql -l`

### Port Already in Use

- Change the PORT in `.env` (default: 5000)
- For frontend, set the port: `PORT=3001 npm start`

### CORS Errors

- Ensure backend CORS is configured correctly
- Check that frontend and backend URLs are properly set

## Next Steps

- Add payment integration (Stripe, PayPal)
- Implement admin dashboard
- Add real-time notifications
- Implement vehicle/driver management
- Add rating and review system
- Set up production deployment