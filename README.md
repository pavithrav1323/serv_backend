# Attendance System Backend

A full-featured backend for an attendance and workforce management application, built with **NestJS**, **Prisma**, and **PostgreSQL**.

## Features
- User authentication (JWT, password-based)
- Profile management
- Attendance check-in/check-out, timer, history
- Leave/overtime/other requests
- Task (MyServ) assignment and submission
- Team management
- User reports
- Rewards and redemption
- Shift management
- Emergency alert endpoint
- Utilities: geocode (mock), notifications (mock)
- Admin endpoints for user/attendance/shift management

## Project Structure
```
src/
  ├── admin/
  ├── attendance/
  ├── auth/
  ├── emergency/
  ├── prisma/
  ├── reports/
  ├── requests/
  ├── rewards/
  ├── shifts/
  ├── tasks/
  ├── teams/
  ├── users/
  ├── utilities/
  ├── app.module.ts
  └── main.ts
```

## Getting Started

### 1. Clone the repository
```
git clone <your-repo-url>
cd Attendence-System
```

### 2. Install dependencies
```
npm install
```

### 3. Configure Environment Variables
Edit the `.env` file:
```
DATABASE_URL="postgresql://username:password@localhost:5432/attendance_system?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 4. Set up the Database
Make sure PostgreSQL is running and the database exists.

### 5. Run Prisma Migrations
```
npx prisma migrate dev --name init
```

### 6. Generate Prisma Client
```
npx prisma generate
```

### 7. Start the Server
```
npm run start:dev
```

Visit [http://localhost:3000/api/docs](http://localhost:3000/api/docs) for Swagger API documentation and testing.

## API Overview
- **Authentication**: `/api/register`, `/api/login`, `/api/logout`, `/api/change-password`
- **Profile**: `/api/profile`, `/api/profile/update`, `/api/user/:id`
- **Attendance**: `/api/attendance/check-in`, `/api/attendance/check-out`, `/api/attendance/timer`, `/api/attendance/history`, `/api/attendance/quote`
- **Requests**: `/api/requests`, `/api/requests/my`, `/api/requests/all`, `/api/requests/:id`
- **Tasks (MyServ)**: `/api/myserv/tasks`, `/api/myserv/tasks/submit`, `/api/myserv/history`
- **Teams**: `/api/teams`, `/api/teams/:id`, `/api/teams/:id/members`, `/api/teams/my/teams`
- **Reports**: `/api/reports`, `/api/reports/my`, `/api/reports/all`, `/api/reports/:id`
- **Rewards**: `/api/rewards`, `/api/rewards/my`, `/api/rewards/all`, `/api/rewards/:id`, `/api/rewards/:id/redeem`
- **Shifts**: `/api/shifts`, `/api/shifts/:id`
- **Emergency**: `/api/emergency/alert`
- **Utilities**: `/api/location/geocode`, `/api/notifications`
- **Admin**: `/api/admin/users`, `/api/admin/attendance`, `/api/admin/shifts`

## Notes
- All protected endpoints require a Bearer JWT token in the `Authorization` header.
- Some endpoints are restricted to admin/manager roles.
- Geocode and notifications are mocked for demo purposes.

## License
MIT 