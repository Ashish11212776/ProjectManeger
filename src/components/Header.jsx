import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-900 p-4 shadow-md">
      <header className="flex justify-between items-center p-4  text-white shadow-lg">
        <h1 className="text-2xl font-bold">ProjectManager</h1>
        <div className="flex space-x-6 items-center w-1/4 ">
          <Link
            to={"/"}
            className="bg-[#ff7f50] text-white px-4 py-2 font-bold rounded-md transition duration-300 ease-in-out hover:bg-[#ff5733]"
          >
            Home
          </Link>
          <p  className="bg-[#ff7f50] text-white px-4 py-2 font-bold rounded-md transition duration-300 ease-in-out hover:bg-[#ff5733]">About</p>
        </div>
      </header>
    </div>
  );
};

export default Header;
