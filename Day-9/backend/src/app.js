const express = require("express");
const noteModel = require("./models/notes.model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    massege: "Note created successfully",
  });
});

app.get("/api/notes", async (req, res) => {
  
  const notes = await noteModel.find();

  res.status(200).json({
    massege: "Note fetch successfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    massesge: "Note deleted successfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    massege: "Note updated successfully",
  });
});

module.exports = app;
