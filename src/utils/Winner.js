import { line } from "framer-motion/client";

export const checkWinner = (board) => {

    const lines = [
        [0, 1, 2], //top row
        [3, 4, 5], //middle row
        [6, 7, 8], //bottom row

        [0, 3, 6], //left column
        [1, 4, 7], //middle column
        [2, 5, 8], //right column
        
        [0, 4, 8], //top-left to bootom-right diagonal
        [2, 4, 6] // top-right to botoom-left diagonal
    ];

    // loop thriugh each possible winning

    for(let line of lines){

        const [a, b, c] = line;

        //check if
        //1. there's something in board[a] (not null)
        //2. board[a] == board[b]
        //3. board[a] == board[c]

        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return{winner:board[a], line};
        }
    }

    //if no winner but all cells are filled,its a draw

    if(board.every(cell => cell !== null)){
        return{winner: "Draw", line:[]}
    }

    //if no winner and the board is not full yet,return null(game continious)
    return null;
}