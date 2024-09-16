const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Middleware to validate ObjectId format
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid task ID format' });
  }
  next();
};

// Middleware to check for missing fields and validate input
const checkRequiredFields = (req, res, next) => {
  const { title, description, status, dueDate } = req.body;
  const validStatuses = ['pending', 'in progress', 'completed'];

  if (!title || !description || !status || !dueDate) {
    return res.status(400).json({ error: 'Missing required fields (title, description, status, dueDate)' });
  }

  // Validate dueDate: Check if it's a valid date
  const parsedDueDate = new Date(dueDate);
  if (isNaN(parsedDueDate.getTime())) {
    return res.status(400).json({ error: 'Invalid dueDate format. Use YYYY-MM-DD.' });
  }

  next();
};

// Create Task (POST /tasks)
router.post('/tasks', auth, checkRequiredFields, async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      dueDate: new Date(req.body.dueDate) // Ensure dueDate is stored as a valid Date object
    };
    const task = new Task(taskData);
    await task.save();

    // Return the formattedDueDate instead of the raw dueDate
    const taskFormatted = task.toObject();
    taskFormatted.dueDate = task.formattedDueDate;

    res.status(201).json(taskFormatted);
  } catch (err) {
    res.status(500).json({ error: 'Error creating task: ' + err.message });
  }
});

// Get All Tasks (GET /tasks)
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find();

    if (!tasks.length) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    // Format each task's dueDate using the virtual field 'formattedDueDate'
    const tasksFormatted = tasks.map(task => {
      const taskObj = task.toObject();
      taskObj.dueDate = task.formattedDueDate;
      return taskObj;
    });

    res.status(200).json(tasksFormatted);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving tasks: ' + err.message });
  }
});

// Get Task by ID (GET /tasks/:id)
router.get('/tasks/:id', auth, validateObjectId, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Use the virtual field 'formattedDueDate' for the response
    const taskFormatted = task.toObject();
    taskFormatted.dueDate = task.formattedDueDate;

    res.status(200).json(taskFormatted);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving task: ' + err.message });
  }
});

// Update Task (PUT /tasks/:id)
router.put('/tasks/:id', auth, validateObjectId, checkRequiredFields, async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      dueDate: new Date(req.body.dueDate) // Ensure dueDate is stored as a valid Date object
    };
    const task = await Task.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Use the virtual field 'formattedDueDate' for the response
    const taskFormatted = task.toObject();
    taskFormatted.dueDate = task.formattedDueDate;

    res.status(200).json(taskFormatted);
  } catch (err) {
    res.status(500).json({ error: 'Error updating task: ' + err.message });
  }
});

// Delete Task (DELETE /tasks/:id)
router.delete('/tasks/:id', auth, validateObjectId, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error deleting task: ' + err.message });
  }
});




module.exports = router;
