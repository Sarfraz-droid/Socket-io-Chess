import React,{useState} from 'react'
import { Link, useHistory} from 'react-router-dom'

import styles from "../sass/login.module.scss"

function Login({ socket}) {

    const history = useHistory();

    const [Name, setName] = useState("")
    const [Room, setRoom] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit("join-room",{room:  Room, name: Name})
        history.push(`/play/${Room}`)
    }

    return (
        <div className={styles['container']}>
            <div className={styles['box']}>
                <div className={styles['main']}>
                    <h2>CHESS.EY</h2>
                    <input placeholder="Enter Your Name" type="text" value={Name} onChange={
                        (e) => {
                            setName(e.target.value)
                        }
                    }/>
                    <input placeholder="Enter Your Room" type="text" value={Room} onChange={
                        (e) => {
                            setRoom(e.target.value)
                        }
                    }/>
                    <button className='primary-button' onClick={(e) => handleSubmit(e)}>Enter</button>
                </div>

            </div>
        </div>
    )
}

export default Login
