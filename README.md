# 📚 Library Management System - Client

This is the **client-side** of the Library Management System, built using **React**, **Tailwind CSS**, **Firebase**, and **DaisyUI**. This project allows users to browse, borrow, and manage books in a digital library environment with real-time updates and secure access.

## 🌐 Live Website

🔗 https://library-we-s.web.app/

### All Books Page
![Library Management System - All Books](https://i.ibb.co/pvjkkM42/screencapture-library-we-s-web-app-all-Books-2025-08-08-16-43-37.png)


---

## 🎯 Project Purpose

The main goal of this project is to simulate a real-world library management experience for both students and administrators, allowing them to:

- Browse books by category
- View book details
- Borrow and return books
- Add and update book information
- Register/login securely with Firebase Auth
- View borrowed books with due dates

---

## 📸 Key Features

✅ **Responsive UI** for desktop, tablet, and mobile  
✅ **Secure authentication** (Email/Password + Google Sign In)  
✅ **JWT-protected routes**  
✅ **Add / Update / Borrow / Return books**  
✅ **Show available-only filter**  
✅ **Toggle between Card/Table view in All Books**  
✅ **Framer Motion** animation on Home Page  
✅ **React Rating Stars** for book ratings  
✅ **Swiper JS** used in banner/slider  
✅ **Prevent multiple borrowing of the same book**  
✅ **Max 3 books borrow limit per user**  
✅ **Dynamic document title per route**  
✅ **404 Not Found page**  
✅ **Loading Spinner during API calls**  
✅ **SweetAlert2 + Toast notifications** for all important events  
✅ **Meaningful client-side commits (15+)**  
✅ **DaisyUI components with good UX/UI**  
✅ **Clean, readable code with logical file structure**

---

## 🧑‍💻 Technologies Used

- **React.js** – Frontend library
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first CSS framework
- **DaisyUI** – Tailwind-based UI component library
- **Firebase Auth** – User authentication
- **Axios** – API requests
- **React Hook Form** – Form handling
- **Framer Motion** – Animations
- **React Rating Stars Component** – Star ratings
- **Swiper JS** – Responsive carousel/banner
- **SweetAlert2** – Alert modals & success messages
- **React Helmet** – Dynamic document title management

---

## 🔐 Security & Best Practices

- 🔐 Firebase keys secured via `.env`  
- 🔐 Private/protected routes implemented  
- 🔐 JWT token stored in `localStorage` and sent via Axios headers  
- 🚫 Borrow button disabled if quantity is 0 or already borrowed  
- ⚠️ Reloading protected routes doesn’t break authentication  
- ✅ Firebase Auth domain whitelisted

---

## 🚀 Pages Overview

| Route               | Description                           |
|--------------------|---------------------------------------|
| `/`                | Home page with banner, categories, 2 extra sections |
| `/all-books`       | Shows all books with filter/toggle options (Private) |
| `/add-book`        | Add new book to the system (Private) |
| `/update/:id`      | Update book info (Private)            |
| `/borrowed`        | See user’s borrowed books (Private)   |
| `/details/:id`     | Detailed view of a book + Borrow (Private) |
| `/login`           | Email/Password + Google Sign In       |
| `/register`        | New user registration                 |
| `*`                | 404 Not Found page                    |

---

## 🔐 .env Example

Create a `.env` file in the root of your client project:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_BASE_URL=https://your-server-url.com
