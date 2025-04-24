import {useState} from 'react';

export default function Player({ initialName, symbol ,isActive}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName , setPlayerName] = useState(initialName);
  let playerContent = <span className="player-name">{playerName}</span>;
 
  function handleEdit(){
     setIsEditing((editing)=> !editing);
     
  }

  function handleInputPlayerName(event){
    setPlayerName(event.target.value);
    
  }

  if(isEditing){
    playerContent = <input type="text" required value={playerName} onChange={handleInputPlayerName}/>     
  }
  return (
    <li className={isActive ?'active' : undefined}>
      <span className="player">
        {playerContent}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? 'Save':'Edit'}</button>
    </li>
  );
}
