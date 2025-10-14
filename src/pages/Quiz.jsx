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

  useEffect(() => {
    setCorrect(0);
    setWrong(0);
    setSelectedAnswers({});
  }, [id, setCorrect, setWrong]);

  useEffect(() => {
    if (Object.keys(selectedAnswers).length === 0) return;

    let correctCount = 0;
    let wrongCount = 0;

    Object.values(selectedAnswers).forEach((isCorrect) => {
      if (isCorrect) correctCount++;
      else wrongCount++;
    });

    setCorrect(correctCount);
    setWrong(wrongCount);
    if (correctCount >= 10) navigate("/result");
  }, [selectedAnswers, setCorrect, setWrong]);

  const handleClick = (questionIndex, answer) => {
    const isCorrect = answer === question[questionIndex].correct_answer;

    setSelectedAnswers((prev) => ({
      ...prev,
      [`${questionIndex}-${answer}`]: isCorrect,
    }));
  };

  const isQuestionAnswered = (questionIndex) => {
    const questionAnswers = Object.keys(selectedAnswers).filter(
      (key) => key.startsWith(`${questionIndex}-`)
    );
    return questionAnswers.length > 0;
  };

  const getButtonClass = (questionIndex, answer) => {
    const key = `${questionIndex}-${answer}`;
    const isAnswered = isQuestionAnswered(questionIndex);
    
    if (selectedAnswers[key] === undefined) {
      return isAnswered 
        ? "btn btn-outline-secondary btn-lg w-100 mb-2 text-start disabled opacity-50"
        : "btn btn-outline-primary btn-lg w-100 mb-2 text-start";
    }
    return selectedAnswers[key]
      ? "btn btn-success btn-lg w-100 mb-2 text-start disabled"
      : "btn btn-danger btn-lg w-100 mb-2 text-start disabled";
  };

  const totalQuestions = question?.length || 0;
  const answeredQuestions = Object.keys(selectedAnswers).filter(
    (key) => selectedAnswers[key] !== undefined
  ).length;
  const progressPercentage = totalQuestions > 0 
    ? (answeredQuestions / totalQuestions) * 100 
    : 0;

  return (
    <div className="min-vh-100 bg-gradient" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="container-lg py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="text-white fw-bold mb-2">Quiz Challenge</h1>
            <p className="text-white-50 mb-0">Metti alla prova le tue conoscenze</p>
          </div>
          <button 
            className="btn btn-light btn-lg rounded-pill px-4 fw-bold"
            onClick={() => navigate(-1)}
          >
            ← Indietro
          </button>
        </div>

        {/* Stats Cards */}
        {correct + wrong > 0 && (
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="card border-0 bg-success bg-opacity-10 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title text-success fw-bold">Risposte Corrette</h5>
                  <p className="h3 text-success mb-0">{correct}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card border-0 bg-danger bg-opacity-10 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title text-danger fw-bold">Risposte Sbagliate</h5>
                  <p className="h3 text-danger mb-0">{wrong}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-white fw-bold">Progresso Quiz</span>
            <span className="badge bg-light text-dark">{answeredQuestions}/{totalQuestions}</span>
          </div>
          <div className="progress bg-white bg-opacity-20" style={{ height: "8px" }}>
            <div 
              className="progress-bar bg-light" 
              role="progressbar" 
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        {/* Questions Container */}
        {question && question.length > 0 ? (
          <div className="row">
            {question.map((item, index) => (
              <div key={index} className="col-12 mb-4">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
                  <div className="card-header bg-gradient" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-light text-dark fs-6">Domanda {index + 1}</span>
                      <span className="badge bg-white text-dark fs-6">{totalQuestions} domande</span>
                    </div>
                  </div>
                  
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-4 text-dark fs-5">
                      {item.question}
                    </h5>
                    
                    <div className="answers-container">
                      {item.allAnsweresFinal.map((answer, idx) => (
                        <button
                          key={idx}
                          className={getButtonClass(index, answer)}
                          onClick={() => handleClick(index, answer)}
                          disabled={isQuestionAnswered(index)}
                          style={{
                            borderRadius: "12px",
                            padding: "12px 20px",
                            fontWeight: "500",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <span className="me-3 badge bg-secondary rounded-pill">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {answer}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5 text-center">
              <div className="spinner-border text-light mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-white fw-bold">Caricamento domande in corso...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;