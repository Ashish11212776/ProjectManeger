import { Link } from "react-router-dom";
import useMainData from "../hooks/useMainData";
import "./css/home.css";

const Home = () => {
  const { isLoading, data, error } = useMainData();

  console.log(data)

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.listOfProjects || data.listOfProjects.length === 0)
    return <p>No data available</p>;

  return (
   
   <div className="project-container">
  {data.listOfProjects.map((project) => (
    <Link to={`/${project.id}`} key={project.id}>
      <div className="project-card">
        <h2>{project.name}</h2>
        <p><strong>Description:</strong> {project.desc}</p>
        <p><strong>Date:</strong> {project.projStartDate}</p>
        <p><strong>Status: </strong>{project.status}</p>
      </div>
    </Link>
  ))}
</div>

   
  );
};

export default Home;
