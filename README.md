# E-com Backend

A TypeScript Express server with MongoDB integration for e-commerce backend.

## Features

- TypeScript support
- MongoDB with Mongoose ODM
- User management system
- RESTful API endpoints

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/ecom-backend
PORT=3000
JWT_SECRET=your_super_secret_key
```

> Note: Make sure `JWT_SECRET` is strong and not checked into source control.

## MongoDB Setup

Make sure MongoDB is running locally or update the `MONGODB_URI` in `.env` to point to your MongoDB instance.

For local MongoDB:

- Install MongoDB Community Server
- Start MongoDB service
- Default connection: `mongodb://localhost:27017/ecom-backend`

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm run start
```

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### User Model

```typescript
{
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}
```

The server runs on http://localhost:3000
