import noteModel from "../models/noteModel.js";

// Create a new note
export const createNote = async (req, res) => {
  const { title, description, category, color, completed, userId } = req.body;

  if (!title || !description) {
    return res.json({ success: false, message: "Title and Description are required" });
  }

  try {
    const newNote = new noteModel({
      userId,
      title,
      description,
      category: category || "General",
      color: color || "#4F46E5",
      completed: completed || false,
    });

    await newNote.save();
    return res.json({ success: true, message: "Note created successfully", note: newNote });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Fetch all notes for the authenticated user
export const getNotes = async (req, res) => {
  const { userId } = req.body;

  try {
    const notes = await noteModel.find({ userId }).sort({ createdAt: -1 });
    return res.json({ success: true, notes });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  const { noteId, title, description, category, color, completed, userId } = req.body;

  if (!noteId) {
    return res.json({ success: false, message: "Note ID is required" });
  }

  try {
    const note = await noteModel.findOne({ _id: noteId, userId });

    if (!note) {
      return res.json({ success: false, message: "Note not found or unauthorized" });
    }

    if (title !== undefined) note.title = title;
    if (description !== undefined) note.description = description;
    if (category !== undefined) note.category = category;
    if (color !== undefined) note.color = color;
    if (completed !== undefined) note.completed = completed;

    await note.save();
    return res.json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const { noteId, userId } = req.body;

  if (!noteId) {
    return res.json({ success: false, message: "Note ID is required" });
  }

  try {
    const note = await noteModel.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      return res.json({ success: false, message: "Note not found or unauthorized" });
    }

    return res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
