import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function Hours(props) {
  const [input, setInput] = useState(false);

  const handleOnClick = () => {
    props.stopClock();
    setInput(true);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setInput(false);
    props.startClock();
  };

  return (
    <div className="hourContainer">
      {input ? (
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <input value={props.hours}></input>
        </form>
      ) : (
        <p onClick={() => handleOnClick()}>{props.hours}</p>
      )}
      <style>{`
          .hourContainer{
            display:inline-block;
          }
      `}</style>
    </div>
  );
}

function Minutes(props) {
  const [input, setInput] = useState(false);
  const handleOnClick = () => {
    props.stopClock();
    setInput(true);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setInput(false);
    props.startClock();
  };

  return (
    <div className="minuteContainer">
      {input ? (
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <input value={props.mins}></input>
        </form>
      ) : (
        <p onClick={() => handleOnClick()}>{props.mins}</p>
      )}
      <style>{`
          .minuteContainer{
            display:inline-block;
          }
      `}</style>
    </div>
  );
}
function Seconds(props) {
  const [input, setInput] = useState(false);
  const handleOnClick = () => {
    props.stopClock();
    setInput(true);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setInput(false);
    props.startClock();
  };

  return (
    <div className="secondContainer">
      {input ? (
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <input value={props.secs}></input>
        </form>
      ) : (
        <p onClick={() => handleOnClick()}>{props.secs}</p>
      )}
      <style>{`
          .secondContainer{
            display:inline-block;
          }
      `}</style>
    </div>
  );
}

function App() {
  const [ticker, setTicker] = useState();
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [ampm, setAmPM] = useState("");

  useEffect(() => {
    startClock();
  }, []);

  const stopClock = () => {
    clearInterval(ticker);
  };

  const startClock = () => {
    let date = new Date();
    formatAMPM(date);
    const interval = setInterval(() => {
      date = new Date();
      formatAMPM(date);
    }, 1000);
    setTicker(interval);
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = parseInt(date.getMinutes().toString().padStart(2, "0"));
    var seconds = parseInt(date.getSeconds());
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
    setAmPM(ampm);
  }

  return (
    <div className="App">
      <div className="container">
        <h4>London Clock</h4>
        <Hours
          hours={hours}
          stopClock={stopClock}
          startClock={startClock}
        />{" "}
        {" : "}
        <Minutes
          mins={minutes}
          stopClock={stopClock}
          startClock={startClock}
        />{" "}
        {" : "}
        <Seconds
          secs={seconds}
          stopClock={stopClock}
          startClock={startClock}
        />{" "}
        {ampm}
      </div>
      <style>{`
        input{
          display:inline-block
        }
        p{
          display:inline-block
        }
  `}</style>
    </div>
  );
}

export default App;