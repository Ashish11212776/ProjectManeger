import { useState } from "react";
import "./createProject.css"; // Import the CSS file

const CreateProject = () => {
  const [project, setProject] = useState({
    name: "",
    desc: "",
    date: "",
    listOfDevelopers: [
      {
        devId: "",
        devName: "",
        dataOfJoin: "",
        listOfTasks: [{ taskId: "", taskName: "", status: "pending", priority: "low", dateOfSubmission: "" }]
      }
    ]
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleDeveloperChange = (e, index) => {
    const updatedDevelopers = [...project.listOfDevelopers];
    updatedDevelopers[index][e.target.name] = e.target.value;
    setProject({ ...project, listOfDevelopers: updatedDevelopers });
  };

  const handleTaskChange = (e, devIndex, taskIndex) => {
    const updatedDevelopers = [...project.listOfDevelopers];
    updatedDevelopers[devIndex].listOfTasks[taskIndex][e.target.name] = e.target.value;
    setProject({ ...project, listOfDevelopers: updatedDevelopers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Data:", project);
  };

  return (
    <div className="form-container">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Project Name" value={project.name} onChange={handleChange} />
        <textarea name="desc" placeholder="Project Description" value={project.desc} onChange={handleChange}></textarea>
        <input type="date" name="date" value={project.date} onChange={handleChange} />

        <h3>Developers</h3>
        {project.listOfDevelopers.map((dev, devIndex) => (
          <div key={devIndex} className="developer">
            <input type="text" name="devName" placeholder="Developer Name" value={dev.devName} onChange={(e) => handleDeveloperChange(e, devIndex)} />
            <input type="date" name="dataOfJoin" value={dev.dataOfJoin} onChange={(e) => handleDeveloperChange(e, devIndex)} />
            
            <h4>Tasks</h4>
            {dev.listOfTasks.map((task, taskIndex) => (
              <div key={taskIndex} className="task">
                <input type="text" name="taskName" placeholder="Task Name" value={task.taskName} onChange={(e) => handleTaskChange(e, devIndex, taskIndex)} />
                <select name="status" value={task.status} onChange={(e) => handleTaskChange(e, devIndex, taskIndex)}>
                  <option value="pending">Pending</option>
                  <option value="QA">QA</option>
                  <option value="completed">Completed</option>
                </select>
                <select name="priority" value={task.priority} onChange={(e) => handleTaskChange(e, devIndex, taskIndex)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input type="date" name="dateOfSubmission" value={task.dateOfSubmission} onChange={(e) => handleTaskChange(e, devIndex, taskIndex)} />
              </div>
            ))}
          </div>
        ))}

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
