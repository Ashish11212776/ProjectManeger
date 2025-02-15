import { useState } from "react";
import { Link } from "react-router-dom";
import CreateProject from "./CreateProject";

const Header = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className="bg-gray-900 p-4 shadow-md">
      <header className="flex justify-between items-center p-4  text-white shadow-lg">
        <h1 className="text-2xl font-bold">ProjectManager</h1>
        <div className="flex space-x-6 items-center w-1/4 justify-between">
          <Link to={'/'} className="text-white font-semibold hover:underline">Home</Link>
          <p className="text-white font-semibold hover:underline">About</p>
          <button
            className="bg-[#ff7f50] text-white px-4 py-2 font-bold rounded-md transition duration-300 ease-in-out hover:bg-[#ff5733]"
            onClick={() => setisOpen(!isOpen)}
          >
            + New Project
          </button>
        </div>
      </header>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <CreateProject setisOpen={setisOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;