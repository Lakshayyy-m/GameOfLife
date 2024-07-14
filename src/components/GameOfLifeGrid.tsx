import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Infinity, Pause, Play } from "lucide-react";
import { gameOfLifeLogic, generateRandom } from "../lib/gameOfLifeLogic";

const GameOfLifeGrid = () => {
  //doing it with 30x30 entries
  const [board, setBoard] = useState<number[][]>(
    new Array(30).fill(0).map(() => Array(30).fill(0))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [intervalPointer, setIntervalPointer] = useState<NodeJS.Timer>();

  const selectValue = (row: number, column: number) => {
    setBoard((prev) => {
      if (prev[row][column]) {
        prev[row][column] = 0;
      } else {
        prev[row][column] = 1;
      }
      return [...prev];
    });
  };

  const startGame = () => {
    setIsRunning(() => {
      return true;
    });

    setIntervalPointer(
      setInterval(() => {
        setBoard((prev) => {
          const newBoard = gameOfLifeLogic(prev);

          return [...newBoard];
        });
      }, 500)
    );
  };

  const stopGame = () => {
    setIsRunning(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearInterval(intervalPointer as any);
  };

  return (
    <main className="basis-[90%] p-10 flex gap-20 items-center">
      <section className=" flex flex-col items-center justify-center gap-1 w-full">
        {board.map((row, i) => (
          <div className="grid grid-cols-30 gap-1 w-" key={i}>
            {row.map((val, j) => (
              <div
                className={cn(
                  "hover:cursor-pointer hover:bg-slate-400 h-[20px] w-[20px] flex flex-col items-center justify-center bg-white",
                  {
                    "bg-yellow-400": val === 1,
                    "hover:bg-yellow-300": val === 1,
                  }
                )}
                key={i ** 2 + j}
                onClick={() => selectValue(i, j)}
              />
            ))}
          </div>
        ))}
      </section>
      <section className="flex flex-col items-center justify-center gap-6">
        <Button
          className="bg-blue-500 flex items-center gap-3 py-4 px-6 w-[140px]"
          onClick={isRunning ? stopGame : startGame}
        >
          {isRunning ? (
            <>
              <Pause /> Stop
            </>
          ) : (
            <>
              <Play /> Start
            </>
          )}
        </Button>
        <Button
          className="bg-blue-500 flex items-center gap-3 py-4 px-6 w-[140px]"
          onClick={() => {
            setBoard(() => [...generateRandom(board, 0.3)]);
          }}
        >
          <Infinity />
          Random
        </Button>
      </section>
    </main>
  );
};

export default GameOfLifeGrid;
