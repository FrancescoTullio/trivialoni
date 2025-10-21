import { useState, useEffect } from "react";

function useQuestion(categoryId, config) {
    const [question, setQuestion] = useState([]);

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
            // Se non c'è configurazione o categoria, non fare nulla
            if (!config || !categoryId) {
                return;
            }

            // 1. Costruzione Dinamica dei Parametri e della Chiave di Storage
            // Usiamo una base URL e aggiungiamo i parametri solo se esistono
            let url = `https://opentdb.com/api.php?amount=${config.amount}&category=${categoryId}`;
            
            // Creiamo una chiave di storage dinamica includendo solo i valori definiti
            let storageKeyParts = [categoryId, config.amount];

            if (config.difficulty) {
                url += `&difficulty=${config.difficulty}`;
                storageKeyParts.push(config.difficulty);
            }
            
            if (config.type) {
                url += `&type=${config.type}`;
                storageKeyParts.push(config.type);
            }
            
            // La chiave finale per lo storage
            const storageKey = `quiz_${storageKeyParts.join('_')}`;


            // 2. Controlla se ci sono già domande salvate per questa configurazione
            const savedQuestions = sessionStorage.getItem(storageKey);

            if (savedQuestions) {
                setQuestion(JSON.parse(savedQuestions));
                return;
            }
            
            // La stringa dell'URL è ora generata correttamente:
            console.log('Fetching questions from:', url); // Debug
            
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Verifica che ci siano risultati
            if (!data.results || data.results.length === 0) {
                console.error('Nessuna domanda ricevuta dall\'API');
                return;
            }

            const finalQuestions = data.results.map((item) => {
                // Per domande vero/falso, mantieni l'ordine [True, False]
                let allAnsweres;
                if (config.type === 'boolean') {
                    // Manteniamo 'True' e 'False' come costanti per il tipo booleano
                    allAnsweres = ['True', 'False'];
                } else {
                    // Per scelta multipla, mescoliamo le risposte
                    allAnsweres = [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5);
                }

                // Decodifica entità HTML
                const allAnsweresFinal = allAnsweres.map((answer) => decodeHtmlEntities(answer));
                const format_question = decodeHtmlEntities(item.question);
                const correctAnswerFormatted = decodeHtmlEntities(item.correct_answer);

                return {
                    allAnsweresFinal,
                    question: format_question,
                    correct_answer: correctAnswerFormatted
                };
            });

            // Salva le domande in sessionStorage con la chiave unica e corretta
            sessionStorage.setItem(storageKey, JSON.stringify(finalQuestions));
            setQuestion(finalQuestions);
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
        // La dipendenza è su tutti i parametri per forzare un nuovo fetch
        // se la configurazione cambia. Il controllo all'interno di fetchQuestion
        // evita la chiamata se i valori sono nulli inizialmente.
        if (config && categoryId) {
            fetchQuestion();
        }
    }, [categoryId, config?.amount, config?.difficulty, config?.type]);

    return question;
}

export default useQuestion;