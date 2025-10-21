import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function QuizConfig() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [config, setConfig] = useState({
    amount: 10,
    difficulty: "medium",
    type: "multiple",
  });

  const handleStart = () => {
    // Salva la configurazione nel sessionStorage
    sessionStorage.setItem(`quiz_config_${id}`, JSON.stringify(config));
    // Naviga alla pagina del quiz
    navigate(`/quiz/${id}/play`);
  };

  return (
    <div className="quiz-container min-vh-100">
      <div className="container-lg py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header py-4 quiz-question-header">
                <h2 className="text-white text-center fw-bold mb-0">
                  ⚙️ Configura il tuo Quiz
                </h2>
              </div>

              <div className="card-body p-5">
                {/* Numero di Domande */}
                <div className="mb-5">
                  <label className="form-label fw-bold fs-5 text-dark mb-3">
                    📝 Numero di Domande
                  </label>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="range"
                      className="form-range flex-grow-1"
                      min="1"
                      max="20"
                      value={config.amount}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          amount: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="badge bg-primary fs-4 px-4 py-2">
                      {config.amount}
                    </span>
                  </div>
                  <div className="text-muted small mt-2">
                    Scegli quante domande vuoi affrontare (da 1 a 20)
                  </div>
                </div>

                {/* Difficoltà */}
                <div className="mb-5">
                  <label className="form-label fw-bold fs-5 text-dark mb-3">
                    🎯 Difficoltà
                  </label>
                  <div className="d-grid gap-3">
                    <button
                      className={`btn btn-lg text-start ${
                        config.difficulty === "easy"
                          ? "btn-success"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() =>
                        setConfig({ ...config, difficulty: "easy" })
                      }
                    >
                      <span className="me-3">😊</span>
                      <strong>Facile</strong>
                      <span className="ms-2 text-muted small">
                        - Perfetto per iniziare
                      </span>
                    </button>
                    <button
                      className={`btn btn-lg text-start ${
                        config.difficulty === "medium"
                          ? "btn-warning"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() =>
                        setConfig({ ...config, difficulty: "medium" })
                      }
                    >
                      <span className="me-3">🤔</span>
                      <strong>Medio</strong>
                      <span className="ms-2 text-muted small">
                        - Una sfida equilibrata
                      </span>
                    </button>
                    <button
                      className={`btn btn-lg text-start ${
                        config.difficulty === "hard"
                          ? "btn-danger"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() =>
                        setConfig({ ...config, difficulty: "hard" })
                      }
                    >
                      <span className="me-3">🔥</span>
                      <strong>Difficile</strong>
                      <span className="ms-2 text-muted small">
                        - Solo per esperti!
                      </span>
                    </button>
                  </div>
                </div>

                {/* Tipo di Domande */}
                <div className="mb-5">
                  <label className="form-label fw-bold fs-5 text-dark mb-3">
                    ❓ Tipo di Domande
                  </label>
                  <div className="d-grid gap-3">
                    <button
                      className={`btn btn-lg text-start ${
                        config.type === "multiple"
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setConfig({ ...config, type: "multiple" })}
                    >
                      <span className="me-3">🎲</span>
                      <strong>Scelta Multipla</strong>
                      <span className="ms-2 text-muted small">
                        - 4 opzioni tra cui scegliere
                      </span>
                    </button>
                    <button
                      className={`btn btn-lg text-start ${
                        config.type === "boolean"
                          ? "btn-info"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setConfig({ ...config, type: "boolean" })}
                    >
                      <span className="me-3">✓✗</span>
                      <strong>Vero o Falso</strong>
                      <span className="ms-2 text-muted small">
                        - Solo due possibilità
                      </span>
                    </button>
                  </div>
                </div>

                {/* Pulsanti di Azione */}
                <div className="d-flex gap-3 mt-5">
                  <button
                    className="btn btn-light btn-lg flex-grow-1 fw-bold"
                    onClick={() => navigate("/category")}
                  >
                    ← Indietro
                  </button>
                  <button
                    className="btn btn-success btn-lg flex-grow-1 fw-bold shadow"
                    onClick={handleStart}
                  >
                    Inizia Quiz! 🚀
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizConfig;
