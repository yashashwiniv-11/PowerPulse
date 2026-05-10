const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

const DATA_FILE = path.join(__dirname, "data.json");
const USERS_FILE = path.join(__dirname, "users.json");

app.use(cors());
app.use(express.json());

function readJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content || "[]");
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Get reports
app.get("/status", (req, res) => {
  res.json(readJSON(DATA_FILE));
});

// Add report
app.post("/update", (req, res) => {
  const { area, status } = req.body;

  if (!area || !status) {
    return res.status(400).json({
      message: "Area and status are required"
    });
  }

  const reports = readJSON(DATA_FILE);

  reports.unshift({
    area:
      area
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase()),
    status,
    time: new Date().toISOString()
  });

  writeJSON(DATA_FILE, reports);

  res.json({
    message: "Report submitted successfully"
  });
});

// Clear reports
app.delete("/clear", (req, res) => {
  writeJSON(DATA_FILE, []);

  res.json({
    message: "All reports cleared"
  });
});

// Register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const users = readJSON(USERS_FILE);

  const existingUser = users.find(
    (user) => user.email === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists"
    });
  }

  users.push({
    id: Date.now(),
    name,
    email: email.toLowerCase(),
    password,
    createdAt: new Date().toISOString()
  });

  writeJSON(USERS_FILE, users);

  res.status(201).json({
    message: "Registration successful"
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const users = readJSON(USERS_FILE);

  const user = users.find(
    (u) =>
      u.email === email.toLowerCase() &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});