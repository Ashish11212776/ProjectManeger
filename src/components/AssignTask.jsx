import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TASK } from "../feactures/mainSlice";
import { useParams } from "react-router-dom";
import CancelBtn from "./CancelBtn";
const AssignTask = ({ setisOpen }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <CancelBtn setisOpen={setisOpen} />
        <h2 className="text-xl font-bold mb-4">Assign New Task</h2>
        <form className="flex flex-col space-y-3">
          <input type="text" name="taskId" placeholder="Task ID" className="border p-2 rounded" required />
          <input type="text" name="taskName" placeholder="Task Name" className="border p-2 rounded" required />
          <select name="status" className="border p-2 rounded">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="QA">QA</option>
            <option value="done">Done</option>
          </select>
          <select name="priority" className="border p-2 rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date" name="assignDate" className="border p-2 rounded" required />
          <input type="date" name="dateOfSubmission" className="border p-2 rounded" required />
          <button type="submit" className="bg-[#ff7f50] text-white px-4 py-2 font-bold rounded-md transition duration-300 ease-in-out hover:bg-[#ff5733]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
