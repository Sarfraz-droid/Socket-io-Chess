/* eslint-disable no-unused-expressions */ 

//     {
//       type: "king",
//       color: "black", // 12
//       img: bking,
//     },

function pawndata (pawn,chess,data,x,y){
    let pawnColor = pawn.color;
    // console.log(x+ " "+ y)
    if(pawnColor === 'white'){
        if(chess[x+1][y] == 0)
        {
            data[x+1][y] = 1;            
        }
        if(chess[x+1][y+1] != 0 & chess[x+1][y+1] > 6)
            data[x+1][y+1] = Math.max(data[x+1][y+1],chess[x+1][y+1] == 12 ? 3 : 2);
        else if(chess[x+1][y-1] != 0 & chess[x+1][y-1] > 6)
            data[x+1][y-1] = Math.max(data[x+1][y-1],chess[x+1][y-1] == 12? 3 : 2) ;
    }else{
        if(chess[x-1][y] == 0)
        {
            data[x-1][y] = 1;            
        }
        if(chess[x-1][y+1] != 0  & chess[x-1][y+1] <= 6)
            data[x-1][y+1] = Math.max(data[x-1][y+1],chess[x-1][y+1] == 6? 3 : 2)
        if(chess[x-1][y-1] != 0 & chess[x-1][y-1] <= 6)
            data[x-1][y-1] = Math.max(data[x-1][y-1],chess[x-1][y-1] == 6? 3 : 2);
    }
    return data;
}

export default pawndata;
