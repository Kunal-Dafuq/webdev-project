export const loadGameState = async () => {
  try {
    const balanceResult = await window.storage.get('pokemon_balance');
    const capturedResult = await window.storage.get('pokemon_captured');
    const currentResult = await window.storage.get('pokemon_current');

    return {
      balance: balanceResult ? parseInt(balanceResult.value) : 1000,
      captured: capturedResult ? JSON.parse(capturedResult.value) : [],
      current: currentResult ? JSON.parse(currentResult.value) : null,
    };
  } catch (error) {
    console.log('No saved game state found, starting fresh');
    return {
      balance: 1000,
      captured: [],
      current: null,
    };
  }
};

export const saveGameState = async (balance, captured, current) => {
  try {
    await window.storage.set('pokemon_balance', balance.toString());
    await window.storage.set('pokemon_captured', JSON.stringify(captured));
    await window.storage.set('pokemon_current', JSON.stringify(current));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

export const fetchAllPokemon = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
    const data = await response.json();
    
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const detail = await detailResponse.json();
        return {
          name: detail.name,
          stat: detail.stats[1].base_stat,
        };
      })
    );
    
    return pokemonData;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error;
  }
};

export const newChallenge = (pokemonList) => {
  if (!pokemonList || pokemonList.length === 0) {
    return null;
  }
  
  const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
  return {
    name: randomPokemon.name,
    stat: randomPokemon.stat,
  };
};

export const makeGuess = (guessName, target, balance, captured, pokemonList) => {
  const guessLower = guessName.toLowerCase().trim();
  
  if (!guessLower) {
    return {
      result: 'error',
      message: '⚠️ Please enter a Pokémon name!',
    };
  }

  const guessPokemon = pokemonList.find(p => p.name === guessLower);

  if (!guessPokemon) {
    return {
      result: 'error',
      message: `"${guessName}" is not a valid Pokémon name. Try again!`,
    };
  }

  const guess = guessPokemon;

  if (guess.stat > target.stat) {
    const difference = guess.stat - target.stat;
    
    if (captured.includes(guess.name)) {
      return {
        result: 'win',
        change: difference,
        newBalance: balance + difference,
        newCaptured: captured,
        message: `WIN! ${guess.name.toUpperCase()} (${guess.stat}) > ${target.name.toUpperCase()} (${target.stat})! Already captured → +${difference} P`,
      };
    } else {
      return {
        result: 'win',
        change: -difference,
        newBalance: balance - difference,
        newCaptured: [...captured, target.name],
        message: `WIN! ${guess.name.toUpperCase()} (${guess.stat}) > ${target.name.toUpperCase()} (${target.stat})! Captured ${target.name.toUpperCase()}! Cost: -${difference} P`,
      };
    }
  }
  else {
    const penalty = target.stat;
    return {
      result: 'lose',
      change: -penalty,
      newBalance: balance - penalty,
      newCaptured: captured,
      message: ` LOSE! ${guess.name.toUpperCase()} (${guess.stat}) ≤ ${target.name.toUpperCase()} (${target.stat}). Penalty: -${penalty} P`,
    };
  }
};

export const skipTurn = (target, balance) => {
  const penalty = Math.floor(target.stat / 2);
  return {
    result: 'skip',
    change: -penalty,
    newBalance: balance - penalty,
    message: ` Skipped ${target.name.toUpperCase()}! Penalty: -${penalty} P (half of ${target.stat})`,
  };
};

export const abandonChallenge = (target, balance) => {
  const penalty = target.stat;
  return {
    result: 'abandon',
    change: -penalty,
    newBalance: balance - penalty,
    newCurrent: null,
    message: ` Abandoned ${target.name.toUpperCase()}! Penalty: -${penalty} P. Challenge ended.`,
  };
};