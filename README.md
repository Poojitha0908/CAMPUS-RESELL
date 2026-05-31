# Campus Resell Portal

A full-stack **MERN** web application built for college students to **buy, sell, and exchange** used items within their campus community. Students can create product listings, upload images, chat with buyers/sellers in real time, manage wishlists, and more — all through a modern, responsive interface.

**Live Demo:** [https://campus-resell-ik5y.vercel.app](https://campus-resell-ik5y.vercel.app)

---

## Features

### User Features
- User registration and login with JWT authentication
- Add, edit, and delete product listings
- Upload product images
- Search and filter products by category, price, and location
- Real-time chat between buyers and sellers (Socket.IO)
- Wishlist management
- Product reviews and star ratings
- Profile management with avatar upload
- Password reset via email (OTP)
- Dark mode support
- Notification system for wishlist and reviews

### Admin Features
- View and manage all registered users
- Ban or unban users
- View and moderate reported products
- Access a dedicated admin dashboard

---

## Tech Stack

| Layer            | Technologies                        |
| ---------------- | ----------------------------------- |
| Frontend         | React 18, Vite, Tailwind CSS, Axios |
| Backend          | Node.js, Express.js                 |
| Database         | MongoDB, Mongoose                   |
| Authentication   | JWT, bcryptjs                       |
| Real-time Chat   | Socket.IO                           |
| File Uploads     | Multer                              |
| Email Service    | Nodemailer (Gmail SMTP)             |
| Deployment       | Vercel (frontend), Render (backend) |

---

## Project Structure

```text
campus-resell/
│
├── backend/
│   ├── config/          # DB and Socket.IO config
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth, admin, upload middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── services/        # Email service
│   ├── sockets/         # Socket.IO events
│   ├── uploads/         # Stored product images
│   ├── utils/           # Helper utilities
│   ├── seed_products.js # Script to seed demo products
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── context/     # Auth context
│       ├── hooks/       # Custom React hooks
│       ├── pages/       # Page-level components
│       ├── services/    # Axios API service
│       ├── sockets/     # Socket.IO client
│       └── utils/       # Utility functions
│
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Poojitha0908/CAMPUS-RESELL.git
cd CAMPUS-RESELL
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> **Warning:** For `EMAIL_PASS`, use a Gmail **App Password** (not your real password).
> Generate one at: https://myaccount.google.com/apppasswords

Start the backend:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## Seeding Demo Products

To populate the database with sample product listings:

```bash
cd backend
node seed_products.js
```

> **Warning:** This will **clear all existing products** and insert 8 demo products with images.

---

## Deployment

| Service  | Platform | URL                                          |
| -------- | -------- | -------------------------------------------- |
| Frontend | Vercel   | https://campus-resell-ik5y.vercel.app        |
| Backend  | Render   | https://campus-resell-1.onrender.com         |

---

## Main Functionalities

- Product listing, search, and filtering system
- Real-time messaging between users
- Wishlist system
- JWT-based user authentication
- Admin moderation tools
- Notification system (reviews and wishlist)
- Responsive UI for desktop and mobile

---

## Future Improvements

- Online payment integration (Razorpay / UPI)
- AI-based product recommendations
- College email (`.edu`) verification
- Cloud image storage (Cloudinary / AWS S3)
- PWA support for mobile

---

## Author

**Dasari Poojitha**
Roll No: 22EG105N16
Anurag University

---

## License

This project was developed as part of an academic project. All rights reserved.