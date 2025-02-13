import { useState } from "react";
import { useParams } from "react-router-dom";
import { ADD_DEVELOPER } from "../feactures/mainSlice";
import { useDispatch } from "react-redux";
const AddNewDeveloper = () => {
 const dispatch=useDispatch();

   const id=useParams()
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
   
   dispatch(ADD_DEVELOPER({ proj_Id:id, developer: developer }));

    setDeveloper({ devId: "", devName: "", dateOfJoin: "", listOfTasks: [] });
  };

  return (
    <div className="developer-form-container">
      <h2>Add New Developer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="devId"
          placeholder="Developer ID"
          value={developer.devId}
          onChange={handleChange}
        />
        
        <input
          type="text"
          name="devName"
          placeholder="Developer Name"
          value={developer.devName}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfJoin"
          value={developer.dateOfJoin}
          onChange={handleChange}
        />
        <button type="submit">Add Developer</button>
      </form>
    </div>
  );
};

export default AddNewDeveloper;
