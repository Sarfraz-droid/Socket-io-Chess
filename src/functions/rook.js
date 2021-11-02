let data = []
let e_l = 0;
let e_r = 0;

//     {
//       type: "king",
//       color: "black", // 12
//       img: bking,
//     },

function rook(chess,x,y,rawdata,player){
    data = rawdata
    // console.log(player)
    if(player){
        e_l = 1;
        e_r = 7;
    }else{
        e_l = 7;
        e_r = 13;
    }
    goDown(chess,x,y-1,-1);
    goDown(chess,x,y+1,1);
    goRight(chess,x-1,y,-1);
    goRight(chess,x+1,y,1);
    // console.log(data);
    return data;
}

function goDown(chess,x,y,up){
    if(x<0 || y< 0 || x>7 || y>7)
    {
        return;
    }

    // console.log("loop")

    if(chess[x][y] === 0){
        data[x][y] = 1;
    }else if(chess[x][y] >= e_l && chess[x][y] < e_r ){
        data[x][y] = chess[x][y] == e_r-1? 3 : 2;
        return;

    }else
        return;

    goDown(chess,x,y+up,up);
}

function goRight(chess,x,y,right)
{
    if(x<0 || y< 0 || x>7 || y>7)
    {
        return;
    }
    // console.log("loop")
    
    if(chess[x][y] === 0){
        data[x][y] = 1;
    }else if(chess[x][y] >= e_l && chess[x][y] < e_r ){
        data[x][y] = Math.max(data[x][y],chess[x][y] == e_r-1? 3 : 2);
        return;

    }else
        return;

    goRight(chess,x+right,y,right);
}



export default rook;