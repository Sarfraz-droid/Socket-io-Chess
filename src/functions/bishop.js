let data = [];
let pos_x = 0;
let pos_y = 0;
let e_l = 0;
let e_r = 0;
// False = white, True = black
// 1-6 = white, 7-12 = black

//     {
//       type: "king",
//       color: "white", // 6
//       img: wking,
//     },

//     {
//       type: "king",
//       color: "black", // 12
//       img: bking,
//     },

function bishop(chess,x,y,rawdata,player){
    // console.log("x: "+x+" y: "+y);
    pos_x = x
    pos_y = y
    data = rawdata;
    if(player){
        e_l = 1;
        e_r = 7;
    }else{
        e_l = 7;
        e_r = 13;
    }

    
    formDataDownLeft(chess,x+1,y-1);
    formDataDownRight(chess,x+1,y+1);
    formDataTopRight(chess,x-1,y+1);
    formDataTopLeft(chess,x-1,y-1);
    // console.log(data);
    return data;
}

function formDataDownLeft(chess,x,y){
    if(x<0 || y< 0 || x>7 || y>7){
        return;
    }

    if(chess[x][y] === 0){
        data[x][y] = 1;
    }else if(chess[x][y] >= e_l && chess[x][y] < e_r ){
        if(chess[x][y] === e_r-1)
            data[x][y] = 3;
        data[x][y] = Math.max(data[x][y],2);
        return;
    }else
        return;

    formDataDownLeft(chess,x+1,y-1);

}

function formDataDownRight(chess,x,y){
    if(x<0 || y< 0 || x>7 || y>7){
        return;
    }

    if(chess[x][y] === 0){
        data[x][y] = 1;
    }else if(chess[x][y] >= e_l && chess[x][y] < e_r ){
        if(chess[x][y] === e_r-1)
            data[x][y] = 3;
        data[x][y] = Math.max(data[x][y],2);
        return;

    }else
        return;

    formDataDownRight(chess,x+1,y+1);
}

function formDataTopRight(chess,x,y){
    if(x<0 || y< 0 || x>7 || y>7){
        return;
    }

    if(chess[x][y] === 0){
        data[x][y] = 1;
    }else if(chess[x][y] >= e_l && chess[x][y] < e_r ){
        if(chess[x][y] === e_r-1)
            data[x][y] = 3;
        data[x][y] = Math.max(data[x][y],2);
        return;

    }else
        return;
    
        formDataTopRight(chess,x-1,y+1);
}

function formDataTopLeft(chess,x,y){
    if(x<0 || y< 0 || x>7 || y>7){
        return;
    }

    if(chess[x][y] === 0){
        data[x][y] = 1;
    }else if(chess[x][y] >= e_l && chess[x][y] < e_r ){
        if(chess[x][y] === e_r-1)
            data[x][y] = 3;
        data[x][y] = Math.max(data[x][y],2);
        return;
    }else
        return;
    
    formDataTopLeft(chess,x-1,y-1);
}

export default bishop;