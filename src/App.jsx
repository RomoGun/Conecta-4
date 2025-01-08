import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css';
import { Square, WinnerModal, Tablero, ResetHabilitados } from './Components';
import { TURNS } from './constantes';
import { checkWinnerFrom, checkEndWinner } from './logic/board'
import { SaveGameStorage, resetGameStorage } from './logic/Storage/index'
import { BoardState, TurnState } from './logic/Estados/States';


  function App() {
  const [Board, setBoard] = useState(Array(42).fill(null));
  const [Turn, setTurn] = useState(TURNS.X);
  const [Winner, setWinner] = useState(null);
  // const Habilitados = [];

  const resetGame = () => {
    setBoard(Array(42).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
    ResetHabilitados();
  }

  const updateBoard = (index) => {
    if (Board[index] || Winner) return;//evita que se sobre escriba al hacer click en un cuadro que ya tenga un valor o si ya hay un ganador 
    
    //actualiza el tablero 
    const newBoard = [...Board];
    newBoard[index] = Turn;
    setBoard(newBoard);//es asincrono

    //cambia de turno
    const newTurn = Turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Guarda la partida
    SaveGameStorage({
      Board: newBoard,
      Turn: newTurn
    });
    // saveHabilitados({
    //   Habilitados: []
    // });

    //checar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);//se manda el newBoard por parametro para vitar errores de que aun tenga el estado anterior
    if(newWinner){
      confetti();
      setWinner(newWinner);
    } else if (checkEndWinner(newBoard)){
      setWinner(false);
    }
  }

  useEffect(() => {
  //  console.log('this is the end');
  const boardFromStorage = window.localStorage.getItem('Board');
  const turnFromStorage = window.localStorage.getItem('Turn');
  setBoard(boardFromStorage ? JSON.parse(boardFromStorage) : Array(42).fill(null));
  setTurn(turnFromStorage ?? TURNS.X);//el doble ? es para identificar si la variable viene nula o indefinida
  },[Winner])
  

  return (
    <>
    <main className='board'>
      <h1>Conecta 4</h1>
      <button onClick={resetGame} >Reiniciar Juego</button>
      
      <Tablero Board={Board} updateBoard={updateBoard}/>

      <section className='turn'>
        <Square isSelected={Turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={Turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal Winner={Winner} resetGame={resetGame}/>
    </main>
    </>
  )
}

export default App
