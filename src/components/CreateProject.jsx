import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_DATA } from "../feactures/mainSlice";
import CancelBtn from "./CancelBtn";
const CreateProject = ({ setisOpen }) => {
  const [project, setProject] = useState({
    id: "",
    name: "",
    desc: "",
    projStartDate: "",
    status: "active",
    listOfDevelopers: [
      {
        devId: "",
        devName: "",
        dateOfJoin: "",
        listOfTasks: [
          {
            taskId: "",
            devRefId: "",
            taskName: "",
            status: "",
            priority: "",
            dateOfSubmission: "",
          },
        ],
      },
    ],
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setisOpen();
    dispatch(ADD_DATA(project));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <CancelBtn setisOpen={setisOpen} />
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create New Project
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            type="text"
            name="id"
            placeholder="Project ID"
            value={project.id}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            required
            type="text"
            name="name"
            placeholder="Project Name"
            value={project.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <textarea
            required
            name="desc"
            placeholder="Project Description"
            value={project.desc}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-24 resize-none"
          ></textarea>
          <input
            required
            type="date"
            name="projStartDate"
            value={project.projStartDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md w-full transition"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
