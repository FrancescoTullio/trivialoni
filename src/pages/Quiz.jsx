import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuestion from "../customHook/useQuestion";
import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import GlobalContext from "../context/GlobalContext";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = useQuestion(id);
  
  // Carica le risposte salvate o inizializza come oggetto vuoto
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const saved = sessionStorage.getItem(`quiz_answers_${id}`);
    return saved ? JSON.parse(saved) : {};
  });

  const { GlobalProviderValue } = useContext(GlobalContext);
  const { correct, setCorrect, wrong, setWrong } = GlobalProviderValue;

  // Salva le risposte ogni volta che cambiano
  useEffect(() => {
    if (Object.keys(selectedAnswers).length > 0) {
      sessionStorage.setItem(`quiz_answers_${id}`, JSON.stringify(selectedAnswers));
    }
  }, [selectedAnswers, id]);

  // Ricalcola i contatori quando le risposte sono caricate
  useEffect(() => {
    if (Object.keys(selectedAnswers).length === 0) {
      setCorrect(0);
      setWrong(0);
      return;
    }

    let correctCount = 0;
    let wrongCount = 0;

    Object.values(selectedAnswers).forEach((isCorrect) => {
      if (isCorrect) correctCount++;
      else wrongCount++;
    });

    setCorrect(correctCount);
    setWrong(wrongCount);
  }, [id]); // Esegui solo quando cambia la categoria

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
    
    // Naviga al risultato solo se hai risposto a tutte e 10 le domande
    if (correctCount + wrongCount >= 10) {
      // Aspetta 2 secondi prima di navigare
      const timer = setTimeout(() => {
        navigate("/result");
      }, 2000);
      
      // Cleanup del timer se il componente viene smontato prima
      return () => clearTimeout(timer);
    }
  }, [selectedAnswers]);

  const handleClick = useCallback((questionIndex, answer) => {
    const isCorrect = answer === question[questionIndex].correct_answer;

    setSelectedAnswers((prev) => ({
      ...prev,
      [`${questionIndex}-${answer}`]: isCorrect,
    }));
  }, [question]);

  const isQuestionAnswered = useCallback((questionIndex) => {
    const questionAnswers = Object.keys(selectedAnswers).filter(
      (key) => key.startsWith(`${questionIndex}-`)
    );
    return questionAnswers.length > 0;
  }, [selectedAnswers]);

  const getButtonClass = useCallback((questionIndex, answer) => {
    const key = `${questionIndex}-${answer}`;
    const isAnswered = isQuestionAnswered(questionIndex);
    
    if (selectedAnswers[key] === undefined) {
      return isAnswered 
        ? "btn btn-outline-secondary btn-lg w-100 mb-2 text-start disabled opacity-50"
        : "btn btn-outline-dark btn-lg w-100 mb-2 text-start quiz-answer-btn";
    }
    return selectedAnswers[key]
      ? "btn btn-success btn-lg w-100 mb-2 text-start disabled quiz-answer-btn-correct"
      : "btn btn-danger btn-lg w-100 mb-2 text-start disabled quiz-answer-btn-wrong";
  }, [selectedAnswers, isQuestionAnswered]);

  const stats = useMemo(() => {
    const totalQuestions = question?.length || 0;
    const answeredQuestions = Object.keys(selectedAnswers).filter(
      (key) => selectedAnswers[key] !== undefined
    ).length;
    const progressPercentage = totalQuestions > 0 
      ? (answeredQuestions / totalQuestions) * 100 
      : 0;
    
    return { totalQuestions, answeredQuestions, progressPercentage };
  }, [question, selectedAnswers]);

  // Pulisce il sessionStorage quando esci dalla pagina del quiz
  useEffect(() => {
    return () => {
      // Questa funzione viene eseguita quando il componente viene smontato
      // (cioè quando navighi via dalla pagina del quiz)
      sessionStorage.removeItem(`quiz_${id}`);
      sessionStorage.removeItem(`quiz_answers_${id}`);
    };
  }, [id]);

  // Funzione per ricominciare il quiz
  const handleResetQuiz = () => {
    sessionStorage.removeItem(`quiz_${id}`);
    sessionStorage.removeItem(`quiz_answers_${id}`);
    setSelectedAnswers({});
    setCorrect(0);
    setWrong(0);
    window.location.reload(); // Ricarica per ottenere nuove domande
  };

  return (
    <div className="quiz-container min-vh-100">
      <div className="container-lg py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="quiz-title text-white fw-bold mb-2">
              Quiz Challenge
            </h1>
            <p className="quiz-subtitle text-white mb-0 opacity-90">
              Metti alla prova le tue conoscenze
            </p>
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-warning btn-lg rounded-pill px-4 fw-bold shadow"
              onClick={handleResetQuiz}
              title="Ricomincia con nuove domande"
            >
              🔄 Reset
            </button>
            <button 
              className="btn btn-light btn-lg rounded-pill px-4 fw-bold shadow quiz-back-btn"
              onClick={() => navigate(-1)}
            >
              ← Indietro
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {correct + wrong > 0 && (
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="card border-0 shadow-lg quiz-stats-card-correct">
                <div className="card-body text-center py-4">
                  <h5 className="card-title fw-bold mb-2 quiz-stats-title-correct">
                    ✓ Risposte Corrette
                  </h5>
                  <p className="display-4 fw-bold mb-0 quiz-stats-number-correct">
                    {correct}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card border-0 shadow-lg quiz-stats-card-wrong">
                <div className="card-body text-center py-4">
                  <h5 className="card-title fw-bold mb-2 quiz-stats-title-wrong">
                    ✗ Risposte Sbagliate
                  </h5>
                  <p className="display-4 fw-bold mb-0 quiz-stats-number-wrong">
                    {wrong}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="card border-0 shadow-lg mb-4 quiz-progress-card">
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold text-dark">Progresso Quiz</span>
              <span className="badge bg-dark fs-6">
                {stats.answeredQuestions}/{stats.totalQuestions}
              </span>
            </div>
            <div className="progress quiz-progress-bar">
              <div 
                className="progress-bar quiz-progress-fill" 
                role="progressbar" 
                style={{ width: `${stats.progressPercentage}%` }}
                aria-valuenow={stats.progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>

        {/* Questions Container */}
        {question && question.length > 0 ? (
          <div className="row">
            {question.map((item, index) => (
              <div key={index} className="col-12 mb-4">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="card-header py-3 quiz-question-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-white text-dark fs-6 fw-bold px-3 py-2">
                        Domanda {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body p-4 quiz-question-body">
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
                        >
                          <span className="me-3 badge rounded-circle d-inline-flex align-items-center justify-content-center quiz-answer-letter">
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
          <div className="card border-0 shadow-lg rounded-4 quiz-loading-card">
            <div className="card-body p-5 text-center">
              <div className="spinner-border mb-3 quiz-loading-spinner" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="fw-bold text-dark fs-5">Caricamento domande in corso...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;