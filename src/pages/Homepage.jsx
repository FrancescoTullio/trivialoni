import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { GlobalProviderValue } = useContext(GlobalContext);
  const { categoryArray } = GlobalProviderValue;
  const [selectedId, setSelectedId] = useState(null);
  
  return (
    <div className="container mt-5 pt-5 pb-5"> 
      <div className="row justify-content-center"> 
        <div className="col-lg-6 col-md-8 col-sm-10"> 
          
          <div className="card shadow-lg p-4 p-md-5"> 
            
            <h1 className="text-center mb-4 display-4 fw-bold text-primary">Seleziona una Categoria</h1> 
            
            <select 
              className="form-select form-select-lg mb-4" 
              aria-label="Selezione Categoria Quiz"
              value={selectedId || ""}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">Scegli la tua categoria preferita...</option> 
              
              {categoryArray.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            
            <div className="d-grid"> 
              <Link 
                className={`btn btn-success btn-lg fw-bold ${!selectedId ? 'disabled' : ''}`}
                to={selectedId ? `/quiz/${selectedId}` : '#'}
                onClick={(e) => !selectedId && e.preventDefault()}
              >
                Configura Quiz! ⚙️
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;