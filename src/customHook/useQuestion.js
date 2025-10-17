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
        try {
            // Controlla se ci sono già domande salvate per questa categoria
            const savedQuestions = sessionStorage.getItem(`quiz_${categoryId}`);
            
            if (savedQuestions) {
                // Se esistono, caricale invece di fare una nuova chiamata API
                setQuestion(JSON.parse(savedQuestions));
                return;
            }

            // Altrimenti, fai la chiamata API come prima
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();

            const finalQuestions = data.results.map((item) => {
                const allAnsweres = [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5);
                const allAnsweresFinal = allAnsweres.map((answer) => decodeHtmlEntities(answer));
                const format_answeres = decodeHtmlEntities(item.question)
                const correctAnswerFormatted = decodeHtmlEntities(item.correct_answer);
                return {
                    allAnsweresFinal,
                    question: format_answeres,
                    correct_answer: correctAnswerFormatted
                }
            })

            // Salva le domande in sessionStorage
            sessionStorage.setItem(`quiz_${categoryId}`, JSON.stringify(finalQuestions));
            setQuestion(finalQuestions)
        }
        catch (err) {
            if (err instanceof Error) {
                console.error("Errore con il recupero delle domande:", err.message);
            } else {
                console.error("Errore sconosciuto:", err);
            }
        }
    }

    useEffect(() => {
        fetchQuestion()
    }, [categoryId])

    return question
}

export default useQuestion;