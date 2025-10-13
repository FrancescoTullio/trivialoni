import { useState, useEffect } from "react";


function useQuestion(categoryId) {

    const [question, setQuestion] = useState([])

function decodeHtmlEntities(text) {
  return text
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
    
    const fetchQuestion = async () => {
        try{
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data= await response.json();

            const finalQuestions = data.results.map((item) => {
                const allAnsweres = [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5);
                const format_answeres = decodeHtmlEntities(item.question)
                return{
                    allAnsweres,
                    question: format_answeres,
                    correct_answer: item.correct_answer
                }
            })
                

            setQuestion(finalQuestions)
        }
            catch (err) {
            if (err instanceof Error) {
                console.error("Errore con il recupero dei videogame:", err.message);
            } else {
                console.error("Errore sconosciuto:", err);
            }
        }
        }

        useEffect(() => {
            fetchQuestion()
        }, [])

      

    return question
}

export default useQuestion;