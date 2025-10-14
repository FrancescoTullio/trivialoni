import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import CategoryCard from "../components/CategoryCard";

function Category() {
  const { GlobalProviderValue } = useContext(GlobalContext);
  const { categoryArray } = GlobalProviderValue;
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-4">
            <h1 className="display-3 fw-bold text-dark mb-3">
              Scegli la tua categoria
            </h1>
            <p className="lead fs-4 text-secondary">
              Seleziona l'argomento che preferisci e metti alla prova le tue conoscenze!
            </p>
          </div>
          
          {/* Bottone Indietro */}
          <div className="d-flex justify-content-start">
            <button 
              className="btn btn-outline-secondary btn-lg px-4 py-2 shadow-sm" 
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Indietro
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {categoryArray.map((category) => (
          <div className="col" key={category.id}>
            <CategoryCard 
              id={category.id}
              name={category.name}
              description={category.description}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categoryArray.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-4" style={{ fontSize: '5rem' }}>
            📚
          </div>
          <h3 className="text-muted">Nessuna categoria disponibile al momento</h3>
        </div>
      )}
    </div>
  );
}

export default Category;