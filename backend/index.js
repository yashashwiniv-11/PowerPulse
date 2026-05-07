const express = require("express");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 5000;

app.use(cors());
app.use(express.json());

const FILE = __dirname + "/data.json";

const SECRET = "powerpulse_secret_key";

const admin = {
  username: "admin",
  password: bcrypt.hashSync("admin123", 8),
};

function readData() {
  try {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "Token required",
    });
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username !== admin.username ||
    !bcrypt.compareSync(password, admin.password)
  ) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { username },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
  });
});

app.get("/status", (req, res) => {
  res.json(readData());
});

app.post("/update", verifyToken, (req, res) => {
  const { area, status } = req.body;

  const newEntry = {
    area:
      area.charAt(0).toUpperCase() +
      area.slice(1).toLowerCase(),

    status,
    time: new Date().toLocaleString(),
  };

  let data = readData();

  data.unshift(newEntry);

  writeData(data);

  io.emit("power-update", newEntry);

  res.json({
    message: "Updated successfully",
  });
});

app.delete(
  "/delete/:index",
  verifyToken,
  (req, res) => {
    let data = readData();

    data.splice(req.params.index, 1);

    writeData(data);

    io.emit("data-deleted");

    res.json({
      message: "Deleted",
    });
  }
);

io.on("connection", (socket) => {
  console.log("⚡ User Connected");
});

server.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});