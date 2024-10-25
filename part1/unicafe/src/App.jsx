import { useState } from 'react'


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad) === 0) {
    return <div>No feedback given</div>;
  }
  
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={props.good} />
        <StatisticLine text={"neutral"} value={props.neutral} />
        <StatisticLine text={"bad"} value={props.bad} />
        <StatisticLine text={"average"} value={props.average} />
        <StatisticLine text={"positive"} value={props.positive} />
      </tbody>
    </table>
  );
}



const Button = ({handleClick, text}) => {
  return (
    <div>
    <button onClick={handleClick}>
      {text}
    </button>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    const newGoodValue = good + 1
    setGood(newGoodValue)
    console.log("New good value", newGoodValue)
  }

  const neutralClick = () => {
    const newneutralValue = neutral + 1
    setNeutral(newneutralValue)
    console.log("New neutral value", newneutralValue)
  }

  const badClick = () => {
    const newbadValue = bad + 1
    setBad(newbadValue)
    console.log("New bad value", newbadValue)
  }

  const totalFeedback = good + neutral + bad;
  const average = totalFeedback ? (good - bad) / totalFeedback : 0;
  const positive = totalFeedback ? (good / totalFeedback) * 100 : 0;

  

  return (
    <div>
      Give Feedback
    
    <Button handleClick={goodClick} text="good" />
    <Button handleClick={neutralClick} text="neutral" />
    <Button handleClick={badClick} text="bad" />

    <br />
    <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} />
    </div>
  )
}

export default App