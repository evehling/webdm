import React from 'react';
import Card from './Card';

// let questionObj = {
//   question: "How bad is your acne?",
//   answers: [
//     {
//       content: "Mild: Blackheads or white heads",
//       points_to: 2
//     },
//     {
//       content: "Moderate: Red bumps, pimples or pustules",
//       points_to: 2
//     }
//   ]
// };
// let jsonObj = []
const QuestionContainer = ({questionObj, nextQ}) {

  const answers = questionObj.answers.map((answer, idx) => 
    <Card key={idx} text={answer.content} nextQ={nextQ} idx={idx}/>
    );
    return (
      <div className="App">
      <Card text={questionObj.question} question={true}/>
      {answers}
    </div>
  );
}


const Card = ({ text, idx, nextQ, question }) => {
  let onClick = () => {
      if(nextQ && typeof idx === 'number')
          nextQ(idx);
  };

  return (
      <div className={question ? "card-container border-green" : "card-container"} onClick={onClick}>
          <h4>{text}</h4>
      </div>
  );
};

export default QuestionContainer;
