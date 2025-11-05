export default function InfoBoard({ player }) {
  return (
    <div
      id="info"
      className="absolute p-[1rem] rounded-lg shadow-xl/20 w-[12rem] right-4"
    >
      <div className="flex flex-col gap-1">
        <div className="inline-flex gap-2 items-center">
          <div
            className={`w-4 h-4 rounded-full bg-${player[0].color}-500`}
          ></div>
          <span className="n text-3xl font-bold">{player[0].name}</span>
        </div>
        <span className="m text-3xl font-bold">Moves: {player[0].moves}</span>
        <div></div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="inline-flex gap-2 items-center">
          <div
            className={`w-4 h-4 rounded-full bg-${player[1].color}-500`}
          ></div>
          <span className="n text-3xl font-bold">{player[1].name}</span>
        </div>
        <span className="m text-3xl font-bold">Moves: {player[1].moves}</span>
        <div></div>
      </div>
    </div>
  );
}
