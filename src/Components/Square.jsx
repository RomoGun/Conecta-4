import { useEffect } from "react";

let Habilitados =  []
// const habilitadosLocal = window.localStorage.setItem('HabilitadosLocal', JSON.stringify([]));



export const Square = ({children, isSelected, updateBoard, index}) => {
  // const [habilitados, setHabilitados] = useState([]);
  

  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    
    if(index>=35 || Habilitados.includes(index)){
      Habilitados.push(index - 7);
      window.localStorage.setItem('HabilitadosLocal', JSON.stringify(Habilitados));
      updateBoard(index);
    }
  }
    
    useEffect(() => {
      const habilitadosLocal = window.localStorage.getItem('HabilitadosLocal');
      Habilitados =  JSON.parse(habilitadosLocal) ? JSON.parse(habilitadosLocal) : Habilitados
      // console.log(Habilitados)
    }, [Habilitados]);
    

    return(
      <div onClick={handleClick}
      className={className}>
          {children}
        </div>
      );
    }

export const ResetHabilitados = () => {
  Habilitados = []
  window.localStorage.setItem('HabilitadosLocal', JSON.stringify([]));
  // window.localStorage.removeItem('HabilitadosLocal');
}
// export const SaveHabilitadosStorage = (newHabilitado) => {
//   //Guardar Partida
//   window.localStorage.setItem('HabilitadosLocal', JSON.stringify(newHabilitado));
// }
