import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { GlobalProviderValue } = useContext(GlobalContext);
  const { categoryArray } = GlobalProviderValue;
  const [selectedId, setSelectedId] = useState(null);
  console.log(selectedId);
  return (
    <>
      <h1>homepage</h1>
      <select 
        className="form-select" 
        aria-label="Default select example"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Open this select menu</option>
        {categoryArray.map((e) => (
          <option key={e.id} value={e.id}>{e.name}</option>
        ))}
      </select>
        
      <Link 
        className={`btn btn-success ${!selectedId ? 'disabled' : ''}`}
        to={selectedId ? `/quiz/${selectedId}` : '#'}
        onClick={(e) => !selectedId && e.preventDefault()}
      >
        Start Quiz
      </Link>
    </>
  );
}

export default HomePage;
