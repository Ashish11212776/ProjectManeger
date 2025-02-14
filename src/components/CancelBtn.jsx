
import "./css/cancelBtn.css";
const CancelBtn = ({setisOpen}) => {
  return (
    <p className="cancel-btn" onClick={()=>setisOpen()}>❌</p>
  )
}

export default CancelBtn