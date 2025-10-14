import { Link } from "react-router-dom";

function AppHeader() {
    return (
        // Navbar fissa in alto, con sfondo brand e sfumatura
        <nav className="navbar navbar-expand-lg navbar-dark bg-info bg-gradient shadow">
            <div className="container py-1"> {/* Padding verticale leggero */}
                
                {/* Brand/Logo Link */}
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    {/* Icona in risalto */}
                    <i className="fas fa-puzzle-piece text-warning me-2 fs-4"></i>
                    <span className="fw-bolder fs-4">Trivialoni</span>
                </Link>

                {/* Bottone Toggler per il Mobile */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu di Navigazione (allineato a destra) */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center"> {/* Centra verticalmente gli elementi sulla navbar */}
                        
                        {/* Link Home - Opzionale ma consigliato */}
                         <li className="nav-item me-lg-2">
                            <Link to="/" className="nav-link text-white">Home</Link>
                        </li>

                        {/* Link Categorie (come pulsante discreto) */}
                        <li className="nav-item me-lg-2">
                            <Link 
                                to="/category" 
                                // Piccolo pulsante di navigazione con sfondo info
                                className="nav-link btn btn-sm btn-outline-warning fw-bold text-white px-3 py-2 rounded-pill" 
                            >
                                <i className="fas fa-list-ul me-2"></i>Categorie
                            </Link>
                        </li>

                        {/* Link Chi Siamo */}
                        <li className="nav-item">
                            <Link to="/about" className="nav-link text-white-75">
                                <i className="fas fa-info-circle me-2"></i>Chi Siamo
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AppHeader;