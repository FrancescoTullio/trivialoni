import { useParams } from "react-router-dom";

function Quiz() {

const { id } = useParams();
  return (
    <>
    <h1>quix con id : {id} </h1>  
   
    
    </>
  )
}

export default   Quiz