import bishop from "../bishop";
import rook from "../rook";
import pawn from "../pawn";
import knight from "../knight";
import king from "../king"
// areas_black = bishop(chess,i,j,areas,true);
// areas_black = rook(chess,i,j,areas,true);
// areas = pawn(chess,i,j,areas,true);
// areas = knight(chess,i,j,areas,true);

// areas_white = bishop(chess,i,j,areas,false);
// areas_white = rook(chess,i,j,areas,false);
// areas = pawn(chess,i,j,areas,false);
// areas = knight(chess,i,j,areas,false);

/*

    White:
        pawn --->  1
        knight --->  2
        bishop --->  3
        rook --->  4
        queen --->  5
        king --->  6
    
    Black:
        pawn --->  7
        knight --->  8
        bishop --->  9
        rook --->  10
        queen --->  11
        king --->  12
    
*/

function findVulnerability(areas_black, areas_white, chess) {

    areas_white = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

    areas_black = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];


  console.log("areas_black");
  console.log(areas_black);
  console.log("areas_white");
  console.log(areas_white);

  chess.forEach(function (chesspiece, i) {
    chesspiece.forEach(function (item, j) {
      if (chesspiece != 0) {
        switch (item) {
          case 1:
            areas_white = pawn({color: "white"}, chess, areas_white, i,j);
            break;
          case 2:
            areas_white = knight(chess, i, j, areas_white, false);
            break;

          case 3:
            areas_white = bishop(chess, i, j, areas_white, false);
            break;

          case 4:
            areas_white = rook(chess, i, j, areas_white, false);
            break;

          case 5:
            areas_white = bishop(chess, i, j, areas_white, false);
            areas_white = rook(chess, i, j, areas_white, false);
            break;

          case 6:
            //King
            areas_white = king(chess, i, j, areas_white, false);
            break;

          case 7:
            areas_black = pawn({color: "black"}, chess, areas_black, i,j);
            break;

          case 8:
            areas_black = knight(chess, i, j, areas_black, true);
            break;

          case 9:
            areas_black = bishop(chess, i, j, areas_black, true);
            break;

          case 10:
            areas_black = rook(chess, i, j, areas_black, true);
            break;

          case 11:
            areas_black = bishop(chess, i, j, areas_black, true);
            areas_black = rook(chess, i, j, areas_black, true);

            break;

          case 12:
            //King
            areas_black = king(chess, i, j, areas_black, true);
            break;
        }
      }
    });
  });

  return {
    white: areas_white,
    black: areas_black,
  };
}

export default findVulnerability;
