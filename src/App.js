import { useState } from 'react';

function Square({value, onClick}){
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Status({Xplaying, gameState}){
  if(gameState === 'playing')
    return (
    <div className='status'>
      Turn for: {Xplaying ? 'X' : 'O'}
    </div>
    
    );
  else return (
    <div className='status'>{gameState}</div>
    );
}

function Board({board, handleClick}){
  return (
    <>
    <div className='board-row'>
      <Square value={board[0]} onClick={()=>handleClick(0)}/>
      <Square value={board[1]} onClick={()=>handleClick(1)}/>
      <Square value={board[2]} onClick={()=>handleClick(2)}/>
    </div>
    <div className='board-row'>
      <Square value={board[3]} onClick={()=>handleClick(3)}/>
      <Square value={board[4]} onClick={()=>handleClick(4)}/>
      <Square value={board[5]} onClick={()=>handleClick(5)}/>
    </div>
    <div className='board-row'>
      <Square value={board[6]} onClick={()=>handleClick(6)}/>
      <Square value={board[7]} onClick={()=>handleClick(7)}/>
      <Square value={board[8]} onClick={()=>handleClick(8)}/>
    </div>
    </>
  );
}

export default function Game(){
  const [Xplaying, setXplaying] = useState(true);
  const [gameState, setGameState] = useState('playing'); // {'playing', 'X won', 'O won', 'draw'}
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currSquares = history[history.length - 1];

  function updateGameState(squares)
  {
    const winner = calculateWinner(squares);
    if(winner === 'X')
    {
      setGameState('X won');
    }
    else if(winner === 'O')
      setGameState('O won');
    else if(!squares.includes(null))
      setGameState('draw');
    else setGameState('playing');
  }
  function handlePlay(i)
  {
    if(currSquares[i]) return;
    if(gameState !== 'playing') return;
    let newBoard;
    if(Xplaying)
      newBoard = (currSquares.map((sq, j) => j === i ? 'X' : sq));
    else newBoard = (currSquares.map((sq, j) => j === i ? 'O' : sq));
    setHistory([...history, newBoard]);
    setXplaying(!Xplaying);
    updateGameState(newBoard);
  }
  function handleHistory(i)
  {
    setHistory(history.slice(0, i+1));
    setXplaying(i%2===0);
    updateGameState(history[i]);
  }
  return (
    <>
    <header><h1>Tic Tac Toe</h1></header>
    <hr />
    <div className='game'>
      <div className='game-board'>
        <Board board={currSquares}  handleClick={(i)=>{handlePlay(i);}}/>
      </div>
      <div className='game-info'>
      <Status Xplaying={Xplaying} gameState={gameState}/>
      <ol>
        {history.map((val, index)=>{
          if(index === history.length-1)
          return (
            <li key={index}>You are at move {index}</li>
            );
          else if(index>0)
            return (
                    <li key={index}><button onClick={()=>handleHistory(index)}>Go to Move {index}</button></li>
                  );
          else return(
            <li key={index}><button onClick={()=>handleHistory(index)}>Go to Start</button></li>
          )
        })}
      </ol>
      </div>
    </div>
    <hr />
    <footer>
      <p>Prashanth Sriram S</p>
      <a href="https://github.com/prashanthsriram-s/react_tictactoe">View the Source Code Here</a>
    </footer>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}