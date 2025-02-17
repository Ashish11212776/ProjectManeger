import { Link, useParams } from "react-router-dom";
import useMainData from "../hooks/useMainData.js";
import { useState } from "react";
import { Calendar, Users, Clock, PlusCircle, Pencil } from "lucide-react";
import AddNewDeveloper from "./AddnewDeveloper.jsx";
import CreateProject from "./CreateProject.jsx";

const ProjectDetails = () => {
  const { isLoading, data, error } = useMainData();
  const { id } = useParams();
  const [isOpen, setisOpen] = useState(false);
  const [isEdit,setisEdit]=useState(false);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-800 rounded-lg p-4 max-w-md">
          Something went wrong! Please try again.
        </div>
      </div>
    );

  if (!data?.listOfProjects)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-50 rounded-lg p-4 max-w-md text-center">
          No data available.
        </div>
      </div>
    );

  const project = data.listOfProjects.find((item) => String(item.id) === id);

  if (!project)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-50 text-yellow-800 rounded-lg p-4 max-w-md">
          Project Not Found
        </div>
      </div>
    );

  const getStatusColor = (status) => {
    const statusMap = {
      Active: "bg-green-100 text-green-800",
      "In Progress": "bg-blue-100 text-blue-800",
      Done: "bg-purple-100 text-purple-800",
      "On Hold": "bg-yellow-100 text-yellow-800",
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 py-8 ${
        isOpen ? "overflow-hidden" : ""
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          isOpen || isEdit ? "blur-sm" : ""
        }`}
      >
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {project.name}
              </h1>
              <div className="flex items-center space-x-3">
                {/* edit */}
                <button
                  onClick={() => setisEdit(!isEdit)}
                  className="p-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Pencil className="w-4 h-4" />
                </button>
               
                <button
                  onClick={() => setisOpen(!isOpen)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Developer
                </button>
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="px-6 py-4 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                Project Details
              </h2>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Description: </span>
                  {project.desc}
                </p>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium mr-2">Start Date:</span>
                  {project.projStartDate}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-medium mr-2">Status:</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Developers Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 mr-2 text-gray-500" />
                <h2 className="text-lg font-medium text-gray-900">
                  Developers
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.listOfDevelopers.map((dev, index) => (
                  <Link
                    to={`/${id}/dev/${dev.devId}`}
                    key={index}
                    className="block transition-transform duration-300 hover:scale-102"
                  >
                    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {dev.devName}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Joined: {dev.dataOfJoin}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <AddNewDeveloper setisOpen={setisOpen} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* /for edit page */}
      {isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <CreateProject setisEdit={setisEdit} project={project} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
