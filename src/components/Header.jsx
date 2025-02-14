import { useState } from 'react';
import './css/header.css'
import CreateProject from './CreateProject';


const Header = () => {
  const [isOpen,setisOpen]=useState(false);
  return (
    <div className="addNew-project-container">
    <header className="header">
      <h1 className="heading">ProjectManager</h1>
      <button className="new-project-btn" onClick={()=>setisOpen(!isOpen)}>+ New Project</button>
    </header>
     {isOpen && <div className="addNew-developer-container">
       <CreateProject setisOpen={setisOpen}/>
      </div>}
      </div>
  );
};

export default Header;
