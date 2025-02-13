import { Link, useParams } from "react-router-dom";
import useMainData from "../hooks/useMainData.js";
import "./css/projectDetails.css";

const ProjectDetails = () => {
  const { isLoading, data, error } = useMainData();
  const { id } = useParams();

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error)
    return <div className="error">Something went wrong! Please try again.</div>;
  if (!data?.listOfProjects)
    return <div className="no-data">No data available.</div>;

  const project = data.listOfProjects.find((item) => String(item.id) === id);

  if (!project) return <div className="not-found">Project Not Found</div>;

  return (
    <div className="project-container">
      <div className="project-header">
        <h1 className="project-title">{project.name}</h1>
        <Link to={`/${id}/new`}> <button className="Add-btn">+New Developer</button></Link>
      </div>
      <p className="project-desc">
        <strong>Description:</strong> {project.desc}
      </p>
      <p className="project-date">
        <strong>Start Date:</strong> {project.projStartDate}
      </p>
      <p className="project-status">
        <strong>Status:</strong>{" "}
        <span className="status-done">{project.status}</span>
      </p>

      <h2 className="developers-title">Developers</h2>
      <div className="developers-list">
        {project.listOfDevelopers.map((dev, index) => (
          // eslint-disable-next-line react/jsx-key
          <Link to={`/${id}/dev/${dev.devId}`}>
            <div key={index} className="developer-card">
              <p className="developer-name">{dev.devName}</p>
              <p className="developer-join">
                <strong>Joined:</strong> {dev.dataOfJoin}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
