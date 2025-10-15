
function AboutUs() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-9">
          
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 className="display-3 fw-bold text-dark mb-4">
              Grazie per aver giocato!
            </h1>
            <p className="lead fs-4 text-secondary mb-3">
              Salve a tutti, questo è un piccolo progetto realizzato da due neo programmatori 
              che si annoiavano in attesa di trovare qualcuno che li assumesse ahahahah.
            </p>
            <p className="fs-5 text-secondary">
              Speriamo vi sia piaciuto! In caso fateci sapere cosa ne pensate contattandoci tramite LinkedIn.
            </p>
          </div>

          <hr className="my-5 border-3 opacity-25" />

          {/* Team Section */}
          <h2 className="text-center display-5 fw-bold text-dark mb-5">Il nostro team</h2>
          
          <div className="row g-4">
            {/* Francesco Card */}
            <div className="col-12 col-md-6">
              <div className="card border-0 shadow-lg h-100 overflow-hidden">
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4E03AQFeoS2_ky4vhQ/profile-displayphoto-shrink_800_800/B4EZdfht01HsAc-/0/1749654365145?e=1763596800&v=beta&t=e7fBG2nWuR_L1NuY6gNWe7UOP1Hit6vrbe314Ny9SI8" 
                      alt="Francesco Tullio"
                      className="rounded-circle border border-4 border-primary"
                      style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="card-title fs-2 fw-bold text-dark mb-3">
                    Francesco Tullio
                  </h3>
                  <p className="text-muted mb-4 fs-5">Developer</p>
                  <a 
                    href="https://www.linkedin.com/in/francesco-tullio-857921301/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg px-5 py-3 fs-5 fw-semibold"
                  >
                    <i className="bi bi-linkedin me-2"></i>
                    Connettiti su LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Enrico Card */}
            <div className="col-12 col-md-6">
              <div className="card border-0 shadow-lg h-100 overflow-hidden">
                <div className="card-body p-4 text-center">
                  <div className="mb-4">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4D35AQFn80S8_VHdRA/profile-framedphoto-shrink_800_800/B4DZme1VRLJMAg-/0/1759306405213?e=1761148800&v=beta&t=lnMFNzyUIyuz62v_zwQlJRo6K7nb_l3Po8gJuQD2aNY" 
                      alt="Enrico Ciccolini"
                      className="rounded-circle border border-4 border-success"
                      style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="card-title fs-2 fw-bold text-dark mb-3">
                    Enrico Ciccolini
                  </h3>
                  <p className="text-muted mb-4 fs-5">Developer</p>
                  <a 
                    href="https://www.linkedin.com/in/enrico-ciccolini-bb5777266/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-lg px-5 py-3 fs-5 fw-semibold"
                  >
                    <i className="bi bi-linkedin me-2"></i>
                    Connettiti su LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-5 pt-4">
            <p className="text-muted fs-6 fst-italic">
              Sviluppato con ❤️ e tanto caffè ☕
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;