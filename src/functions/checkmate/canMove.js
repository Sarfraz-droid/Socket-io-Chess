import findVulnerability from "./FindVulnerableAreas";

import CheckCheckMate from "./CheckCheckMate";

function canMove(chessdata,player){
    const areas_white = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

    const areas_black = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ];

    const vulnerable_areas = findVulnerability(areas_black,areas_white,chessdata);

    console.log("Vulnerable Areas on Checkmate Check")
    console.log(vulnerable_areas);

    var can_move = false;

    if(player){
        can_move =  CheckCheckMate(vulnerable_areas.white)
    }else{
        can_move = CheckCheckMate(vulnerable_areas.black)
    }

    console.log(can_move)

    return can_move;
}

export default canMove;