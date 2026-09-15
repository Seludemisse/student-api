const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Abebe", course: "React" },
  { id: 2, name: "Hana", course: "JavaScript" },
  { id: 3, name: "Samuel", course: "Python" },
];

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.post("/api/students", (req, res) => {
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    course: req.body.course,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  students = students.filter(student => student.id !== id);
  res.status(204).end();
});

app.listen(5000, () => {
  console.log("API running on http://localhost:5000");
});

app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(student => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name;
  student.course = req.body.course;

  res.json(student);
});