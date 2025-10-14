import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CategoryCard({ id, name, description, icon = "🎯" }) {
  return (
    <div className="card h-100 border-0 shadow-lg hover-lift">
      {/* Card Header */}
      <div className="card-header bg-primary text-white py-3">
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="mb-0 fw-bold">{name}</h4>
          <span style={{ fontSize: '2rem' }}>{icon}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body p-4 d-flex flex-column">
        <p className="card-text text-secondary fs-5 mb-4 flex-grow-1">
          {description || "Metti alla prova le tue conoscenze in questa categoria!"}
        </p>

        {/* Button */}
        <Link 
          to={`/quiz/${id}`} 
          className="btn btn-primary btn-lg w-100 py-3 fw-semibold shadow"
        >
          <i className="bi bi-play-circle-fill me-2"></i>
          Inizia il Quiz
        </Link>
      </div>

      {/* Hover Effect CSS */}
      <style>{`
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.175) !important;
        }
      `}</style>
    </div>
  );
}

// PropTypes per validazione
CategoryCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string
};

export default CategoryCard;