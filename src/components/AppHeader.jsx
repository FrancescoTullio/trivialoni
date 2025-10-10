
function AppHeader() {
    return (
       <header class="bg-info bg-gradient py-5 shadow">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
                    <h1 class="display-3 fw-bold text-white mb-2">
                        <i class="fas fa-puzzle-piece text-warning me-3"></i>
                        Trivialoni
                    </h1>
                    <p class="lead text-white fs-4 mb-0">Il tuo quiz interattivo preferito!</p>
                </div>
                <div class="col-lg-6">
                    <div class="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-end gap-3">
                        <button class="btn btn-warning btn-lg fw-bold shadow-lg px-5 py-3 rounded-pill">
                            <i class="fas fa-list-ul me-2"></i>Scegli la Categoria
                        </button>
                        <button class="btn btn-light btn-lg fw-bold shadow px-4 py-3 rounded-pill">
                            <i class="fas fa-info-circle me-2"></i>Chi Siamo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    )
};

export default AppHeader;