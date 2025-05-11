
# 💼 Job Portal

A full-stack web application designed to connect **job seekers** with **employers**. This platform allows users to create profiles, post job listings, and apply for jobs — all in a responsive and user-friendly interface.

## 🚀 Features
- 🔐 Secure user authentication and authorization  
- 📄 Post and manage job listings  
- 📥 Application tracking for candidates  
- 🏢 Company profiles with detailed information  
- 📱 Responsive design (mobile and desktop)

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Redux  
- **Backend**: Node.js, Express, MongoDB, Mongoose  
- **Others**: Axios, dotenv, Cloudinary

## ⚙️ Installation

### 🔙 Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend` directory and add the following environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   SECRET_KEY=your_jwt_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 🌐 Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to Live : [https://job-portal-three-ashen.vercel.app/](https://job-portal-three-ashen.vercel.app/)

---

## 🧪 Usage
- Register as a user or employer  
- Create job listings or apply for jobs  


## 📄 License
This project is licensed under the MIT License. See the `LICENSE` file for details.
