import { useState } from "react";
import { useParams } from "react-router-dom";
import { ADD_DEVELOPER } from "../feactures/mainSlice";
import { useDispatch } from "react-redux";
import CancelBtn from "./CancelBtn";

const AddNewDeveloper = ({ setisOpen }) => {
  const dispatch = useDispatch();
  const id = useParams();
  const [developer, setDeveloper] = useState({
    devId: "",
    devName: "",
    dateOfJoin: "",
    listOfTasks: [],
  });

  const handleChange = (e) => {
    setDeveloper({ ...developer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ADD_DEVELOPER({ proj_Id: id, developer: developer }));
    setDeveloper({ devId: "", devName: "", dateOfJoin: "", listOfTasks: [] });
    setisOpen();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <CancelBtn setisOpen={setisOpen} />
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add New Developer
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            type="text"
            name="devId"
            placeholder="Developer ID"
            value={developer.devId}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            required
            type="text"
            name="devName"
            placeholder="Developer Name"
            value={developer.devName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <input
            required
            type="date"
            name="dateOfJoin"
            value={developer.dateOfJoin}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md w-full transition"
          >
            Add Developer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewDeveloper;
