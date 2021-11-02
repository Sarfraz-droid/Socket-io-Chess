import React,{ useState, useEffect } from 'react'
import {useParams,useHistory} from 'react-router-dom'

import styles from "../sass/play.module.scss"
import PlayerCard from './GameComponents/PlayerCard'

import Board from "./ChessBoard"

function getState(id, Play) {
    if (id === Play["room"].black.id) return true;
    else return false;
  }
  

function Play({socket, Play}) {

    const [Player, setPlayer] = useState(false);
    const history = useHistory();

    const [id, setId] = useState(useParams().id);
    
    const [Black, setBlack] = useState([]);
    const [White, setWhite] = useState([]);

    const [CheckMate, setCheckMate] = useState({});

    useEffect(() => {
        socket.on('end-game',({ winner }) => {
            history.push(`/play/${id}/Win/${winner}`);
        });
    },[])

    function Surrender() {
        const myId = getState(socket.id,Play);
        socket.emit('surrender',{
            room: id,
            winner: myId ? Play["room"].white.name : Play["room"].black.name
        });
    }
    
    return (
        <div className={styles['container']}>
            <div className={styles['head1']}>
                <PlayerCard name={Play.room['white'].name} player={false} isCurrentPlayer={Player}
                 myState={socket.id === Play.room['white'].id}
                    style={{
                        opacity: Player === false ? '1' : '0.5'
                    }}
                />

                <Board socket={socket} Play={Play} Player={Player} setPlayer={setPlayer} roomName={id} Black={Black} setBlack={setBlack} White={White} setWhite={setWhite} CheckMate={CheckMate} setCheckMate={setCheckMate}
                />

                <PlayerCard name={Play.room['black'].name} player={true} style={{
                    marginTop: '560px',
                    opacity: Player === true ? '1' : '0.5'
                    
                }} isCurrentPlayer={Player}
                myState={socket.id === Play.room['black'].id}
                />
            </div>
            <div className={styles['head2']}>
                {CheckMate ? "CHECKMATE" : "NOT CHECKMATE"}
                
                <button className='primary-button' onClick={() => Surrender()}>
                    Surrender
                </button>
            </div>
        </div>
    )
}

export default Play
