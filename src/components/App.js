import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then((questions) => {
      setQuestions(questions)
      console.log(questions)
    })
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDeleteQuestion(deletedQ) {
    const updatedByDelete = questions.filter(question => question.id !== deletedQ.id)
    setQuestions(updatedByDelete)
  }

  function changeCorrectAnswer(changedQ) {
    const updateCorrectAnswer = questions.map(question => {
      if(question.id === changedQ.id) {
        return changedQ
      } else {
        return question
      }
    })
    setQuestions(updateCorrectAnswer)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : 
      <QuestionList questions={questions} 
      onDeleteQuestion={handleDeleteQuestion}
      onChangeAnswer={changeCorrectAnswer}
      />}
    </main>
  );
}

export default App;
