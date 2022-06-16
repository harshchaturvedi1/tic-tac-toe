import { useEffect, useState } from "react";
import styles from "./main.css";

const init = Array(9).fill(0);
const Main = () => {
  const [score, setScore] = useState(init);
  const [chance, setChance] = useState(true);
  const [count, setCount] = useState(0);

  //   reset game
  const resetGame = () => {
    setScore(init);
    setChance(true);
    setCount(0);
  };

  //   check winner
  const checkWinner = () => {
    let winner = "no";
    // rows
    if (score[0] === score[1] && score[1] === score[2] && score[0] !== "0")
      winner = score[1];
    else if (score[3] === score[4] && score[4] === score[5] && score[3] !== "0")
      winner = score[3];
    else if (score[6] === score[7] && score[7] === score[8] && score[7] !== "0")
      winner = score[7];
    // col
    else if (score[0] === score[3] && score[0] === score[6] && score[0] !== "0")
      winner = score[0];
    else if (score[1] === score[4] && score[1] === score[7] && score[1] !== "0")
      winner = score[1];
    else if (score[2] === score[5] && score[2] === score[8] && score[2] !== "0")
      winner = score[2];
    // diag
    else if (score[0] === score[4] && score[0] === score[8] && score[0] !== "0")
      winner = score[0];
    else if (score[2] === score[4] && score[2] === score[6] && score[2] !== "0")
      winner = score[2];

    if (winner !== "no") {
      if (winner === "x") alert("winner is player 'X'");
      else alert("winner is player 'O' ");
      resetGame();
    }
  };

  const handleGameCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleClick = (value) => {
    console.log("value:", value);
    console.log("count:", count);
    if (score[value] !== 0) {
      alert("already occupied");
    } else {
      // Arrays are referring to same memomry
      //   const temp = score;
      const temp = [...score];
      if (chance === true) temp[value] = "X";
      else temp[value] = "O";
      setScore([...temp]);
      setChance(!chance);
      handleGameCount();
    }
  };

  useEffect(() => {
    checkWinner();
    if (count === 9) {
      setTimeout(() => {
        console.log(...init);
        // setScore([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        alert("game over");
        resetGame();
      }, 500);
    }
  }, [count]);

  return (
    <div className="game-wrapper">
      {score.map((row, i) => (
        <div className="mainDiv" onClick={() => handleClick(i)}>
          <p> {row === 0 ? "" : row} </p>
        </div>
      ))}
    </div>
  );
};

export { Main };
