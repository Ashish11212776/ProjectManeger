import './header.css'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1 className="heading">ProjectManager</h1>
      <Link to='/new'><button className="new-project-btn">+ New Project</button></Link>
    </header>
  );
};

export default Header;
