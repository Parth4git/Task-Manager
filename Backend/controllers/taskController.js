import Task from "../models/taskModel.js";
import { validateObjectId } from "../utils/validation.js";


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

export const getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ status: false, msg: "Task id not valid" });
    }

    const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
    if (!task) {
      return res.status(400).json({ status: false, msg: "No task found.." });
    }
    res.status(200).json({ task, status: true, msg: "Task found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

export const postTask = async (req, res) => {
  try {
    const { title,description } = req.body;
    if (!title) {
      return res.status(400).json({ status: false, msg: "Title of task not found" });
    }
    if (!description) {
      return res.status(400).json({ status: false, msg: "Description of task not found" });
    }
    const task = await Task.create({ title, description });
    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

export const putTask = async (req, res) => {
  try {
    const { description , title} = req.body;
    // if (!description) {
    //   return res.status(400).json({ status: false, msg: "Description of task not found" });
    // }
    // if (!title) {
    //   return res.status(400).json({ status: false, msg: "Title of task not found" });
    // }

    // if (!validateObjectId(req.params.taskId)) {
    //   return res.status(400).json({ status: false, msg: "Task id not valid" });
    // }

    // let task = await Task.findById(req.params.id);
    // if (!task) {
    //   return res.status(400).json({ status: false, msg: "Task with given id not found" });
    // }

    // if (task.user != req.user.id) {
    //   return res.status(403).json({ status: false, msg: "You can't update task of another user" });
    // }

   let  task = await Task.findByIdAndUpdate(req.params.id,req.body, { new: true });
    res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


export const deleteTask = async (req, res) => {
  try {
    // if (!validateObjectId(req.params.taskId)) {
    //   return res.status(400).json({ status: false, msg: "Task id not valid" });
    // }

    // let task = await Task.findById(req.params.taskId);
    // if (!task) {
    //   return res.status(400).json({ status: false, msg: "Task with given id not found" });
    // }

    // if (task.user != req.user.id) {
    //   return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
    // }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ status: true, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}