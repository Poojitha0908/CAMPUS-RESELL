# Campus Resell Portal

Campus Resell Portal is a MERN stack web application developed for students to buy, sell, and exchange used products within a college campus community.

The platform allows students to create listings, upload product images, chat with buyers, save wishlist items, manage profiles, and securely interact with other campus users through a modern responsive interface.

---

## Features

### User Features
- User registration and login
- JWT authentication
- Add, edit, and delete products
- Upload product images
- Wishlist management
- Real-time chat system
- Product reviews and ratings
- Search and filter products
- Profile management
- Dark mode support

### Admin Features
- Manage users
- View reported products
- Moderate listings
- Access admin dashboard

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Real-time Chat | Socket.IO |
| File Uploads | Multer |
| Email Service | Nodemailer |

---

## Project Structure

```text
Campus-Resell-Portal/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
└── README.md

## Installation:

Clone Repository
git clone <repository-url>
cd campus-resell-portal
Backend Setup
cd backend
npm install
npm run dev

Create a .env file inside backend folder:

PORT=5001
DB_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
Frontend Setup
cd frontend
npm install
npm run dev
Local Development URLs

Frontend:

http://localhost:5173

Backend:

http://localhost:5001


Main Functionalities:
-Product listing system
-Product search and filtering
-Real-time messaging
-Wishlist system
-User authentication
-Admin moderation tools
-Responsive UI for desktop and mobile

Future Improvements:
-Online payment integration
-AI-based product recommendations
-College email verification
-Cloud image storage
-Notification system


Author:
Dasari Poojitha