import { Link } from "react-router-dom"

function AppFooter() {
    return (
            <footer class="bg-dark text-white mt-5">
        <div class="container py-4">
            <div class="row">
                <div class="col-md-4 mb-3">
                    <h5 class="text-uppercase mb-3">Trivialoni</h5>
                    <p class="text-white-50">Il tuo quiz interattivo preferito. Metti alla prova le tue conoscenze e sfida i tuoi amici!</p>
                </div>
                <div class="col-md-4 mb-3">
                    <h6 class="text-uppercase mb-3">Link Rapidi</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><Link to="/" class="text-white-50 text-decoration-none footer-link">Home</Link></li>
                        <li class="mb-2"><Link to="/category" class="text-white-50 text-decoration-none footer-link">Categorie</Link></li>
                        <li class="mb-2"><Link to="/about" class="text-white-50 text-decoration-none footer-link">Chi Siamo</Link></li>
                    </ul>
                </div>
                <div class="col-md-4 mb-3">
                    <h6 class="text-uppercase mb-3">Contatti</h6>
                    <p class="text-white-50 mb-2">Email: info@trivialoni.it</p>
                    <p class="text-white-50 mb-0">Supporto: supporto@trivialoni.it</p>
                </div>
            </div>
            <hr class="border-secondary my-4" />
            <div class="row">
                <div class="col-12 text-center">
                    <p class="text-white-50 mb-0">&copy; 2025 Trivialoni. Tutti i diritti riservati.</p>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default AppFooter;