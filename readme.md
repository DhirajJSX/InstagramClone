# 📸 Instagram Clone (Full-Stack App)

A full-featured, mobile-first **Instagram Clone** built using **React.js**, **Firebase**, **MongoDB**, **Tailwind CSS**, **Socket.io**, and **Express.js**. It offers real-time chat, image posting, commenting, authentication (email & phone), and a responsive UI – replicating the core features of Instagram.

---

## 🔗 Live Demo

🌐 [Live Website](https://instagram-clone-blush-two.vercel.app)  
🛆 Deployed with: Vercel (Frontend) & Railway.com (Backend)

---

## 📷 App Screenshots

### 🔐 Mobile Output
[Mobile OutPut](../InstagramClone/frontend/public/outputImg/iPhone%2014%20&%2015%20Pro%20Max%20-%201%20(1).png)


## ✨ Features

### 🔐 Authentication (via Firebase)
- Email & password registration/login 
- Phone number OTP login (In Update)
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
VITE_FIREBASE_API_KEY=your_api_key

VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

VITE_FIREBASE_PROJECT_ID=your_project_id

VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket

VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

VITE_FIREBASE_APP_ID=your_app_id
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

PORT=5000 

MONGO_URI=your_mongo_uri


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
 
 


