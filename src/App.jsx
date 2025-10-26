import React, { useEffect, useState } from 'react'
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import { getAIMoveFromOpenRouter } from './utils/aiOpenRouter';
import { checkWinner } from './utils/Winner';
import { div } from 'framer-motion/client';


const App = () => {

  //State for the 3x3 board(9 cells)
  const [board, setBoard] = useState(Array(9).fill(null))

  //Is it the Player turn?
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  //who win?,  ("X" or "O" "Draw")
  const [winner, setWinner] = useState(null);

  //Score tracking
  const [score, setScore] = useState({X:0, O:0});

  //when a player click a square
  const handleClick = (i) =>{
    if(!isPlayerTurn || board[i] || winner) return;

    const newBoard = [...board];

    newBoard[i] ="X";

    setBoard(newBoard);

    setIsPlayerTurn(false);    
  }

  useEffect(() =>{

    if(winner) return //Prevent double storing

    //check if someone has won
    const result = checkWinner(board);

    if(result?.winner){
      setWinner(result.winner);
      if(result?.winner === "X" || result.winner === "O"){

        setScore((prev) => ({
          ...prev,
          [result.winner]:prev[result.winner]+1
        }))

        return;
      }
    }
    

    
    
    // if it`s a AIs turn and game not over
    if(!isPlayerTurn && !winner){

      const aiTurn = async () =>{
        const move = await getAIMoveFromOpenRouter(board);

        if(move !== null && board[move] === null){

          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }

      const timeout = setTimeout(aiTurn, 600);
      return () => clearTimeout(timeout);

    }

  },[board, isPlayerTurn, winner])

  //restart the game
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  }



  return (
    <div className='min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold mb-4'>Tic Tac Tai</h1>

      <ScoreBoard score = {score}/>
      <GameBoard board ={board} handleClick={handleClick}/>

      {winner &&(
        <div className='mt-4 text-xl'>
          {winner === "Draw"? "its a Draw": `${winner} wins`}
          <button onClick={restartGame}
          className='ml-4 px-4 py-2 bg-[#38BDF8] text-black rounded hover:bg=[#0EA5E9]'>
            play again
          </button>
        </div>
      )}
    </div>
  )
}

export default App

    