import { useParams } from "react-router-dom";
import useMainData from "../hooks/useMainData";
import { useState } from "react";
import AssignTask from "./AssignTask";
import { useDispatch } from "react-redux";
import { ADD_TASK } from "../feactures/mainSlice";

const DeveloperDetails = () => {
  const columns = {
    pending: [],
    "in-progress": [],
    review: [],
    qa: [],
    done: [],
  };
  const { id, devId } = useParams();
  const { isLoading, data, error } = useMainData();
  const [isOpen, setisOpen] = useState(false);
  const dispatch = useDispatch();

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data || !data.listOfProjects || data.listOfProjects.length === 0)
    return <p className="text-center text-gray-500">No data available</p>;

  const project = data.listOfProjects.find((proj) => proj.id === id);

  if (!project) {
    return <p>Project not found</p>;
  }

  const developer = project.listOfDevelopers.find((dev) => dev.devId === devId);

  if (!developer) {
    return <p>Developer not found</p>;
  }

  developer.listOfTasks.forEach((task) => {
    if (columns[task.status.toLowerCase()]) {
      columns[task.status.toLowerCase()].push(task);
    }
  });

  const handleChange = (e, changeTaskId) => {
    const status = e.target.value;
    dispatch(ADD_TASK({ id, devId, status, changeTaskId }));
  };

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => setisOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
      >
        + Add Task
      </button>
      <div className={`grid grid-cols-5 gap-4 ${isOpen ? "blur-sm" : ""}`}>
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold capitalize text-gray-800 mb-4">{status}</h3>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.taskId} className="bg-white p-4 rounded-lg shadow space-y-2 mt-5">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg text-gray-900">{task.taskName}</h4>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        task.priority.toLowerCase() === "high"
                          ? "bg-red-500 text-white"
                          : task.priority.toLowerCase() === "medium"
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      Priority: {task.priority}
                    </span>
                  </div>
                  <select
                    name="status"
                    value={task.status}
                    onChange={(e) => handleChange(e, task.taskId)}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="QA">QA</option>
                    <option value="done">Done</option>
                  </select>
                  <p><strong>Assigned to:</strong> {task.devName}</p>
                  <p><strong>Joined:</strong> {task.dateOfSubmission}</p>
                  <p><strong>Task ID:</strong> {task.taskId}</p>
                  <p><strong>Due Date:</strong> {task.dateOfSubmission}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks</p>
            )}
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <AssignTask setisOpen={setisOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperDetails;
