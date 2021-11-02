import React, { useState, useEffect } from "react";
import styles from "../sass/chessboard.module.scss";

import { useParams } from "react-router-dom";

//White pieces
import wpawn from "../assets/whiteplayer/Pawn.svg";
import wknght from "../assets/whiteplayer/Knight.svg";
import wbishop from "../assets/whiteplayer/Bishop.svg";
import wrook from "../assets/whiteplayer/Castle.svg";
import wqueen from "../assets/whiteplayer/Queen.svg";
import wking from "../assets/whiteplayer/King.svg";

//Black pieces
import bpawn from "../assets/blackplayer/Pawn.svg";
import bknght from "../assets/blackplayer/Knight.svg";
import bbishop from "../assets/blackplayer/Bishop.svg";
import brook from "../assets/blackplayer/Castle.svg";
import bqueen from "../assets/blackplayer/Queen.svg";
import bking from "../assets/blackplayer/King.svg";

import marker from "../assets/marker.svg";
import chessmarker from "../assets/markerchesscut.svg";

import pawn from "../functions/pawn";
import knightCheck from "../functions/knight";
import bishopCheck from "../functions/bishop";
import rookCheck from "../functions/rook";
import kingCheck from "../functions/king"

//CheckMate functions
import CheckCheckMate from "../functions/checkmate/CheckCheckMate";
import findVulnerability from "../functions/checkmate/FindVulnerableAreas";
import canMove from "../functions/checkmate/canMove";

const chesspieces = [
  null,
  {
    type: "pawn",
    color: "white", //1
    img: wpawn,
  },
  {
    type: "knght",
    color: "white", // 2
    img: wknght,
  },
  {
    type: "bishop",
    color: "white", // 3
    img: wbishop,
  },
  {
    type: "rook",
    color: "white", // 4
    img: wrook,
  },
  {
    type: "queen",
    color: "white", // 5
    img: wqueen,
  },
  {
    type: "king",
    color: "white", // 6
    img: wking,
  },
  {
    type: "pawn",
    color: "black", // 7
    img: bpawn,
  },
  {
    type: "knght",
    color: "black", // 8
    img: bknght,
  },
  {
    type: "bishop",
    color: "black", // 9
    img: bbishop,
  },
  {
    type: "rook",
    color: "black", // 10
    img: brook,
  },
  {
    type: "queen",
    color: "black", // 11
    img: bqueen,
  },
  {
    type: "king",
    color: "black", // 12
    img: bking,
  },
];

function getState(id, Play) {
  if (id === Play["room"].black.id) return true;
  else return false;
}

function Chess({
  socket,
  Play,
  Player,
  setPlayer,
  roomName,
  Black,
  setBlack,
  White,
  setWhite,
  CheckMate,
  setCheckMate,
}) {
  const data = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const MyState = getState(socket.id, Play);

  const [chess, setChess] = useState([
    [4, 2, 3, 5, 6, 3, 2, 4],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [7, 7, 7, 7, 7, 7, 7, 7],
    [10, 8, 9, 11, 12, 9, 8, 10],
  ]);

  const [checkers, setCheckers] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [vulnerable_areas, setvulnerable_areas] = useState({
    white: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    black: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
  });

  // False = white, True = black

  const [selected, setSelected] = useState({
    x: 0,
    y: 0,
    status: false,
    type: null,
  });

  function FindVulnerabilityAndCheckMate(chessinfo) {
    const areas = findVulnerability(
      vulnerable_areas.black,
      vulnerable_areas.white,
      chessinfo
    );
    setvulnerable_areas(areas);
    console.log("Vulnerable Areas");
    console.log(areas);

    console.log("CHESS : ");

    if (CheckCheckMate(areas.white) || CheckCheckMate(areas.black)) {
      setCheckMate(true);
      console.log("CheckMate");
    } else {
      setCheckMate(false);
      console.log("Not CheckMate");
    }

    console.log(CheckMate);
  }

  // Find Checkers
  useEffect(() => {
    let id = chess[selected.x][selected.y];
    console.log("move " + id);
    if (id > 6 && Player === false) {
      return;
    } else if (id <= 6 && Player === true) {
      return;
    } else if (Player != MyState) return;

    if (selected.status === true) {
      let temp = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];
      const x = selected.x;
      const y = selected.y;
      const type = selected.type;
      let data = temp;
      console.log(type);
      switch (type.type) {
        case "pawn":
          data = pawn(type, chess, temp, x, y);

          break;
        case "knght":
          data = knightCheck(chess, x, y, temp);
          break;
        case "bishop":
          data = bishopCheck(chess, x, y, temp, Player);
          break;
        case "rook":
          data = rookCheck(chess, x, y, temp, Player);
          break;
        case "queen":
          temp = bishopCheck(chess, x, y, temp, Player);
          data = rookCheck(chess, x, y, temp, Player);
          break;
        case "king":
          data = kingCheck(chess, x, y, temp, Player);
          break;
      }

      console.log(data);
      setCheckers(data);
    } else {
      setCheckers([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]);
    }
  }, [selected]);

  // useEffect(() => {
  //   console.log("Chess Data");
  //   console.log(chess);
  // }, [chess]);

  useEffect(() => {
    console.log(Black);
    console.log(White);
  }, [Black, White]);

  //Get Chess Peices
  useEffect(() => {
    if (socket == null) return;

    socket.on("get-chess", ({ chessdata, player }) => {
      console.log("CHESS DATA");
      console.log(chessdata);
      console.log(player);
      setChess(chessdata);
      setTempChess(chessdata);
      setPlayer(player);
      FindVulnerabilityAndCheckMate(chessdata);
    });
  }, [socket]);

  //Get Dead Chess Peices
  useEffect(() => {
    if (socket == null) return;

    socket.on("get-chess-dead", ({ Black, White }) => {
      setBlack(Black);
      setWhite(White);
    });

    console.log("Black AND White");
    console.log(Black);
    console.log(White);
  }, [socket]);

  function updateSelected(i, index) {
    console.log("updateSelected");
    if (selected.status === true) {
      setSelected({
        x: i,
        y: index,
        status: true,
        type: chesspieces[chess[i][index]],
      });
    } else {
      setSelected({
        x: i,
        y: index,
        status: true,
        type: chesspieces[chess[i][index]],
      });
    }
  }

  function SpawnChess(id, i, index) {
    return (
      <div
        className={styles.chesspiece}
        onClick={() => updateSelected(i, index)}
      >
        <img src={chesspieces[id].img} alt="" />
      </div>
    );
  }

  function markers(id, index) {
    let ans;

    if (checkers[id][index] === 1) {
      ans = (
        <div className={styles.marker}>
          <img src={marker} />
        </div>
      );
    } else if (checkers[id][index] === 2) {
      console.log("Enemies");
      ans = (
        <div
          className={styles.marker}
          style={{
            marginTop: "-4.3vw",
          }}
        >
          <img className={styles.attack} src={chessmarker} />
        </div>
      );
    }

    return ans;
  }

  function emitDead(lostPiece) {
    const blackPieces = Black;
    const whitePieces = White;
    if (Player == false) blackPieces.push(lostPiece);
    else whitePieces.push(lostPiece);

    setBlack(blackPieces);
    setWhite(whitePieces);

    socket.emit("sendchessdead", {
      room: roomName,
      Black: blackPieces,
      White: whitePieces,
    });
  }

  const [tempChess, setTempChess] = useState([])

  function MovePiece(i, index) {
    let id = chess[selected.x][selected.y];
    console.log("move " + id);
    if (id > 6 && Player === false) {
      return;
    } else if (id <= 6 && Player === true) {
      return;
    } else if (Player !== MyState) return;

    console.log("Move " + checkers[i][index]);
    console.log(i + " " + index);
    if (selected == null) return;

    if (checkers[i][index] != 0) {
      setCheckers([
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]);
      let pos_x = selected.x;
      let pos_y = selected.y;
      setTempChess(chess)
      const chessdata = [];

      chess.forEach((row, i) => {
        chessdata.push(row);
      })


      let k = chessdata[pos_x][pos_y];
      console.log("Chess index" + chessdata[i][index]);

      const lostPiece = chessdata[i][index] != 0 ? chessdata[i][index] : null;

      chessdata[pos_x][pos_y] = 0;
      chessdata[i][index] = k;
      var move = false;
      console.log("Before")
      console.log(chess);
      if (CheckMate === true) {
        if (canMove(chessdata, Player)) {
          alert("Cannot Move");
          console.log("Cannot Move");
          chessdata[i][index] = lostPiece ? lostPiece : 0;
          chessdata[pos_x][pos_y] = k;
          setChess(chessdata);
          move = true;

          return;
        }
      }

      if (!move) {

        setChess(chessdata);
        setPlayer(!Player);
        FindVulnerabilityAndCheckMate(chessdata);

        if (lostPiece != null) emitDead(lostPiece);


      }

      socket.emit("sendchesspieces", {
        chessdata: chess,
        room: roomName,
        player: !Player,
        color: Player ? "Black" : "White",
      });
    }
  }

  return (
    <div>
      <div className={styles["chessboard"]}>
        {[...Array(8)].map((_, i) => {
          return (
            <div className={styles["chesssection"]}>
              {data.map((item, index) => (
                <div
                  className={styles["chessbox"]}
                  id={`${i}_${item}`}
                  onClick={() => MovePiece(i, index)}
                >
                  {chess[i][index] != 0
                    ? SpawnChess(chess[i][index], i, index)
                    : null}
                  {markers(i, index)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {/* <h4 className={styles["chessletter"]}>
          {Player === MyState ? "Your " : "Not Your "}
          Player's Turn
        </h4>
        <h4>
          You are
          {MyState ? " Black" : " White"}
        </h4>

        <div>
          Black
          <div className={styles["chessgoti"]}>
            {Black.map((item) => {
              return (
                <span>
                  <img src={chesspieces[item].img} />
                </span>
              );
            })}
          </div>
        </div>
        <div>
          White
          <div className={styles["chessgoti"]}>
            {White.map((item) => {
              return <img src={chesspieces[item].img} />;
            })}
          </div>
        </div> */}
    </div>
  );
}

export default Chess;
