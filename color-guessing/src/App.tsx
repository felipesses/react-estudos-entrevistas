import { useEffect, useState } from 'react'
import './App.css'

function getRandomColor() {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
  
  const color =  new Array(6).fill('').map(() => digits[Math.floor(Math.random() * digits.length)]).join('')

  return `#${color}`
}

enum Result {
  CORRECT, WRONG
}

function App() {
  const [color, setColor] = useState<string>('')
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<Result | undefined>(undefined)

  function generateColors() {
    const actualColor = getRandomColor()
    setColor(actualColor)
    setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()))
  }

  useEffect(() => {
    generateColors()
  }, [])

  function handleAnswerClicked(answer: string) {
    if (answer === color) {
      setResult(Result.CORRECT)
      generateColors()
    } else {
      setResult(Result.WRONG)
    }
  }


  return (
    <div className="App">
      <div className="col">
      <div className="guess-me" style={{background: color}}></div>
      {answers.map(answer => (
        <button key={answer} onClick={() => handleAnswerClicked(answer)}>{answer}</button>
      ))}

      {result === Result.WRONG && <div className="wrong">Wrong Answer!</div>}
      {result === Result.CORRECT && <div className="correct">Correct Answer!</div>}
      </div>
      
    </div>
  )
}


export default App