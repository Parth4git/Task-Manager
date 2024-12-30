import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({

  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // referencing User model to connect to users collection in MongoDB.
    required: true,
  },
}, {
  timestamps: true
});


const Task = mongoose.model("Task", taskSchema);

export default Task;