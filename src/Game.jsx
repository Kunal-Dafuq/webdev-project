import React, { useState, useEffect } from 'react';
import {
  loadGameState,
  saveGameState,
  fetchAllPokemon,
  newChallenge,
  makeGuess,
  skipTurn,
  abandonChallenge,
} from './Gamelogic';
import './Game.css';

const PokemonChallengeGame = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [balance, setBalance] = useState(1000);
  const [captured, setCaptured] = useState([]);
  const [current, setCurrent] = useState(null);
  const [guessInput, setGuessInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initGameState = async () => {
      const savedState = await loadGameState();
      setBalance(savedState.balance);
      setCaptured(savedState.captured);
      setCurrent(savedState.current);
    };

    initGameState();
  }, []);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setMessage('Loading Pokémon database...');
        const data = await fetchAllPokemon();
        setPokemonList(data);
        setLoading(false);
        setMessage('');
      } catch (error) {
        setMessage('❌ Failed to load Pokémon data. Please refresh the page.');
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const handleNewChallenge = () => {
    const challenge = newChallenge(pokemonList);
    if (!challenge) {
      setMessage('⚠️ Pokémon list not loaded yet!');
      return;
    }
    
    setCurrent(challenge);
    setMessage('');
    setGuessInput('');
    saveGameState(balance, captured, challenge);
  };

  // Handler: Make a guess
  const handleGuess = () => {
    if (!current) {
      setMessage('⚠️ No active challenge! Click "New Challenge" to start.');
      return;
    }

    const result = makeGuess(guessInput, current, balance, captured, pokemonList);
    
    if (result.result === 'error') {
      setMessage(result.message);
      return;
    }

    setBalance(result.newBalance);
    setCaptured(result.newCaptured);
    setMessage(result.message);
    setGuessInput('');
    saveGameState(result.newBalance, result.newCaptured, current);
  };

  const handleSkip = () => {
    if (!current) {
      setMessage('⚠️ No active challenge to skip!');
      return;
    }

    const result = skipTurn(current, balance);
    setBalance(result.newBalance);
    setMessage(result.message);
    saveGameState(result.newBalance, captured, current);
  };

  const handleAbandon = () => {
    if (!current) {
      setMessage('⚠️ No active challenge to abandon!');
      return;
    }

    const result = abandonChallenge(current, balance);
    setBalance(result.newBalance);
    setCurrent(null);
    setMessage(result.message);
    saveGameState(result.newBalance, captured, null);
  };

  const handleShowCaptured = () => {
    if (captured.length === 0) {
      setMessage('📦 No Pokémon captured yet! Win challenges to build your collection.');
    } else {
      setMessage(`📦 Captured (${captured.length}): ${captured.map(p => p.toUpperCase()).join(', ')}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    } else if (e.key === 's' || e.key === 'S') {
      e.preventDefault();
      handleSkip();
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <h1 className="title">⚡ Loading...</h1>
          <p className="subtitle">Fetching 898 Pokémon from PokéAPI</p>
          <div className="loading-spinner">🔄</div>
          {message && <p className="loading-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Pokémon Challenge</h1>
        <p className="subtitle">Gotta know 'em all!</p>

        <div className="balance-box">
          <span className="balance-label">Balance: </span>
          <span className="balance-value">{balance} P</span>
        </div>

        <div className="captured-section">
          <button className="view-captured-btn" onClick={handleShowCaptured}>
            View Captured ({captured.length})
          </button>
        </div>

        {current ? (
          <div className="challenge-box">
            <h2 className="challenge-title">Capture Challenge</h2>
            <p className="challenge-subtitle">Pokémon to Out-Stat</p>
            <h3 className="pokemon-name">{current.name.toUpperCase()}</h3>
            <p className="stat-label">Target Base Stat (ATTACK)</p>
            <p className="stat-value">{current.stat}</p>
          </div>
        ) : (
          <div className="challenge-box-empty">
            <h2 className="challenge-title">No Active Challenge</h2>
            <p className="challenge-subtitle">Click "New Challenge" below to begin!</p>
          </div>
        )}

        {current && (
          <input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter Pokémon name (e.g., charizard)"
            className="input"
            autoFocus
          />
        )}

        <div className="button-row">
          {current && (
            <>
              <button className="check-btn" onClick={handleGuess}>
                Check Power
              </button>
              <button className="skip-btn" onClick={handleSkip}>
                Skip (S)
              </button>
              <button className="abandon-btn" onClick={handleAbandon}>
                Abandon
              </button>
            </>
          )}
        </div>

        <button className="new-challenge-btn" onClick={handleNewChallenge}>
          {current ? 'New Challenge' : 'Begin New Challenge'}
        </button>

        {message && <div className="message-box">{message}</div>}
      </div>
    </div>
  );
};

export default PokemonChallengeGame;