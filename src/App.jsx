import { useDispatch } from "react-redux";
import { fetchData } from "./feactures/mainThunks.js";
import { useEffect } from "react";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import {Routes, Route } from "react-router-dom";
import CreateProject from "./components/CreateProject.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return(
    <>
    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/new" element={<CreateProject/>} />
    </Routes>
    </>
  )
}

export default App;
