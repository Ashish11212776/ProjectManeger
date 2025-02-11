import useMainData from "../hooks/useMainData";
import "./home.css";

const Home = () => {
  const { isLoading, data, error } = useMainData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.listOfProjects || data.listOfProjects.length === 0)
    return <p>No data available</p>;

  return (
    <div className="project-container">
      {data.listOfProjects.map((project) => (
        <div key={project.id} className="project-card">
          <h2>{project.name}</h2>
          <p><strong>Description:</strong> {project.desc}</p>
          <p><strong>Date:</strong> {project.date}</p>
           <p><strong>status: </strong>{project.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
