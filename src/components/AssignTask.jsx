import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TASK } from "../feactures/mainSlice";
import { useParams } from "react-router-dom";
const AssignTask = () => {
  const dispatch = useDispatch();
  const proj_dev_id=useParams();
  const {id,devId}=proj_dev_id
  console.log(id,devId)

  const [task, setTask] = useState({
    taskId: "",
    taskName: "",
    status: "pending",
    priority: "low",
    assignDate: "",
    dateOfSubmission: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Assigned:", task);
    dispatch(ADD_TASK({id,devId,task}));
    setTask({
      taskId: "",
      taskName: "",
      status: "pending",
      priority: "low",
      assignDate: "",
      dateOfSubmission: "",
    });
  };

  return (
    <div className="form-container">
      <h2>Assign New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskId"
          placeholder="Task ID"
          value={task.taskId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="taskName"
          placeholder="Task Name"
          value={task.taskName}
          onChange={handleChange}
          required
        />
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="QA">QA</option>
          <option value="done">Done</option>
        </select>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          name="assignDate"
          value={task.assignDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfSubmission"
          value={task.dateOfSubmission}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AssignTask;
