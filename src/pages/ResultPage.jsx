import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";

function ResultPage() {
  const { GlobalProviderValue } = useContext(GlobalContext);
  const { correct, wrong } = GlobalProviderValue;

  const total = correct + wrong;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body text-center p-5">
              <h2 className="card-title mb-4 fw-bold">Risultati Quiz</h2>
              
              <div className="mb-4">
                <p className="fs-5 mb-2">Risposte Esatte</p>
                <p className="display-4 text-success fw-bold">{correct}</p>
              </div>

              <div className="mb-4">
                <p className="fs-5 mb-2">Risposte Sbagliate</p>
                <p className="display-4 text-danger fw-bold">{wrong}</p>
              </div>

              <div className="alert alert-info mb-4">
                <p className="fs-5 mb-0">Punteggio: <strong>{percentage}%</strong></p>
              </div>

              <Link to="/" className="btn btn-warning btn-lg fw-bold">
                <i className="fas fa-home me-2"></i>
                Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;