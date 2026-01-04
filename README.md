# 🔐 Full-Stack Password Manager

A secure **full-stack password manager** built using the **MERN stack**, supporting **two storage modes**:

1. **LocalStorage Mode** – Offline, browser-only storage  
2. **Database Mode** – Online, MongoDB-based storage with authentication  

This project is designed so users can choose how and where their passwords are stored.

---

## ✨ Features

- User authentication (Sign-up / Login / Logout)
- JWT authentication using HTTP-only cookies
- Secure password hashing with bcrypt
- Add, edit, and delete saved passwords
- Two storage options:
  - Browser LocalStorage
  - MongoDB database
- Modern UI built with React, Vite, and Tailwind CSS

---

## 🧠 Storage Modes Explained

### 1️⃣ LocalStorage Mode (Offline)

In this mode:
- Passwords are stored **only in the browser**
- No backend or database required
- Works completely offline
- Data is device-specific
- Best for personal use or learning projects

⚠️ Clearing browser data will remove all saved passwords.

---

### 2️⃣ Database Mode (Online – Recommended)

In this mode:
- Passwords are stored securely in **MongoDB**
- Requires backend server
- Data is linked to user accounts
- Accessible across devices
- Suitable for real-world applications

---

## 🔁 Switching Between Storage Modes

### ✅ Using LocalStorage Mode

1. **Download / clone ONLY the Frontend folder**
2. Open the file:

Frontend/src/components/Manager.jsx


3. **Uncomment the LocalStorage code**
4. **Comment out the API fetch code**

#### Enable LocalStorage
```js
useEffect(() => {
const passwords = localStorage.getItem("passwords");
if (passwords) {
 setPasswordArray(JSON.parse(passwords));
}
}, []);


Disable backend fetch

// fetch("http://localhost:3000/passwords", {
//   credentials: "include",
// });


localStorage.setItem("passwords", JSON.stringify(passwordArray));

No backend required
No login required

Using Database Mode

1.Clone both Frontend and Backend

2.Install dependencies in both folders:

npm install

3.Create a .env file inside Backend:

PORT=3000
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string

4.Start the backend server:

npm start

Start the frontend:

npm run dev 


🔐 Authentication Flow (Database Mode)

Sign-up / Login
   ↓
JWT created on backend
   ↓
Stored in HTTP-only cookie
   ↓
Cookie sent with every request
   ↓
Auth middleware validates user


🚪Logout

Clears authentication cookie

Redirects user to Welcome page

Blocks access to protected routes


🛠 Tech Stack

Frontend: React, Vite, Tailwind CSS

Backend: Node.js, Express

Database: MongoDB, Mongoose

Authentication: JWT, Cookies