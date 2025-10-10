import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalContext from "./context/GlobalContext"; 
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/Homepage";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
const categoryArray = [
    {
        name :"General Knowledge",
        id : 9
    },
    {
        name :"Books",
        id : 10
    },
    {
        name :"Film",
        id : 11
    },
    {
        name :"Music",
        id : 12
    },
    {
        name :"Musicals & Theatres",
        id : 13
    },
    {
        name :"Television",
        id : 14
    },
    {
        name :"Board Games",
        id : 16
    },
    {
        name :"Scienze e Nature",
        id : 17
    },
    {
        name :"Computers",
        id : 18
    },
    {
        name :"Mathematics",
        id : 19
    },
    {
        name :"Mythologi",
        id : 20
    },
    {
        name :"Sports",
        id : 21
    },
    {
        name :"Geography",
        id : 22
    },
    {
        name :"History",
        id : 23
    },
    {
        name :"Politics",
        id : 24
    },
    {
        name :"Art",
        id : 25
    },
    {
        name :"Celebrities",
        id : 26
    },
    {
        name :"Animals",
        id : 27
    }
]
/////////////////////////
///// GLOBAL CONTEXT ////
/////////////////////////

const GlobalProviderValue = {
  categoryArray
}

function App() {
  return (
    <>
      <GlobalContext.Provider value={{ GlobalProviderValue }}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/:id" element={<Quiz />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
