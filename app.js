// Import required modules
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: "172.19.16.206", // Replace with your host
  user: "dbadmin", // Replace with your MySQL username
  password: "Admin#123", // Replace with your MySQL password
  database: "lab3", // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

// ROUTES

// Get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a single student by ID
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM students WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).send("Student not found");
    }
    res.json(result[0]);
  });
});

// Add a new student (POST)
app.post("/students", (req, res) => {
  const { name, email, age, contact } = req.body;
  const sql =
    "INSERT INTO students (name, email, age, contact) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, age, contact], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, name, email, age, contact });
  });
});

// Update a student (PUT)
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age, contact } = req.body;
  const sql =
    "UPDATE students SET name = ?, email = ?, age = ?, contact = ? WHERE id = ?";
  db.query(sql, [name, email, age, contact, id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send("Student not found");
    }
    res.json({ id, name, email, age, contact });
  });
});

// Delete a student (DELETE)
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM students WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send("Student not found");
    }
    res.send("Student deleted");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
