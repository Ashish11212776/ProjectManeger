
const CancelBtn = ({setisOpen}) => {
  return (
    <p className="cancel-btn cursor-pointer" onClick={()=>setisOpen()}>❌</p>
  )
}

export default CancelBtn