import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_DATA } from "../feactures/mainSlice";
import CancelBtn from "./CancelBtn";
const CreateProject = ({setisOpen}) => {
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
    <div className="form-container">
      <CancelBtn setisOpen={setisOpen}/>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input required
          type="text"
          name="id"
          placeholder="Project id"
          value={project.id}
          onChange={handleChange}
        />
        <input required
          type="text"
          name="name"
          placeholder="Project Name"
          value={project.name}
          onChange={handleChange}
        />
        <textarea
        required
          name="desc"
          placeholder="Project Description"
          value={project.desc}
          onChange={handleChange}
        ></textarea>
        <input
          required
          type="date"
          name="projStartDate"
          value={project.date}
          onChange={handleChange}
        />

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
