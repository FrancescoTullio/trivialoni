import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout"
import HomePage from "./pages/Homepage";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
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
    </>
  )
}

export default App
