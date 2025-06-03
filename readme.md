# 📸 Instagram Clone (Full-Stack Web App)

A full-featured, mobile-first **Instagram Clone** built using **React.js**, **Firebase**, **MongoDB**, **Tailwind CSS**, **Socket.io**, and **Express.js**. It replicates the core features of Instagram, including **image posting**, **commenting**, **real-time chat**, and both **email and phone authentication**, all within a clean, responsive **UI**.

While features like **real-time messaging using Socket.io** are part of future updates, this project represents more than just a clone. It is a **personal journey** and a **foundation** for building my own unique **social media platform inspired by Instagram**. Over time, I aim to transform this into a fully customized **application and website** that reflects my individual creativity, ideas, and innovations.

<small>If anyone is interested in contributing or collaborating on this project, feel free to reach out - I'd be happy to welcome meaningful contributions that align with the project's goals.</small>


---

## 🔗 Live Demo

🌐 [Live Website](https://instagram-clone-blush-two.vercel.app)  
🛆 Deployed with: Vercel (Frontend) & Railway.com (Backend)

---

## 📷 Output Screenshots

### 🖥️ Desktop Output

<h3 align="center">📱 Instagram Clone - Desktop UI</h3>

<p align="center">
    <img src="/frontend/public/outputImg/Untitled.png" width="800" alt="Instagram Clone - Desktop UI" />
</p>

### 📱 Mobile Output

<h3 align="center">📱 Instagram Clone - Mobile UI</h3>

<p align="center">
    <img src="/frontend/public/outputImg/iPhone 14 & 15 Pro Max - 1 (1).png" width="900" alt="Instagram Clone Mobile UI" />
</p>



## ✨ Features

### 🔐 Authentication (via JWT)
- Email & password registration/login 
- Phone number OTP login (In Update) (In Update)
- Email verification after signup (In Update)
- Protected routes (auto-redirect for unauthorized users)

### 📸 Post System
- Upload image with caption 
- Like/unlike posts
- Add/delete comments (In Update)
- Delete your own posts (In Update)
- Fully responsive feed 

### 🧑‍💼 User Profiles
- View personal profile and all uploaded posts (In Update)
- View other users’ public profiles (In Future update Private Profiles) 
- Optional (Follow/Unfollow system – to be added)

### 💬 Real-Time Chat (Socket.io + MongoDB)(This Feature Will Be In Future)
- One-to-one messaging system
- Live message updates
- Chat history stored in MongoDB
- Displays selected user’s name at top of chat window
- Scrollable, timestamped messages
- Typing indicator 

### 🎨 UI/UX
- Tailwind CSS for beautiful, responsive design
- Mobile-first layout, desktop optimized
- Framer Motion for subtle animations
---

## 🛠️ Tech Stack

| Technology          | Purpose                           |
|---------------------|-----------------------------------|
| React.js            | Frontend                          |
| Tailwind CSS        | Styling                           |
| JWT Auth            | Authentication                    |
| MongoDB + Mongoose  | Database                          |
| Express.js          | Backend APIs                      |
| Cloudinary          | For Storing Images                |
| Socket.io in Future | Real-time messaging               |
| Framer Motion       | Animations                        |
| Vercel/Railway.com  | Deployment                        |

---

# Folder Structure

```
.
├── instagram-clone/
│   ├── backend/
│   │   ├── middleware/
│   │   │   └── requireLogin.js
│   │   ├── models/
│   │   │   ├── model.js
│   │   │   ├── profileModel.js
│   │   │   └── userPost.js
│   │   ├── node_modules/       # Backend dependencies
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── createPost.js
│   │   │   └── profile.js
│   │   ├── .env                # Backend specific .env
│   │   ├── app.js
│   │   ├── package-lock.json   # Backend specific lock file
│   │   └── package.json        # Backend specific package.json
│   │
│   ├── frontend/
│   │   ├── node_modules/       # Frontend dependencies
│   │   ├── public/
│   │   │   └── vite.svg
│   │   └── src/
│   │       ├── components/
│   │       │   ├── ExplorePage/
│   │       │   ├── HomePage/
│   │       │   ├── Loaders/
│   │       │   ├── Logout/
│   │       │   ├── MessagePage/
│   │       │   ├── NotificationPage/
│   │       │   ├── Reels/
│   │       │   ├── UserProfilePage/
│   │       │   ├── UserSearch/
│   │       │   ├── UserUpload/
│   │       │   ├── Error404.jsx
│   │       │   ├── LoginForm.jsx
│   │       │   ├── ProtectedRoute.jsx
│   │       │   └── SignUpForm.jsx
│   │       ├── Data/
│   │       │   └── dataButtons.js
│   │       ├── img/
│   │       │   ├── Error404
│   │       │   ├── LoginPage
│   │       │   ├── InstargamSquare.png
│   │       │   └── noImageProfile.jpg
│   │       ├── pages/
│   │       │   ├── LoginPage.jsx
│   │       │   └── MainPage.jsx
│   │       ├── utils/
│   │       │   └── config.js
│   │       ├── App.jsx
│   │       ├── index.css
│   │       └── main.jsx
│   │   ├── .env                # Frontend specific .env
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── package-lock.json   # Frontend specific lock file
│   │   ├── package.json        # Frontend specific package.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.js
│   │   ├── vercel.json
│   │   └── vite.config.js
│   │
│   ├── .gitignore              # Root .gitignore for the monorepo
│   └── README.md               # Main README for the entire project
```

---


## 🔧 Installation & Setup

### 🔹 Frontend (React + Firebase)

```bash
git clone https://github.com/Dhirajbhavsar9900/InstagramClone
cd InstagramClone
npm install
```
### Create a .env file in the root of your frontend project with the following content:

```
VITE_BACKEND_URL = Your Backend LocalHost URl
VITE_CLOUDINARY_CLOUD_NAME= Your Couldinary CouldName
VITE_CLOUDINARY_UPLOAD_PRESET= Your Cloudinary Upload_Preset
```

#### After setting up .env, start the development server:


```bash
npm run dev
```


### 🔹 Backend (Express + MongoDB + Socket.io)

```bash
cd backend
npm install
```
#### Create .env file inside /backend folder:

```
JWT_SECRET = Generate Your Own JWT_TOKEN 
MONGO_URI = Your MONGO.DB Url
PORT = Your Backend PORT example : (5000)
FRONTEND_URL = Your Frontend LocalHost Url

```


#### Run backend server:

```bash
npm run dev
```

## 🌐 Deployment


#### Frontend: Deployed on Vercel
#### Backend: Deployed on Railway.com

## 🔮 Future Roadmap

 Follow/Unfollow system

 Search User

 User Login Email Alert

 Realtime Chating System 

## 🧑‍💻 Author
  
 [Dhiraj.jsx](https://www.instagram.com/dhiraj.jsx/#) Connect Me On Instagram 
 
 [DhirajBhavsar9900](https://github.com/Dhirajbhavsar9900) Connect Me On 👥 GitHub
 
 


