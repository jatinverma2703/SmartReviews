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
## 🚀 Getting Started


---

## 🚀 Getting Started

### 📦 Backend Setup

1. Navigate to the backend folder:
cd backend

2. Install backend dependencies:


3. Create a `.env` file inside the `backend/` directory and add the following:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=smartreviews
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4. Start the backend server:


---

### 🌐 Frontend Setup

1. Navigate to the frontend folder:
cd frontend

2. Install frontend dependencies:
npm install

2. Install frontend dependencies:


3. Start the React app:


---

### 🛠️ Database Setup

1. Create the MySQL database:
CREATE DATABASE smartreviews;

2. Import the schema from the provided SQL file:
mysql -u root -p smartreviews < database/schema.sql

---


## 🌉 API Endpoints (RESTful)

### Reviews

- `GET /api/reviews/:productId` – Retrieve all reviews for a product  
- `POST /api/reviews/` – Submit a new review (multipart/form-data)

  Required fields in the request:
  - `productId`
  - `userId`
  - `rating`
  - `reviewText`
  - `image` (optional)

### Products

- `GET /api/products/` – Get all products  
- `POST /api/products/` – Add a new product (admin only)

---

## 🧩 Tech Stack

- **Frontend**: React.js, Axios, CSS Grid, Flexbox  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Cloud Storage**: Cloudinary  
- **Utilities**: Multer (file handling), dotenv (env management)

---

## ✅ Roadmap

- [x] Star rating and review system
- [x] Cloudinary image uploads
- [ ] User authentication
- [ ] Admin product dashboard
- [ ] Review filtering and pagination

---

## 👨‍💻 Author

**Jatin Verma**  
[GitHub](https://github.com/jatinverma2703) • [LinkedIn](https://www.linkedin.com/in/jatin-verma-61b14b202/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧠 Inspiration

SmartReviews was built to enhance transparency and engagement in the product review process for tech-savvy users, allowing rich feedback through text, images, and ratings.

---







