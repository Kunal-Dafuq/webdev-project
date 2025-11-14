🟦 Pokémon Stat Challenge – React Game

A fast-paced stat-comparison mini-game built with React + PokeAPI, where your goal is to out-stat randomly selected Pokémon using your knowledge (or luck!). Start with a balance, make guesses, capture Pokémon, and survive as long as possible!

🎮 Game Overview

You start with 1000 Pokedollars (P).

The game shows you a random Pokémon with a base Attack stat.
Your job is to enter another Pokémon’s name and check if it has a higher stat.

✅ WIN Condition

Your guessed Pokémon has a higher attack stat than the target.

If the guessed Pokémon is already captured,
➜ You gain (guess_stat − target_stat) P.

If the guessed Pokémon is not captured,
➜ You lose (guess_stat − target_stat) P and
➜ You capture the target Pokémon.

After every win → A NEW Pokémon challenge appears automatically.

❌ LOSE Condition

Your guessed Pokémon does not beat the target.

➜ You lose target_stat P

⏭️ Skip

Press S or click Skip
➜ Lose floor(target_stat / 2) P

🚪 Abandon

Click Abandon before guessing
➜ Lose target_stat P
➜ Challenge resets

💾 Persistent Save System

Your progress is stored using a custom storage API (window.storage):

Balance

Captured Pokémon list

Current challenge

Even if you refresh, your game continues from exactly where you left off.

⚡ Core Features

✔ Fetches all 898 Pokémon from PokeAPI
✔ Uses each Pokémon’s Attack stat
✔ Full game logic implemented in React
✔ Instant win/lose feedback
✔ Auto-new-challenge after every win
✔ Captured Pokémon tracked & viewable
✔ Enter key support & S key skipping
✔ Works without reloading the page
✔ Stylish card-based UI
✔ Fully persistent game state
✔ Clean component-based architecture

🧠 Technologies Used

React (Vite / CRA compatible)

PokeAPI

Custom persistent storage

Functional components & hooks

📁 Project Structure
src/
│
├── PokemonChallengeGame.jsx   # Main game component
├── styles.css                 # Inline or external styling (your choice)
└── index.jsx                  # App entry point

🚀 How to Run Locally
# Clone the repo
git clone https://github.com/<Kunal-Dafuq>/<webdev-project>

cd <websev-project>

# Install dependencies
npm install

# Start development server
npm run dev

🕹️ How To Play

Click New Challenge

Look at the target Pokémon’s Attack stat

Type ANY Pokémon name

Press Enter or click Check Power

Based on the result:

Win → capture or profit

Lose → lose P

Skip → lose half stat

Abandon → lose full stat

Survive as long as possible

Try capturing all Pokémon!

🔮 Future Enhancements (Optional Ideas)

Leaderboard system

Pokémon sprites display

Difficulty levels

Sound effects

Animations

Daily challenges


Developed by Kunal
Built with React, passion, and a lot of stat-checking.