import { useState } from "react";
import "./css/header.css";
import { Link } from "react-router-dom";
import CreateProject from "./CreateProject";

const Header = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className="addNew-project-container">
      <header className="header">
        <h1 className="heading">ProjectManager</h1>
        <div className="btn-container">
        <Link to={'/'}><strong><p>Home</p></strong></Link>
        <strong><p>About</p></strong>
          <button
            className="new-project-btn"
            onClick={() => setisOpen(!isOpen)}
          >
            + New Project
          </button>
        </div>
      </header>
      {isOpen && (
        <div className="addNew-developer-container">
          <CreateProject setisOpen={setisOpen} />
        </div>
      )}
    </div>
  );
};

export default Header;
