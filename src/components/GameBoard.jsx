import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import WinningCard from "./WinningCard";

export default function GameBoard({ player, setPlayer }) {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [takenLilypads, setTakenLilypads] = useState(["11", "55"]);
  const [gameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState("");

  // security check
  let navigate = useNavigate();
  useEffect(() => {
    if (player[0].ready == false || player[1].ready == false)
      return navigate("/lobby");
  }, []);

  const handleConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  function handleMove(e) {
    let newPosition = e.target.id;
    let playerNum = Number(playerTurn) - 1;
    let oldPosition = player[playerNum].position;

    const m = availableMoves(oldPosition, takenLilypads);
    if (!m.moves.includes(newPosition))
      return console.warn("Invalid position!");

    let newTakenLilypads = [...takenLilypads, newPosition];
    setTakenLilypads(newTakenLilypads);

    if (playerTurn === 1) {
      let newMoves = Number(player[0].moves) + Number(1);
      let newPlayer = [
        { ...player[0], position: newPosition, moves: newMoves },
        player[1],
      ];

      setPlayer(newPlayer);
      setPlayerTurn(2);

      const oppm = availableMoves(newPlayer[1].position, newTakenLilypads);
      // console.log("playe 2 avalable moves:\n");
      // console.log(oppm.moves);
      // console.log("length: " + oppm.moves.length);

      if (
        oppm.moves.length === 0 ||
        (oppm.moves.length == 1 && oppm.moves[0] == newPosition)
      ) {
        let winSound = new Audio("/Ta Da-SoundBible.com-1884170640.mp3");
        winSound.play();
        setGameEnd(true);
        setWinner(player[0].name);
        // confetti
        handleConfetti();
        return;
      } else {
        let moveSound = new Audio("/Water Drop-SoundBible.com-2039669379.mp3");
        moveSound.play();
      }
    } else {
      let newMoves = Number(player[1].moves) + Number(1);
      let newPlayer = [
        player[0],
        { ...player[1], position: newPosition, moves: newMoves },
      ];

      setPlayer(newPlayer);
      setPlayerTurn(1);

      const oppm = availableMoves(newPlayer[0].position, newTakenLilypads);
      // console.log("playe 1 avalable moves:\n");
      // console.log(oppm.moves);
      // console.log("length: " + oppm.moves.length);

      if (
        oppm.moves.length === 0 ||
        (oppm.moves.length == 1 && oppm.moves[0] == newPosition)
      ) {
        let winSound = new Audio("/Ta Da-SoundBible.com-1884170640.mp3");
        winSound.play();
        setGameEnd(true);
        setWinner(player[1].name);
        // confetti
        handleConfetti();
        return;
      } else {
        let moveSound = new Audio("/Water Drop-SoundBible.com-2039669379.mp3");
        moveSound.play();
      }
    }
  }

  function availableMoves(oldPosition, newTakenLilypads) {
    const x = Number(oldPosition[0]);
    const y = Number(oldPosition[1]);

    let moves = [];

    x + 1 !== 0 &&
      y + 1 !== 0 &&
      x + 1 !== 6 &&
      y + 1 !== 6 &&
      isValid(`${x + 1}${y + 1}`, newTakenLilypads) &&
      moves.push(`${x + 1}${y + 1}`);
    x - 1 !== 0 &&
      y - 1 !== 0 &&
      x - 1 !== 6 &&
      y - 1 !== 6 &&
      isValid(`${x - 1}${y - 1}`, newTakenLilypads) &&
      moves.push(`${x - 1}${y - 1}`);
    x + 1 !== 0 &&
      y - 1 !== 0 &&
      x + 1 !== 6 &&
      y - 1 !== 6 &&
      isValid(`${x + 1}${y - 1}`, newTakenLilypads) &&
      moves.push(`${x + 1}${y - 1}`);
    x - 1 !== 0 &&
      y + 1 !== 0 &&
      x - 1 !== 6 &&
      y + 1 !== 6 &&
      isValid(`${x - 1}${y + 1}`, newTakenLilypads) &&
      moves.push(`${x - 1}${y + 1}`);
    y + 1 !== 0 &&
      y + 1 !== 6 &&
      isValid(`${x}${y + 1}`, newTakenLilypads) &&
      moves.push(`${x}${y + 1}`);
    y - 1 !== 0 &&
      y - 1 !== 6 &&
      isValid(`${x}${y - 1}`, newTakenLilypads) &&
      moves.push(`${x}${y - 1}`);
    x + 1 !== 0 &&
      x + 1 !== 6 &&
      isValid(`${x + 1}${y}`, newTakenLilypads) &&
      moves.push(`${x + 1}${y}`);
    x - 1 !== 0 &&
      x - 1 !== 6 &&
      isValid(`${x - 1}${y}`, newTakenLilypads) &&
      moves.push(`${x - 1}${y}`);

    return { moves };
  }

  function isValid(newPosition, newTakenLilypads) {
    if (newTakenLilypads.includes(newPosition)) {
      return false;
    } else {
      return true;
    }
  }

  const rows = [];
  for (let i = 1; i < 6; i++) {
    for (let j = 1; j < 6; j++) {
      let color = "emerald-400";
      let emoji = "🪷";

      if (`${i}${j}` == player[0].position) {
        color = `${player[0].color}-400`;
        emoji = "🐸";
      } else if (`${i}${j}` == player[1].position) {
        color = `${player[1].color}-400`;
        emoji = "🐸";
      }

      if (
        `${i}${j}` != player[0].position &&
        `${i}${j}` != player[1].position &&
        takenLilypads.includes(`${i}${j}`)
      ) {
        color = "sky-500";
        emoji = "💧";
      }

      rows.push(
        <div
          key={`${i}${j}`}
          id={`${i}${j}`}
          onClick={handleMove}
          className={`w-20 h-20 rounded-xl border-[#272727] border flex justify-center items-center text-[2rem] cursor-pointer duration-300 bg-${color}/60 shadow-lg hover:scale-105`}
        >
          {emoji}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        className="bgBlack w-full h-full "
        style={{
          position: "absolute",
          background: "black",
          filter: "blur(100px)",
          opacity: "0.5",
          zIndex: "5",
          display: gameEnd ? "block" : "none",
        }}
      ></div>
      <div className={`absolute z-50 inset-0 ${gameEnd ? "block" : "hidden"}`}>
        <WinningCard
          winner={winner}
          setGameEnd={setGameEnd}
          setWinner={setWinner}
          setTakenLilypads={setTakenLilypads}
        />
      </div>
      <div>
        <h1 className="pt text-5xl font-bold text-center">
          Player turn:{" "}
          <span
            className={`text-${
              player[Number(playerTurn) - Number(1)].color
            }-700`}
          >
            {player[Number(playerTurn) - Number(1)].name}
          </span>
        </h1>
      </div>
      <div
        id="board"
        className="relative p-[2rem] rounded-lg shadow-xl/20 w-max"
      >
        <div className="grid grid-cols-5 grid-rows-5 w-max gap-[.5rem]">
          {rows}
        </div>
      </div>
    </div>
  );
}
