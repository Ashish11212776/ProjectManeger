import { Link } from "react-router-dom";
import useMainData from "../hooks/useMainData";
import { Clock, AlertCircle, CheckCircle, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { DELETE_PROJ } from "../feactures/mainSlice";
const getStatusColor = (status) => {
  const statusMap = {
    Active: "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Done: "bg-purple-100 text-purple-800",
    "On Hold": "bg-yellow-100 text-yellow-800",
  };
  return statusMap[status] || "bg-gray-100 text-gray-800";
};


const getStatusIcon = (status) => {
  switch (status) {
    case "Done":
      return <CheckCircle className="w-4 h-4" />;
    case "On Hold":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const Home = () => {
  const { isLoading, data, error } = useMainData();
  const dispatch=useDispatch();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-800 rounded-lg p-4 max-w-md">
          <h3 className="text-lg font-semibold">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.listOfProjects || data.listOfProjects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-50 rounded-lg p-4 max-w-md text-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Projects Dashboard</h1>
          <span className="text-sm text-gray-500">
            Total Projects: {data.listOfProjects.length}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.listOfProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full relative"
            >
              <Link to={`/${project.id}`} className="block p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h2>
                  <div
                    className={`flex items-center space-x-1 px-2.5 py-1 mr-9 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {getStatusIcon(project.status)}
                    <span>{project.status}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Description: </span>
                    {project.desc}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{project.projStartDate}</span>
                  </div>
                </div>
              </Link>
              {/* Delete Button (outside of Link) */}
              <button
                onClick={() => dispatch(DELETE_PROJ(project.id))}
                className="absolute top-4 right-4 p-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
