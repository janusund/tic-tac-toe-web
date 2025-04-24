export default function GameOver({winner, onRestart}){
    return(
        <div id="game-over">
            Game Over !
            {winner && <p>You won {winner} !</p>}
            {!winner && <p> It is a draw!</p>}
            <p>
                <button onClick={onRestart}>Rematch!</button>
            </p>
        
        </div>
    )
}