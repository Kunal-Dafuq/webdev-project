import React, { useState } from "react";
import "./App.css";
import Game from "./Game";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="container">
      <div className="card">

        {!started && (
          <>
            <h1 className="title">Pokémon Challenge</h1>
            <p className="subtitle">Gotta know ’em all!</p>

            <p className="description">
              Test your knowledge! Find a Pokemon with a higher base stat than 
              the target to capture it. You start with <b>100 Pokedollars</b>. 
              Using an uncaptured Pokemon results in a penalty!
            </p>

            <button className="begin-btn" onClick={() => setStarted(true)}>
              Begin Challenge
            </button>
          </>
        )}

        {started && <Game />}
      </div>
    </div>
  );
}

export default App;
