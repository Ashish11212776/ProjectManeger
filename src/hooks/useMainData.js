import { useSelector } from "react-redux";

const useMainData = () => {
  return useSelector((state) => state.main);
};

export default useMainData;
