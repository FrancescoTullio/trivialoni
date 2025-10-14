import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuestion from "../customHook/useQuestion";
import { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = useQuestion(id);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { GlobalProviderValue } = useContext(GlobalContext);
  const { correct, setCorrect, wrong, setWrong } = GlobalProviderValue;
  // Calcola i risultati quando selectedAnswers cambia
  useEffect(() => {
    // Resetta quando cambia il quiz
    setCorrect(0);
    setWrong(0);
    setSelectedAnswers({});
  }, [id, setCorrect, setWrong]);

  useEffect(() => {
    // Calcola risultati SOLO se ci sono risposte selezionate
    if (Object.keys(selectedAnswers).length === 0) return;

    let correctCount = 0;
    let wrongCount = 0;

    Object.values(selectedAnswers).forEach((isCorrect) => {
      if (isCorrect) correctCount++;
      else wrongCount++;
    });

    setCorrect(correctCount);
    setWrong(wrongCount);
  }, [selectedAnswers, setCorrect, setWrong]);

  const handleClick = (questionIndex, answer) => {
    const isCorrect = answer === question[questionIndex].correct_answer;

    setSelectedAnswers((prev) => ({
      ...prev,
      [`${questionIndex}-${answer}`]: isCorrect,
    }));
  };

  const getButtonClass = (questionIndex, answer) => {
    const key = `${questionIndex}-${answer}`;
    if (selectedAnswers[key] === undefined) {
      return "btn btn-primary m-1";
    }
    return selectedAnswers[key]
      ? "btn btn-success m-1 disabled"
      : "btn btn-danger m-1 disabled";
  };

  return (
    <>
      <button className="btn btn-success" onClick={() => navigate(-1)}>
        indietro
      </button>
      {correct + wrong > 0 && (
        <div className="mb-3">
          <span className="badge bg-success m-1">
            hai dato {correct} risposte corrette
          </span>
          <span className="badge bg-danger m-1">
            hai dato {wrong} risposte sbagliate
          </span>
        </div>
      )}

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
