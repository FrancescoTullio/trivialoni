import { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
function Category() {
  const { GlobalProviderValue } = useContext(GlobalContext);
  const { categoryArray } = GlobalProviderValue;

  return (
    <>
      <h1 className="text-center">scegli la tua categoria </h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {categoryArray.map((e) => (
        <div className="card">
          <div className="card-header">{e.name}</div>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
              {e.description}
            </p>
            <Link to={`/quiz/${e.id}`} className="btn btn-primary">
              vai alk quiz
            </Link>
          </div>
        </div>
      ))}
      </div>
      
    </>
  );
}

export default Category;
