import { useParams } from "react-router-dom";
import useMainData from "../hooks/useMainData"

const ProjectDetails = () => {
     const { isLoading, data, error } = useMainData();
     const {id}=useParams();
     console.log(data);
     const findProject=data.listOfProjects.find()
  return (
     <div className="main-container">
        {data.map}
     </div>
  )
}

export default ProjectDetails
