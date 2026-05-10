# PowerPulse

PowerPulse is a full-stack web application designed to help users report and monitor power outages in different areas. It provides a simple and intuitive interface where users can create an account, log in securely, and update the current power status of their location.

The application displays all reports in real time on a centralized dashboard, making it easy to track whether electricity is currently unavailable or has been restored. PowerPulse was built as a practical project to demonstrate full-stack development skills, including frontend design, backend API development, user authentication, and data management.

---

## Key Features

- User Registration and Login
- Secure authentication using browser local storage
- Report Power Cut and Power Restored status
- Area-based outage reporting
- Live dashboard to view all submitted reports
- Clear all reports when needed
- Logout functionality
- Lightweight JSON-based data storage

---

## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Node.js
- Express.js
- CORS

### Data Storage
- JSON files (`data.json` and `users.json`)

---

## Project Structure

powercut-alert-system/
│
├── backend/
│   ├── index.js
│   ├── data.json
│   └── users.json
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── style.css
│   ├── script.js
│   └── auth.js
│
├── package.json
└── README.md

---

## Installation and Setup

Follow these steps to run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/powercut-alert-system.git
cd powercut-alert-system