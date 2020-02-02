import React, { createContext, useState, useEffect } from "react";
import constate from "constate";




const useStep = ({ initialStep = 0 }) => {
  const [step, setStep] = useState(initialStep);

  const next = () => {
    setStep(step + 1);
  };
  const previous = () => {
    setStep(step - 1);
  };
  return { step, next, previous };
}



const [StepProvider, useStepContext] = constate(useStep);


const getQuestionInfo = (node) =>
{
  console.log(node);
  for (let i = 0; i < jsonData.questions.length; i++) {
    if(jsonData.questions[i].id == node)
    {
      return jsonData.questions[i];
    }
  }
  return({})
};

const getConditionInfo = (theName) =>
{
  for (let i = 0; i < jsonData.condition.length; i++) {
    console.log(jsonData.condition[i])
    if(jsonData.condition[i].name == theName)
    {
      return jsonData.questions[i];
    }
  }
  return({})
};




function App() {
  const urlParams = new URLSearchParams(document.title);
  
  return (
    <StepProvider initialStep={0}>
      <Wrapper />
    </StepProvider>
  );  
}

const Wrapper = () =>
{
  const { step, next, previous } = useStepContext();
  const [questionData, setquestionData] = useState({answers:[]});
  const [firstQuery, setFirstQuery] = useState();
  const firstSearch = document.title.substring((document.title.indexOf('=') + 1), document.title.length);
  let showEnd = false;

  const nextQ = (id, isLastQ = null) =>
  {
      if(isLastQ == null) {
        next();
        setquestionData(id);
      } else {
        setquestionData({"question": "We Recommend you contact a physican" })
        showEnd = true;
      }
  }



    useEffect(() => {
      if(step == 0){
        setquestionData(getConditionInfo(firstSearch))
        console.log(getConditionInfo(firstSearch))
      } else{
        setquestionData(getQuestionInfo(questionData))
      }
    
  },[step]);

  return(
    showEnd ? <div>End</div> :
    <div>
      <QuestionContainer questionObj={questionData} nextQ={nextQ} />
    </div>
    
  );

}


const End = () =>
{
  return(
    <div>
      We would like to now connect you to some resources
    </div>
  )
}





function QuestionContainer({questionObj, nextQ}) {
console.log(questionObj)
  let answers;
  if (questionObj && questionObj.answers)
    answers = questionObj.answers.map((answer, idx) => 
    <Card key={idx} answer={answer} text={answer.content} nextQ={nextQ} idx={answer.points_to}/>
    );
    return (
      <div className="App">
      <Card text={questionObj.question} question={true}/>
      {answers}
    </div>
  );
}

const Card = ({ answer, text, idx, nextQ, question }) => {

  let onClick = () => {
      console.log("Calling here", idx)
      if(nextQ && typeof idx === 'number')
          nextQ(idx, answer.leads_to_response);
  };

  return (
      <div className={question ? "card-container border-green" : "card-container"} onClick={onClick}>
          <h4>{text}</h4>
      </div>
  );
};




const jsonData = {
  "condition": [
    {
      "name": "skin",
      "index_first_question": 1
    },
    {
      "name": "cold/flu",
      "index_first_question": 6
    },
    {
      "name": "stroke",
      "index_first_question": 11
    },
  ],
  "questions": [
    {
      "id": 1,
      "question": "What symptoms are you experiencing?",
      "answers": [
        {
          "content": "Blackheads or white heads",
          "points_to": 2
        },
        {
          "content": "Red bumps, pimples or pustules",
          "points_to": 2
        },
        {
          "content": "Inflamed bumps, red nodules",
          "points_to": 1,
          "leads_to_response": true
        }
      ]
    },
    {
      "id": 2,
      "question": "Where are your symptoms located?",
      "answers": [
        {
          "content": "Face",
          "points_to": 4
        },
        {
          "content": "Back",
          "points_to": 1
        },
        {
          "content": "Chest",
          "points_to": 1
        },
        {
          "content": "Neck",
          "points_to": 1
        }
      ]
    },
    {
      "id": 3,
      "question": "What other symptoms are you experiencing?",
      "answers": [
        {
          "content": "Itching",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Severe Pain",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Draining Pus",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Other",
          "points_to": 1,
          "leads_to_response": true
        }
      ]
    },
    {
      "id": 4,
      "question": "What other symptoms are you experiencing?",
      "answers": [
        {
          "content": "Itching",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Severe Pain",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Draining Pus",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Cough",
          "points_to": 2,
          "leads_to_response": true
        },
        {
          "content": "Runny Nose",
          "points_to": 2,
          "leads_to_response": true
        },
        {
          "content": "Pink Eye",
          "points_to": 2,
          "leads_to_response": true
        }
      ]
    },
    {
      "id": 5,
      "question": "Are you experiencing either of these symptoms?",
      "answers": [
        {
          "content": "Cough or fever",
          "points_to": 6
        }
      ]
    },
    {
      "id": 6,
      "question": "Have you received a flu shot in the past year? ",
      "answers": [
        {
          "content": "Yes",
          "points_to": 7
        },
        {
          "content": "No",
          "points_to": 7
        }
      ]
    },
    {
      "id": 7,
      "question": "What other symptoms are you experiencing? ",
      "answers": [
        {
          "content": "Cough ",
          "points_to": 8
        },
        {
          "content": "Headache",
          "points_to": 8
        },
        {
          "content": "Sore Throat",
          "points_to": 8
        },
        {
          "content": "Pain in face",
          "points_to": 8
        },
        {
          "content": "Mild Ache",
          "points_to": 8
        },
        {
          "content": "Severe Muscle Ache",
          "points_to": 8
        }
      ]
    },
    {
      "id": 8,
      "question": "Do you have a history of any the following?",
      "answers": [
        {
          "content": "Chemotherapy or recently been treated for cancer",
          "points_to": 3,
          "leads_to_response": true
        },
        {
          "content": "Heart Failure",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Asthma, COPD, Cystic Fibrosis or other lung disease",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Spleen Removed",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "None of the above",
          "points_to": 9
        }
      ]
    },
    {
      "id": 9,
      "question": "What is your estimated or exact temperature?",
      "answers": [
        {
          "content": "Temperature greater than 102 degrees F",
          "points_to": 10
        },
        {
          "content": "Temperature greater than 99 degrees F",
          "points_to": 10
        },
        {
          "content": "Temperature less than 99 degrees F",
          "points_to": 4,
          "leads_to_response": true
        }
      ]
    },
    {
      "id": 10,
      "question": "How long have you been experiencing these symptoms?",
      "answers": [
        {
          "content": "Less than 3 days",
          "points_to": 1,
          "leads_to_response": true
        },
        {
          "content": "Between 3-7 days",
          "points_to": 4,
          "leads_to_response": true
        },
        {
          "content": "Over 1 week",
          "points_to": 4,
          "leads_to_response": true
        }
      ]
    },
    {
    	"id": 11,
    	"question": "Are experiencing either of the following symptoms?",
    	"answers": [
    	{
    		"content": "Difficulty or inability to move one side of the body",
    		"points_to": 3,
    		"leads_to_response":true
    	},
    	{
    		"content": "Numbness in one side of the body (particularly the left)",
    		"points_to": 3,
    		"leads_to_response":true
    	}
    	]
    },
    {	"id": 12,
    	"question": "Are you experiencing any of the following symptoms?",
    	"answers": [
    	{
    		"content": "Difficulty speaking or confusion",
    		"points_to": 3,
    		"leads_to_response":true
    	},
    	{
    		"content": "Dizziness or difficulty walking",
    		"points_to": 3,
    		"leads_to_response":true
    	}
    	]
    }
  ],
  "responses": [
    {
      "id": 1,
      "recommendation": "We recommend that you speak to your physician about your symptoms.",
      "with_insurance": true,
      "insurance_message": {
        "with_insurance": "Consider contacting your insurance provider",
        "no_insurance": "Here are some insurance providers near you."
      }
    },
    {
      "id": 2,
      "recommendation": "We recommend scheduling a visit with your doctor as soon as possible about your symptoms.",
      "with_insurance": true,
      "insurance_message": {
        "with_insurance": "Consider contacting your insurance provider",
        "no_insurance": "Here are providers near you"
      }
    },
    {
      "id": 3,
      "recommendation": "Please immediately go to the nearest urgent care. Your symptoms may be potentially life threatening.",
      "with_insurance": true,
      "insurance_message": {
        "with_insurance": "Go to the urgent care for a hospital you are covered at",
        "no_insurance": "Here are some local urgent care locations for you"
      }
    },
    {
      "id": 4,
      "recommendation": "Consider contacting your physician if you experience any new or worsening of your symptoms in the next few days.",
      "with_insurance": true,
      "insurance_message": {
        "with_insurance": "",
        "no_insurance": ""
      }
    }
  ]
}


export default App;