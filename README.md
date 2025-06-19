# 🛍️ SmartReviews - Product Rating & Review System

SmartReviews is a full-stack web application that enables users to explore tech products, submit star ratings, write reviews, and upload images. Built with **React**, **Express.js**, **MySQL**, and **Cloudinary**, it offers a sleek interface and real-time feedback functionality.

---


## ✨ Features

- ⭐ Submit star-based product ratings (1–5)
- 📝 Leave detailed written reviews
- 📷 Upload images with reviews (via Cloudinary)
- 💬 Display and view reviews in a lightbox modal
- 📊 Calculate and show average product rating
- 🗂️ Store all data in MySQL with user-product linkage
- ⚙️ RESTful API (Express)
- 💻 Responsive frontend (React)
- 🎨 Styled with Flexbox and CSS Grid

---

## 📁 Folder Structure
SmartReviews/
├── backend/                  # Node.js + Express + MySQL + Cloudinary
│   ├── controllers/          # Logic for review + product endpoints
│   ├── models/               # DB connection config (db.js)
│   ├── routes/               # API routes (e.g., reviewRoutes.js)
│   ├── middlewares/          # Multer config for file uploads
│   ├── utils/                # Cloudinary integration
│   ├── .env                  # Environment variables for backend
│   └── index.js              # Entry point for backend server
│
├── frontend/                 # React client
│   ├── components/           # ProductBox.js, WriteReview.js, etc.
│   ├── style/                # CSS files (e.g., template.css)
│   ├── App.js or MainPage.js # Main application component
│   ├── index.js              # Entry point for React app
│   └── httpRequests.js       # Axios API helper
│
├── database/                 # SQL scripts for table creation
│   └── schema.sql
│
├── README.md                 # Project documentation
└── package.json              # Project metadata and scripts

