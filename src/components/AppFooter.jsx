import { Link } from "react-router-dom"

function AppFooter() {
    return (
            // Aggiunto pt-5 e pb-4 per un migliore spaziatura
            <footer className="bg-dark text-white pt-5 pb-4 mt-5"> 
        <div className="container">
            <div className="row">
                
                {/* Colonna Brand e Descrizione */}
                <div className="col-md-4 mb-4">
                    <h5 className="text-uppercase fw-bold mb-3 text-info">Trivialoni</h5> {/* Titolo evidenziato con il colore brand */}
                    <p className="text-white-50 small">Il tuo quiz interattivo preferito. Metti alla prova le tue conoscenze e sfida i tuoi amici!</p>
                </div>
                
                {/* Colonna Link Rapidi */}
                <div className="col-md-4 mb-4">
                    <h6 className="text-uppercase fw-bold mb-3">Link Rapidi</h6>
                    <ul className="list-unstyled">
                        {/* Uso di text-secondary per discrezione, che diventa bianco (default hover) */}
                        <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
                        <li className="mb-2"><Link to="/category" className="text-secondary text-decoration-none">Categorie</Link></li>
                        <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">Chi Siamo</Link></li>
                    </ul>
                </div>
                
                {/* Colonna Contatti */}
                <div className="col-md-4 mb-4">
                    <h6 className="text-uppercase fw-bold mb-3">Contatti</h6>
                    {/* Resi gli indirizzi email cliccabili */}
                    <p className="text-secondary mb-2">Email: <a href="mailto:info@trivialoni.it" className="text-white-50 text-decoration-none">info@trivialoni.it</a></p>
                    <p className="text-secondary mb-0">Supporto: <a href="mailto:supporto@trivialoni.it" className="text-white-50 text-decoration-none">supporto@trivialoni.it</a></p>
                </div>
            </div>
            
            <hr className="border-secondary my-4" />
            
            {/* Sezione Copyright */}
            <div className="row">
                <div className="col-12 text-center">
                    <p className="text-secondary small mb-0">&copy; 2025 Trivialoni. Tutti i diritti riservati.</p> {/* Testo più discreto */}
                </div>
            </div>
        </div>
    </footer>
    );
};

export default AppFooter;