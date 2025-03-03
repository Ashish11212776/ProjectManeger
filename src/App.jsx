import { useDispatch } from "react-redux";
import { fetchData } from "./feactures/mainThunks.js";
import { useEffect } from "react";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import ProjectDetails from "./components/ProjectDetails.jsx";
import DeveloperDetails from "./components/DeveloperDetails.jsx";



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProjectDetails />} />
        <Route path="/:id/dev/:devId" element={<DeveloperDetails />} />
      </Routes>
    </>
  );
}

export default App;
