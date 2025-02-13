import { useParams } from "react-router-dom";
import useMainData from "../hooks/useMainData";
import { Link } from "react-router-dom";
import "./css/developerDetails.css";
const DeveloperDetails = () => {
  const columns = {
    pending: [],
    "in-progress": [],
    review: [],
    qa: [],
  };
  const { id, devId } = useParams();
  const { isLoading, data, error } = useMainData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.listOfProjects || data.listOfProjects.length === 0)
    return <p>No data available</p>;

  const developer = data.listOfProjects[id - 1].listOfDevelopers.find(
    (dev) => dev.devId === devId
  );

  developer.listOfTasks.forEach((task) => {
    if (columns[task.status.toLowerCase()]) {
      columns[task.status.toLowerCase()].push(task);
    }
  });

  return (
    <div>
       <Link to={`/${id}/dev/${devId}/newtask`}><button>+Add Task</button></Link>

      <div className="main-container">
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="column">
            <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>

            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.taskId} className="task-card">
                  <div className="task-header">
                    <h4>{task.taskName}</h4>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p>
                    <strong>Assigned to:</strong> {task.devName}
                  </p>
                  <p>
                    <strong>Joined:</strong> {task.dateOfSubmission}
                  </p>
                  <p>
                    <strong>Task ID:</strong> {task.taskId}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {task.dateOfSubmission}
                  </p>
                </div>
              ))
            ) : (
              <p>No tasks</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperDetails;
