import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { Link } from "react-router-dom";
import Victory from "../assets/Victory.png";
import Frog from "../assets/Frog.png";
import { useNavigate } from "react-router-dom";

export default function WinningCard({
  winner,
  setGameEnd,
  setWinner,
  setTakenLilypads,
}) {
  const { player, setPlayer } = useContext(PlayerContext);

  let navigate = useNavigate();
  function handleReplay() {
    let newPlayer = [
      { ...player[0], position: "11", moves: 0 },
      { ...player[1], position: "55", moves: 0 },
    ];
    setPlayer(newPlayer);
    setGameEnd(false);
    setWinner("");
    setTakenLilypads(["11", "55"]);
    navigate("/game");
  }

  function handleReturn() {
    let newPlayer = [
      { name: "", color: "red", ready: false, position: "11", moves: 0 },
      {
        name: "",
        color: "green",
        ready: false,
        position: "55",
        moves: 0,
      },
    ];
    setPlayer(newPlayer);
    setGameEnd(false);
    setWinner("");
    setTakenLilypads(["11", "55"]);
    navigate("/lobby");
  }

  return (
    <div id="card" className="flex justify-center items-center h-full">
      <div className="w-max flex flex-col justify-center items-center gap-[1rem] backdrop-blur-sm rounded-2xl p-[2rem] shadow-xl/20 bg-black/20 ">
        <img src={Victory} alt="Victory" className="w-[16rem]" />
        <h1
          style={{
            textShadow: "3px 3px #000",
          }}
          className="text-2xl text-yellow-500 font-semibold "
        >
          {winner} Won!
        </h1>
        <img src={Frog} alt="Frog" className="w-[10rem]" />
        <div id="button" className="w-full flex justify-between">
          <button
            onClick={handleReplay}
            style={{
              border: "1px solid #000",
              boxShadow: "0 3px #000",
            }}
            className="text-[#757875e6] font-bold text-2xl bg-yellow-500 cursor-pointer text-2xl py-[.5rem] px-[1rem] rounded-md duration-300 hover:scale-105 self-center"
          >
            Replay
          </button>
          <Link to={"/lobby"}>
            <button
              onClick={handleReturn}
              style={{
                border: "1px solid #000",
                boxShadow: "0 3px #000",
              }}
              className="text-[#757875e6] font-bold text-2xl bg-yellow-500 cursor-pointer text-2xl py-[.5rem] px-[1rem] rounded-md duration-300 hover:scale-105 self-center"
            >
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
