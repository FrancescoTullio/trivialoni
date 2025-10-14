import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-lg-8 text-center">
          
          {/* Numero 404 gigante */}
          <div className="mb-4">
            <h1 className="display-1 fw-bold text-primary" style={{ fontSize: '10rem', lineHeight: '1' }}>
              404
            </h1>
          </div>

          {/* Emoji divertente */}
          <div className="mb-4" style={{ fontSize: '5rem' }}>
            🤔❓🗺️
          </div>

          {/* Titolo divertente */}
          <h2 className="display-4 fw-bold text-dark mb-4">
            Oops! Ti sei perso!
          </h2>

          {/* Messaggio */}
          <p className="lead fs-3 text-secondary mb-4">
            Sembra che tu abbia trovato una pagina che non esiste...
          </p>
          <p className="fs-4 text-secondary mb-5">
            Forse hai cliccato su un link sbagliato, o forse la pagina si è trasferita senza avvisarti! 🏃‍♂️💨
          </p>

          {/* Alert divertente */}
          <div className="alert alert-warning alert-dismissible fade show d-inline-block mb-5 shadow" role="alert">
            <strong>⚠️ Attenzione!</strong> Sei incappato in una zona inesplorata del web!
          </div>

          {/* Bottone per tornare home */}
          <div className="d-grid gap-3 d-sm-flex justify-content-sm-center mb-4">
            <Link 
              to="/" 
              className="btn btn-primary btn-lg px-5 py-3 fs-4 fw-semibold shadow-lg"
            >
              <i className="bi bi-house-door-fill me-2"></i>
              Torna alla Home
            </Link>
          </div>

          {/* Messaggio finale divertente */}
          <div className="mt-5 pt-4">
            <p className="text-muted fs-5 fst-italic">
              "Non tutti quelli che vagano sono perduti" ... ma tu sì! 😄
            </p>
          </div>

          {/* Animazione CSS per far "rimbalzare" il 404 */}
          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            .display-1 {
              animation: bounce 2s infinite;
            }
          `}</style>

        </div>
      </div>
    </div>
  )
}

export default NotFound