import React from 'react';
import Card from './Card';

let questionObj = {
  question: "How bad is your acne?",
  answers: [
    {
      content: "Mild: Blackheads or white heads",
      points_to: 2
    },
    {
      content: "Moderate: Red bumps, pimples or pustules",
      points_to: 2
    }
  ]
};
let jsonObj = []
function QuestionContainer() {
  questionObj.answers.forEach( (answer, idx) => console.log(idx, answer.content));

  let nextQ = (idx) => {
    questionObj = jsonObj[questionObj.answers[idx].points_to];
  }
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

export default QuestionContainer;
