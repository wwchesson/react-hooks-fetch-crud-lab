import React from "react";

function QuestionItem({ question, onDeleteQuestion, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(r => r.json())
    .then(() => onDeleteQuestion(question))
  }

  function changeAnswer(e) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: parseInt(e.target.value)
      })
    })
    .then(r => r.json())
    .then(() => onChangeAnswer(question))
  }
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={deleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
