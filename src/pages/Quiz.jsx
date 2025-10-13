import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuestion from "../customHook/useQuestion";
import { useState } from "react";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = useQuestion(id);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  console.log(question);

  const handleClick = (questionIndex, answer) => {
    const isCorrect = answer === question[questionIndex].correct_answer;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [`${questionIndex}-${answer}`]: isCorrect
    }));
  };

  const getButtonClass = (questionIndex, answer) => {
    const key = `${questionIndex}-${answer}`;
    if (selectedAnswers[key] === undefined) {
      return "btn btn-primary m-1";
    }
    return selectedAnswers[key] ? "btn btn-success m-1" : "btn btn-danger m-1";
  };

  return (
    <>
      <button className="btn btn-success" onClick={() => navigate(-1)}>
        indietro
      </button>
      <h1>quiz con id: {id}</h1>  
      
      {question && question.length > 0 ? (
        question.map((item, index) => (
          <div key={index} className="card mb-3">
            <p>{item.question}</p>
            {item.allAnsweresFinal.map((answer, idx) => (
              <button 
                key={idx} 
                className={getButtonClass(index, answer)}
                onClick={() => handleClick(index, answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        ))
      ) : (
        <div>Loading questions...</div>
      )}
    </>
  );
}

export default Quiz;