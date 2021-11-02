import React from "react";
import styles from "../../sass/Play/Playercard.module.scss";

function PlayerCard({ name, player, style,isCurrentPlayer,myState }) {
  const stylesheet = {
    container: {
      alignItems: player ? "left" : "right",
      justifyContent: player ? "flex-end" : "flex-start",
    },
    card: {
      borderColor: isCurrentPlayer === player ? "#DB6D6D" : "#76DB6D",
      textAlign: player ? "right" : "left",


    },
  };

  function Turn(){
    return (
      <div className={styles['turn-container']}>
        <h2>Your Turn!</h2>
      </div>
    )
  }

  return (
    <div style={style}>
    <div className={styles[`container`]} style={stylesheet.container}>
      { isCurrentPlayer === player && player == true && myState == true? <Turn/> : null }
      <div className={styles[`card`]} style={stylesheet.card}>
        {
            !player ?
            <div className={styles[`image`]} /> : null
    }
        <div className={styles[`card-content`]}>
          <h2>{name}</h2>
          <p>You are {player ? "Black" : "White"}</p>
        </div>
        {
            !player ? null :
            <div className={styles[`image`]} />
        }
      </div>
      { isCurrentPlayer === player && player == false && myState == true? <Turn/> : null }
    </div>
    </div>
  );
}

export default PlayerCard;
