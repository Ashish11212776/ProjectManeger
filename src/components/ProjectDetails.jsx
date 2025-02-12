import { useParams } from "react-router-dom";
import useMainData from "../hooks/useMainData";

const ProjectDetails = () => {
  const { isLoading, data, error } = useMainData();
  const { id } = useParams();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) throw new Error("Internal Server Error");
  if (!data || !data.listOfProjects) return <h1>Data is not there</h1>;

  const project = data.listOfProjects.find((item) => String(item.id) === id);

  if (!project) return <h1>Project Not Found</h1>; 
  return (
    <div className="main-container">
      <h1>Project Name: {project.name}</h1>
      <p><strong>Description:</strong> {project.desc}</p>
      <p><strong>Date:</strong> {project.projStartDate}</p>
      <p><strong>Status:</strong> {project.status}</p>
    </div>
  );
};

export default ProjectDetails;
