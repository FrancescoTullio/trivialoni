import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { GlobalProviderValue } = useContext(GlobalContext);
  const { categoryArray } = GlobalProviderValue;
  const [selectedId, setSelectedId] = useState(null);
  return (
    // Contenitore principale centrato orizzontalmente e con padding verticale
    <div className="container mt-5 pt-5 pb-5"> 
      {/* Riga per centrare il contenuto sulla pagina */}
      <div className="row justify-content-center"> 
        {/* Colonna che restringe il contenuto per una migliore leggibilità su schermi grandi (max 6 colonne) */}
        <div className="col-lg-6 col-md-8 col-sm-10"> 
          
          {/* Card o box con ombra per raggruppare gli elementi e dare un look più pulito */}
          <div className="card shadow-lg p-4 p-md-5"> 
            
            {/* Titolo principale centrato e con margine inferiore */}
            <h1 className="text-center mb-4 display-4 fw-bold text-primary">Seleziona una Categoria</h1> 
            
            {/* Menu a tendina con margine inferiore e dimensione 'lg' per maggiore impatto */}
            <select 
              className="form-select form-select-lg mb-4" 
              aria-label="Selezione Categoria Quiz"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {/* Testo predefinito per la selezione */}
              <option value="">Scegli la tua categoria preferita...</option> 
              
              {/* Mappatura delle opzioni */}
              {categoryArray.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            
            {/* Link/Pulsante centrato, grande e a blocco */}
            <div className="d-grid"> 
              <Link 
                // Classi Bootstrap per un pulsante verde di grandi dimensioni
                className={`btn btn-success btn-lg fw-bold ${!selectedId ? 'disabled' : ''}`}
                to={selectedId ? `/quiz/${selectedId}` : '#'}
                onClick={(e) => !selectedId && e.preventDefault()}
              >
                Inizia il Quiz!
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;