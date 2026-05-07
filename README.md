# PowerPulse – Smart Power Cut Alert System

PowerPulse is a real-time power outage monitoring and reporting system designed to help people quickly check and update electricity status in their areas. The main goal of this project is to provide fast communication during power cuts and restorations through a simple and user-friendly platform.

This project was developed using full-stack web technologies with features like live updates, admin authentication, notifications, and area-wise filtering.

---

# Features

- Real-time power status updates using Socket.IO
- Admin login and secure authentication
- Report power cuts and restorations instantly
- Live notifications for new updates
- Area-wise search and filtering
- Delete incorrect or outdated reports
- Responsive and clean user interface
- Automatic live synchronization across connected users

---

# Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Socket.IO

### Authentication
- JSON Web Token (JWT)
- bcryptjs

### Tools & Platforms
- Git
- GitHub

---

# Project Structure

```txt
powercut-alert-system
│
├── backend
│   ├── index.js
│   ├── data.json
│   ├── package.json
│
├── frontend
│   ├── index.html
│   ├── login.html
│   ├── script.js
│   ├── login.js
│   ├── style.css
│
├── README.md
```

---

# Installation and Setup

## 1. Clone the Repository

```bash
git clone https://github.com/yashashwiniv-11/PowerPulse.git
```

---

## 2. Open the Project Folder

```bash
cd powercut-alert-system
```

---

## 3. Install Required Packages

```bash
npm install
```

Then move to the backend folder and install dependencies:

```bash
cd backend
npm install
```

---

## 4. Start the Backend Server

```bash
node index.js
```

The server will run on:

```txt
http://localhost:5000
```

---

## 5. Open the Frontend

Open the following file in your browser:

```txt
frontend/login.html
```

---

# Admin Login

```txt
Username: admin
Password: admin123
```

---

# Main Functionalities

- Live power outage updates
- Power restoration reporting
- Instant notifications
- Area-based filtering
- Secure admin access
- Real-time communication
- Report management system

---

# Future Improvements

- User registration and login system
- MongoDB database integration
- AI-based power restoration prediction
- Google Maps integration
- Email and SMS notifications
- Mobile application support
- Analytics dashboard
- Dark and light theme support

---

#  Developed By

### Veerabomma Yashashwini  
B.Tech – CSE (AI & ML)

GitHub:  
https://github.com/yashashwiniv-11

---

# Note

This project was developed for learning, practice, and academic purposes.