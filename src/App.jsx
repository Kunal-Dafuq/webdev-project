import React from 'react' ;
import './App.css' ;

function App() {
  return (
  <div className="container">
      <div className="card">
        <h1 className="title">Pokemon Challenge</h1>
        <p className="subtitle">Gotta know’em all!</p>

        <p className="description">
          Test your knowledge! Find a Pokemon with a higher base stat than the
          target to capture it. You start with 1000 Pokedollars.
          Using an uncaptured Pokemon results in a penalty!
        </p>
      </div>
    </div>
  )
}

export default App
