import './App.css';
import Card from './Card';
import {useState} from 'react';
import SinInput from './sinInput';

function App() {
    const [free] = useState(30)
    const getRandomAngle = () => {
      return Math.floor(Math.random() * free) + 1;
    };

    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [time, setTime] = useState(0);
    const [angle, setAngle] = useState(getRandomAngle());
    const [correctValue, setCorrectValue] = useState(null);
    const [showCorrect, setShowCorrect] = useState(false);

    const handleAdd = () => {
        setScore((prev) => {
            const newScore = prev + 1;
            setBest((b) => Math.max(b, newScore));
            return newScore;
        });
        setAngle(getRandomAngle());
    };

    const handleReset = () => {
      setCorrectValue(Math.sin(angle * Math.PI / 180).toFixed(4));
      setShowCorrect(true);

      setTimeout(() => setShowCorrect(false), 1500);

      setScore(0);
      setTime(0);
      setAngle(getRandomAngle());
    };

    const handleTime = () => {
      setTime((prev) => prev + 0.016);
    };

    return (
      <div>
        <div className="container">
            <Card label="Wynik" value={score} id="wynik" />
            <Card label="Najlepszy" value={best} id="najlepszy" />
            <Card label="Czas" value={time.toFixed(2)} id="czas" />
            <Card label="SPS (sin per second)" value={(time === 0 ? 0 : score/time).toFixed(2)} id="sp" />
        </div>
        {showCorrect && angle > free && (
          <p style={{
            position: 'absolute',
            color: 'red',
            left: '50%',
            top: '20%',
            transform: 'translate(-50%, -20%)',
            fontSize: '48px'
          }}>
            {correctValue}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontSize: '48px', gap: "100px" }}> 
            <p>sin({angle}°)</p> <p>=</p> <SinInput value={angle} onCorrect={handleAdd} onWrong={handleReset} onTime={handleTime} />
        </div>
      </div>
    );
}

export default App;
