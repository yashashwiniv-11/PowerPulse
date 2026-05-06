// Import required modules
const express = require("express");
const cors = require("cors");
const fs = require("fs");

// Create app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File path
const FILE = __dirname + "/data.json";

// Read data from file
function readData() {
  try {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write data to file
function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// 👉 Get latest status (only latest per area)
app.get("/status", (req, res) => {
  const data = readData();

  const latest = {};
  data.forEach(entry => {
    const area = entry.area.toLowerCase();
    if (!latest[area]) {
      latest[area] = entry;
    }
  });

  res.json(Object.values(latest));
});

// 👉 Add new update
app.post("/update", (req, res) => {
  const { area, status } = req.body;

  if (!area || !status) {
    return res.status(400).json({ message: "Missing data" });
  }

  const newEntry = {
    area: area.trim(),
    status,
    time: new Date().toLocaleString()
  };

  const data = readData();
  data.unshift(newEntry); // latest first

  writeData(data);

  res.json({ message: "Update added successfully" });
});

// 👉 Clear all data
app.delete("/clear", (req, res) => {
  writeData([]);
  res.json({ message: "All data cleared" });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});