let data = [];
let pos_x = 0;
let pos_y = 0;
let e_l = 0;
let e_r = 0;

function kingdata(chess,x,y,rawdata,player){
    pos_x = x;
    pos_y = y;
    data = rawdata;

    if(player){
        e_l = 1;
        e_r = 7;
    }else{
        e_l = 7;
        e_r = 13;
    }


    check(chess,x-1,y-1);
    check(chess,x-1,y);
    check(chess,x-1,y+1);
    check(chess,x,y-1);
    check(chess,x,y+1);
    check(chess,x+1,y-1);
    check(chess,x+1,y);
    check(chess,x+1,y+1);

    return data;

}

function check(chess,x,y){
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

}



export default kingdata;