import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/Gameover";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS ={ X: "Player2", O: "Player1" }
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Derived function for setting player symbol
function derivePlayer(turns) {
  let currentPlayer = "X"; // This is the default player symbol
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

// Derived winner function
function deriveWinner(gameBoard, players) {
  let winner;
  //Winning combination
  for (const winnercomb of WINNING_COMBINATIONS) {
    let firstCombination = gameBoard[winnercomb[0].row][winnercomb[0].col];
    let secondCombination = gameBoard[winnercomb[1].row][winnercomb[1].col];
    let thirdCombination = gameBoard[winnercomb[2].row][winnercomb[2].col];

    if (
      firstCombination &&
      firstCombination == secondCombination &&
      secondCombination == thirdCombination
    ) {
      winner = players[firstCombination];
    }
  }
  return winner;
}

function deriveGameBoard(turns) {
  // create a deepcopy instead of editing the original instance of the gameboard
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  // Set the Game tunrs
  for (let turn of turns) {
    var { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  // Lifting state up - technique used to pass the state from nearest ancester to
  // multiple calling components
  const [turns, setActiveTurns] = useState([]);
  const [players, setPlayerName] = useState(PLAYERS);

  const activePlayer = derivePlayer(turns);
  const gameBoard = deriveGameBoard(turns);
  const winner = deriveWinner(gameBoard, players);

  function handleActivePlayer(rowIndex, colIndex) {
    setActiveTurns((prevTurns) => {
      const currentPlayer = derivePlayer(prevTurns);
      var updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  // Restart the game after Game Over
  function onRestart() {
    setActiveTurns([]);
  }

  // Setting up player name for display
  function handlePlayerName(name, symbol) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: name,
      };
    });
  }
  // Set the Game Draw
  var hasDraw = turns.length == 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer == "O"}
            onEditPlayer={handlePlayerName}
          />
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer == "X"}
            onEditPlayer={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={onRestart} />
        )}
        <GameBoard onSelectPlayer={handleActivePlayer} board={gameBoard} />
      </div>

      <Log turns={turns}></Log>
    </main>
  );
}

export default App;
