import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [InputChecked, setInputChecked] = useState(false)
  const [resultDiv, setResultDiv] = useState(false)
  const [score, setScore] = useState(0)


  useEffect(function () {
    fetchQuestions()
  }, [])

  function Results(selectedOption) {
    if (selectedOption === questions[currentIndex].correct_answer) {
      setScore(score + 1)
    }
    console.log(selectedOption);
    console.log('correct answer', questions[currentIndex].correct_answer);
    console.log(score);
  }
  function fetchQuestions() {
    fetch('https://mocki.io/v1/443df9a7-e317-4dc9-b7a4-904ac0d439b3')
      .then(res => res.json())
      .then(res => setQuestions(res))
  }
  function next() {
    setCurrentIndex(currentIndex + 1)
    setInputChecked(false)
    Results()

  }

  function inputFunc(index, e) {
    const value = e.target.value
    setInputChecked()
    Results(value)

  }
  function Restart() {
    setCurrentIndex(0)
    setResultDiv(false)
  }
  function Submit() {
    setResultDiv(true)
    Results()
  }
  if (!questions.length) {
    return <div>
      loading.....
    </div>
  }

  const isLastQuestion = currentIndex === questions.length - 1
  const currentQuestion = questions[currentIndex];
  console.log(score);
  return (
    <div className='App'>
      {!resultDiv
        ? <div className='App container'  >
          <h2>{currentIndex + 1 + '- '}{questions[currentIndex].question}</h2>
          <ul>
            {currentQuestion.options.map((item, index) => (
              <li key={index} >
                <input onChange={(e) => inputFunc(index, e)} type='radio' checked={InputChecked} value={item} name='options' />
                {item}
              </li>
            ))}
          </ul>

          {isLastQuestion
            ? <button onClick={Submit}>Submit</button>
            : <button onClick={next}>Next</button>}
        </div>
        :
        <div>
          <h1>Results</h1>
          <h3>{score}/10</h3>
          <button onClick={Restart}>Restart</button>
        </div>}
    </div>


  )
}
export default App;