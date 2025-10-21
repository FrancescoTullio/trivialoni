import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import GlobalContext from "./context/GlobalContext";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/Homepage";
import Category from "./pages/Category";
import QuizConfig from "./components/QuizConfig";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import ResultPage from "./pages/ResultPage";
import AboutUs from "./pages/AboutUs";

const categoryArray = [
  {
    name: "Cultura Generale",
    id: 9,
    description:
      "Domande di cultura generale su un'ampia varietà di argomenti, perfette per testare la tua conoscenza globale.",
  },
  {
    name: "Libri",
    id: 10,
    description:
      "Quiz sul mondo della letteratura: autori, titoli famosi, trame e curiosità sui libri.",
  },
  {
    name: "Film",
    id: 11,
    description:
      "Domande dedicate al cinema: registi, attori, pellicole iconiche e citazioni celebri.",
  },
  {
    name: "Musica",
    id: 12,
    description:
      "Sfida la tua memoria musicale con quiz su generi, artisti, album e canzoni storiche.",
  },
  {
    name: "Teatro e Spettacolo",
    id: 13,
    description:
      "Per chi ama il palcoscenico: spettacoli teatrali, musical e grandi interpreti del teatro.",
  },
  {
    name: "Televisione",
    id: 14,
    description:
      "Domande su serie TV, programmi famosi e momenti iconici della televisione.",
  },
  {
    name: "Giochi",
    id: 16,
    description:
      "Quiz dedicati ai giochi da tavolo, dalle regole dei classici alle curiosità sui più moderni.",
  },
  {
    name: "Science & Natura",
    id: 17,
    description:
      "Testa le tue conoscenze su biologia, fisica, chimica, ambiente e meraviglie naturali.",
  },
  {
    name: "Computers",
    id: 18,
    description:
      "Domande sul mondo dell'informatica: software, hardware, Internet e storia dei computer.",
  },
  {
    name: "Matematica",
    id: 19,
    description:
      "Per gli amanti dei numeri: quiz su logica, formule, calcoli e curiosità matematiche.",
  },
  {
    name: "Mitologia",
    id: 20,
    description:
      "Mettiti alla prova con domande su divinità, leggende e miti delle culture antiche.",
  },
  {
    name: "Sports",
    id: 21,
    description:
      "Quiz su sport, atleti, eventi e record che hanno fatto la storia delle competizioni.",
  },
  {
    name: "Geografia",
    id: 22,
    description:
      "Domande su paesi, capitali, montagne, fiumi e tutto ciò che riguarda il nostro pianeta.",
  },
  {
    name: "Storia",
    id: 23,
    description:
      "Ripercorri le epoche storiche con domande su eventi, battaglie e personaggi famosi.",
  },
  {
    name: "Politica",
    id: 24,
    description:
      "Quiz sul mondo politico: sistemi di governo, leader storici e attualità istituzionali.",
  },
  {
    name: "Arte",
    id: 25,
    description:
      "Scopri quanto conosci il mondo dell'arte: pittura, scultura, correnti artistiche e grandi maestri.",
  },
  {
    name: "Celebrità",
    id: 26,
    description:
      "Domande su personaggi famosi del mondo dello spettacolo, della moda e dei social media.",
  },
  {
    name: "Animali",
    id: 27,
    description:
      "Quiz sugli animali del mondo: specie, habitat, curiosità e caratteristiche sorprendenti.",
  },
];

function App() {
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  /////////////////////////
  ///// GLOBAL CONTEXT ////
  /////////////////////////

  const GlobalProviderValue = {
    categoryArray,
    correct,
    setCorrect,
    wrong,
    setWrong,
  };

  return (
    <GlobalContext.Provider value={{ GlobalProviderValue }}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/quiz/:id" element={<QuizConfig />} />
            <Route path="/quiz/:id/play" element={<Quiz />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;