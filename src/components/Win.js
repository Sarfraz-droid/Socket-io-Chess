import React from 'react'
import styles from '../sass/win.module.scss'
import {useParams} from 'react-router-dom'

function Win() {

    const {id,name} = useParams()

    return (
        <div className={styles['container']}>
            <h1>
                {name} Won the game!
            </h1>
        </div>
    )
}

export default Win
