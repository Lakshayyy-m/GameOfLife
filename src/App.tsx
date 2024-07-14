import GameOfLifeGrid from "./components/GameOfLifeGrid";

function App() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white basis-[10%]">
        Game of Life
      </h1>
      <GameOfLifeGrid />
    </div>
  );
}

export default App;
