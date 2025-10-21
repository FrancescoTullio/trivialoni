import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useQuestion from "../customHook/useQuestion";
import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import GlobalContext from "../context/GlobalContext";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Carica la configurazione del quiz, inizialmente null
  const [quizConfig, setQuizConfig] = useState(null);

  // 1. Caricamento della Configurazione
  useEffect(() => {
    const saved = sessionStorage.getItem(`quiz_config_${id}`);
    if (saved) {
      setQuizConfig(JSON.parse(saved));
    } else {
      // Se non c'è configurazione, torna alla pagina di config
      navigate(`/quiz/${id}`);
    }
  }, [id, navigate]);

  // Recupera le domande (useQuestion si attiverà solo quando quizConfig è settato)
  const question = useQuestion(id, quizConfig);

  // Carica le risposte salvate o inizializza come oggetto vuoto
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const saved = sessionStorage.getItem(`quiz_answers_${id}`);
    return saved ? JSON.parse(saved) : {};
  });

  const { GlobalProviderValue } = useContext(GlobalContext);
  const { correct, setCorrect, wrong, setWrong } = GlobalProviderValue;

  // 2. Salva le risposte ogni volta che cambiano
  useEffect(() => {
    // Salva in sessionStorage solo se ci sono risposte
    if (Object.keys(selectedAnswers).length > 0) {
      sessionStorage.setItem(`quiz_answers_${id}`, JSON.stringify(selectedAnswers));
    } else {
      // Rimuove se l'oggetto è vuoto (es. dopo un reset) per pulizia
      sessionStorage.removeItem(`quiz_answers_${id}`);
    }
  }, [selectedAnswers, id]);

  // 3. Ricalcola i contatori e controlla la fine del quiz
  useEffect(() => {
    // Controllo essenziale per evitare l'errore se quizConfig è null
    if (!quizConfig) return;

    // Se non ci sono risposte, assicurati che i contatori globali siano a zero e termina la funzione
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

    // Aggiorna i contatori GlobalContext
    setCorrect(correctCount);
    setWrong(wrongCount);

    // Naviga al risultato solo se hai risposto a tutte le domande
    if (correctCount + wrongCount >= quizConfig.amount && quizConfig.amount > 0) {
      const timer = setTimeout(() => {
        navigate("/result");
      }, 2000); // 2 secondi di ritardo prima di navigare

      return () => clearTimeout(timer);
    }

  }, [selectedAnswers, quizConfig, navigate, setCorrect, setWrong]);

  const handleClick = useCallback((questionIndex, answer) => {
    // Controllo per assicurarsi che la domanda esista prima di accedere a correct_answer
    if (!question || !question[questionIndex]) return;

    // Se la domanda è già stata risposta, ignora il click
    if (isQuestionAnswered(questionIndex)) return;

    const isCorrect = answer === question[questionIndex].correct_answer;

    setSelectedAnswers((prev) => ({
      ...prev,
      // La chiave usa l'indice e la risposta per garantire l'univocità
      [`${questionIndex}-${answer}`]: isCorrect,
    }));
  }, [question]); // Dipendenza rimossa: isQuestionAnswered non è strettamente necessaria se il check è fatto sopra

  const isQuestionAnswered = useCallback((questionIndex) => {
    // Verifica se esiste una chiave in selectedAnswers che inizia con l'indice della domanda
    const questionAnswers = Object.keys(selectedAnswers).filter(
      (key) => key.startsWith(`${questionIndex}-`)
    );
    return questionAnswers.length > 0;
  }, [selectedAnswers]);

  const getButtonClass = useCallback((questionIndex, answer) => {
    // Previene errori se la domanda non è ancora caricata
    if (!question || !question[questionIndex]) return "btn btn-outline-dark btn-lg w-100 mb-2 text-start quiz-answer-btn";

    const key = `${questionIndex}-${answer}`;
    const isAnswered = isQuestionAnswered(questionIndex);
    const correctAnswer = question[questionIndex]?.correct_answer;

    if (!isAnswered) {
      return "btn btn-outline-dark btn-lg w-100 mb-2 text-start quiz-answer-btn";
    }

    // Se questa è la risposta corretta, mostra il successo
    if (answer === correctAnswer) {
      return "btn btn-success btn-lg w-100 mb-2 text-start disabled quiz-answer-btn-correct";
    }

    // Se questa è la risposta selezionata dall'utente ed è sbagliata
    if (selectedAnswers[key] === false) {
      return "btn btn-danger btn-lg w-100 mb-2 text-start disabled quiz-answer-btn-wrong";
    }

    // Altre risposte sbagliate (non selezionate)
    return "btn btn-outline-secondary btn-lg w-100 mb-2 text-start disabled opacity-50";
  }, [selectedAnswers, isQuestionAnswered, question]);

  const stats = useMemo(() => {
    // Uso l'amount dalla config, o la lunghezza delle domande come fallback
    const totalQuestions = quizConfig?.amount || question?.length || 0;

    // Contiamo il numero di domande a cui è stata data una risposta (una sola per domanda)
    // Raggruppiamo per indice di domanda per contare le domande uniche risposte
    const answeredQuestionIndices = new Set();
    Object.keys(selectedAnswers).forEach((key) => {
        const index = key.split('-')[0];
        answeredQuestionIndices.add(index);
    });

    const answeredQuestions = answeredQuestionIndices.size;

    const progressPercentage = totalQuestions > 0
      ? (answeredQuestions / totalQuestions) * 100
      : 0;

    return { totalQuestions, answeredQuestions, progressPercentage };
  }, [question, selectedAnswers, quizConfig]);

  // Funzione per ricominciare il quiz con la stessa configurazione
  const handleResetQuiz = () => {
    // Rimuove le domande e le risposte forzando un nuovo fetch/stato
    sessionStorage.removeItem(`quiz_${id}`);
    sessionStorage.removeItem(`quiz_answers_${id}`);
    setSelectedAnswers({});
    setCorrect(0);
    setWrong(0);
    window.location.reload(); // Ricarica la pagina per re-inizializzare i custom hook e lo stato
  };

  // Funzione per tornare alla configurazione
  const handleBackToConfig = () => {
    sessionStorage.removeItem(`quiz_${id}`);
    sessionStorage.removeItem(`quiz_answers_${id}`);
    sessionStorage.removeItem(`quiz_config_${id}`); // Rimuove la config per forzare il ritorno
    navigate(`/quiz/${id}`); // Naviga alla pagina di configurazione
  };

  // Blocco di caricamento se la configurazione non è ancora caricata
  if (!quizConfig) {
    return (
      <div className="quiz-container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="card border-0 shadow-lg rounded-4 quiz-loading-card">
          <div className="card-body p-5 text-center">
            <div className="spinner-border mb-3 quiz-loading-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="fw-bold text-dark fs-5">Caricamento configurazione quiz...</p>
            <button
              className="btn btn-sm btn-outline-dark mt-3"
              onClick={handleBackToConfig}
            >
              Torna alla Configurazione
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render del Quiz
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
              Difficoltà: <strong>{quizConfig.difficulty === 'easy' ? 'Facile' : quizConfig.difficulty === 'medium' ? 'Media' : 'Difficile'}</strong>
              {' | '}
              Tipo: <strong>{quizConfig.type === 'multiple' ? 'Scelta Multipla' : 'Vero/Falso'}</strong>
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
              onClick={handleBackToConfig}
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
                            {quizConfig.type === 'boolean'
                              ? (answer === 'True' ? '✓' : '✗')
                              : String.fromCharCode(65 + idx)
                            }
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