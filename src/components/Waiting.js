import React from 'react'
import styles from '../sass/win.module.scss'

import loading from "../assets/Gear-0.6s-137px (1).gif"

function Waiting() {

    return (
        <div className={styles['container']}>
            <h1>
                Waiting for Another Player or He has left the game
            </h1>

            <img src={loading} />

        </div>
    )
}

export default Waiting
