import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TASK } from "../feactures/mainSlice";
import { useParams } from "react-router-dom";
import CancelBtn from "./CancelBtn";

const AssignTask = ({ setisOpen }) => {
  const dispatch = useDispatch();
  const proj_dev_id = useParams();
  const { id, devId } = proj_dev_id;

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
    dispatch(ADD_TASK({ id, devId, task }));
    setTask({
      taskId: "",
      taskName: "",
      status: "pending",
      priority: "low",
      assignDate: "",
      dateOfSubmission: "",
    });
    setisOpen();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <CancelBtn setisOpen={setisOpen} />
        <h2 className="text-xl font-bold mb-4">Assign New Task</h2>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <input type="text" name="taskId" placeholder="Task ID" value={task.taskId} onChange={handleChange} className="border p-2 rounded w-full" required />
          <input type="text" name="taskName" placeholder="Task Name" value={task.taskName} onChange={handleChange} className="border p-2 rounded w-full" required />
          <select name="status" value={task.status} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="QA">QA</option>
            <option value="done">Done</option>
          </select>
          <select name="priority" value={task.priority} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date" name="assignDate" value={task.assignDate} onChange={handleChange} className="border p-2 rounded w-full" required />
          <input type="date" name="dateOfSubmission" value={task.dateOfSubmission} onChange={handleChange} className="border p-2 rounded w-full" required />
          <button type="submit" className="bg-[#ff7f50] text-white px-4 py-2 font-bold rounded-md transition duration-300 ease-in-out hover:bg-[#ff5733]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
