import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuestion from "../customHook/useQuestion";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = useQuestion(id);
  
  console.log(question);
  
  return (
    <>
      <button className="btn btn-success" onClick={() => navigate(-1)}>
        indietro
      </button>
      <h1>quiz con id: {id}</h1>  
      
      {question && question.length > 0 ? (
        question.map((item, index) => (
          <div key={index} className="card mb-3">
            {/* Qui metti il contenuto della card */}
            <p>{item.question}</p>
          </div>
        ))
      ) : (
        <div>Loading questions...</div>
      )}
    </>
  );
}

export default Quiz;