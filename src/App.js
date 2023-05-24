import './App.css';
import {useState,useEffect} from 'react'
import axios from 'axios';

function App() {
  const [timer,setTimer] = useState(0);
  const [text,setText] = useState("");
  const [input,setInput] = useState("");
  const [result,setResult] = useState("");

  const getData = async () => {
    const res = await axios.get('https://apis.ccbp.in/random-quote');
    setText(res.data.content);
  }

  const onReset = () => {
    getData();
    setInput("");
    setTimer(0);
    setResult("");
  }

  const submitHandler =() => {

  
    let k = input.split(" ").length;
    console.log(k);
    if (text === input) {
        let timerVal = timer.toString();
        let k2 = timerVal.split(" ");
        let time = k2[0];
        let WPM = parseInt((60 * k) / time);
        console.log(WPM); 
        setResult("You typed in " + timerVal + " Seconds (Speed: " + WPM + " Words per Minutes)");
    } else {
      setResult("You typed incorrect sentence");
    }
  }
   
  useEffect(() => {
    const intervalId = setInterval(function() {
      setTimer(timer+1);
  }, 1000);
  return () => clearInterval(intervalId);
  },[timer]);


  useEffect(() => {
    getData();
  },[]);
  
  return (
    <div className="App">
      <div className="bg-container" id="speedTypingTest">
        <h1 className="heading">Speed Typing Test</h1>
        <p className="paragraph">On your fingers lets set Go!</p>
        <div className="timer-card">
            <img src="https://assets.ccbp.in/frontend/dynamic-webapps/clock-img.png" alt="Not Found" className="img" />
            <p className="paragraph" id="timer">{timer}</p>
        </div>

        <div className="card">
            <p className="display-text" id="quoteDisplay">{text}</p>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Above Text Here:" rows="10" cols="60" className="text" id="quoteInput"></textarea>
        </div>
        <p className="paragraph" id="result">{result}</p>
        <div className="button-card">
            <button className="button1" id="submitBtn" onClick={submitHandler}>Submit</button>
            <button className="button" id="resetBtn" onClick={onReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
