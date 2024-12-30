import Task from "../models/taskModel.js";


export const createTask = async (req, res) => {
  const task = new Task({
    description: req.body.description,
    completed: req.body.completed,
    user: req.user._id,
  });

  try {
    const newTask = await task.save();
    res.status(201).json({ message: "Todo Created Successfully", newTask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo creation" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.find({ user: req.user._id });
    res.status(201).json({ message: "Todo Fetched Successfully", task });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo fetching" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Todo Updated Successfully", task });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo updating" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(201).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring in todo Deletion" });
  }
};
