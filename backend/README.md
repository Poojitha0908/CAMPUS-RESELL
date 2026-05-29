# Campus Resell Portal Backend

Backend API for the Campus Resell Portal built using Node.js, Express.js, MongoDB, and Socket.IO.

The backend handles authentication, product management, chat functionality, wishlist operations, admin controls, notifications, image uploads, and database operations.

---

## Features

- JWT authentication
- User profile management
- Product CRUD operations
- Wishlist functionality
- Real-time chat system
- Product reviews and ratings
- Admin moderation system
- Notifications
- Image uploads using Multer
- Password reset functionality

---

## Project Structure

```text
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── server.js
└── package.json
```

---

## API Base URL

```text
/api
```

---

## Main API Routes

### Authentication
- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/profile`

### Products
- GET `/products`
- POST `/products`
- PUT `/products/:id`
- DELETE `/products/:id`

### Chat
- GET `/chats`
- POST `/chats`

### Wishlist
- GET `/products/wishlist`

### Notifications
- GET `/notifications`

### Admin
- GET `/users/admin/all`
- GET `/reports`

---

## Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=5001
DB_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

## Installation

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5001
```

---

## Start Production Server

```bash
npm start
```

---

## Backend Functionalities

- Secure authentication system
- Product management
- Real-time communication
- User moderation
- File upload handling
- Notification management
- Role-based access control

---

## Security Features

- Password hashing
- JWT protected routes
- Admin authorization middleware
- Input validation
- Protected API endpoints

---

## Author

Sai