import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_DATA,EDIT_PROJ } from "../feactures/mainSlice";
import CancelBtn from "./CancelBtn";

const CreateProject = ({ setisOpen, setisEdit, project }) => {
  const isEditing = Boolean(project); 

  const [projectData, setProjectData] = useState(
    project || {
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
    }
  );

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      dispatch(EDIT_PROJ(projectData));
      setisEdit(false); 
    } else {
      console.log("Creating Project:", projectData);
      dispatch(ADD_DATA(projectData)); 
      setisOpen(false); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <CancelBtn setisOpen={isEditing ? setisEdit : setisOpen} />
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Project" : "Create New Project"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            type="text"
            name="id"
            placeholder="Project ID"
            value={projectData.id}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            required
            type="text"
            name="name"
            placeholder="Project Name"
            value={projectData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <textarea
            required
            name="desc"
            placeholder="Project Description"
            value={projectData.desc}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-24 resize-none"
          ></textarea>
          <input
            required
            type="date"
            name="projStartDate"
            value={projectData.projStartDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md w-full transition"
          >
            {isEditing ? "Save Changes" : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
