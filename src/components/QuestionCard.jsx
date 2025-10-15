import { memo } from "react";

const QuestionCard = memo(({ 
  item, 
  index, 
  onAnswerClick, 
  isQuestionAnswered, 
  getButtonClass 
}) => {
  return (
    <div className="col-12 mb-4">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="card-header py-3 quiz-question-header">
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-white text-dark fs-6 fw-bold px-3 py-2">
              Domanda {index + 1}
            </span>
          </div>
        </div>
        
        <div className="card-body p-4 quiz-question-body">
          <h5 className="card-title fw-bold mb-4 text-dark fs-5">
            {item.question}
          </h5>
          
          <div className="answers-container">
            {item.allAnsweresFinal.map((answer, idx) => (
              <button
                key={idx}
                className={getButtonClass(index, answer)}
                onClick={() => onAnswerClick(index, answer)}
                disabled={isQuestionAnswered(index)}
              >
                <span className="me-3 badge rounded-circle d-inline-flex align-items-center justify-content-center quiz-answer-letter">
                  {String.fromCharCode(65 + idx)}
                </span>
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';

export default QuestionCard;