// const {instrument} = require('@socket.io/admin-ui')
const io = require('socket.io')(process.env.PORT,{
    cors: {
        origin: ["http://localhost:3000","https://admin.socket.io","https://festive-archimedes-a9d181.netlify.app"]
    }
})

const rooms = {}

io.on('connection', socket => {
    console.log("JOINED : " + socket.id)

    socket.on('join-room', ({room, name}) =>{
        console.log("JOINING : ")
        console.log(room)
        socket.join(room)
        console.log("name")
        // console.log(rooms[room].white.name)

        if(rooms[room] == undefined || rooms[room].white.id === null){
            rooms[room] = {
                white : {
                    name : name,
                    id : socket.id
                },
                black : {
                    name : null,
                    id : null
                }
            }
        }else{
            rooms[room].black = {
                name : name,
                id : socket.id
            }

            io.in(room).to(socket.id).emit('play-chess',{
                room : rooms[room],
                state: true
            })
        }
        console.log(rooms[room]);
        
    })

    socket.on('sendchesspieces',(chess) => {
        const room = chess.room
        console.log(chess)
        io.in(room).to(socket.id).emit('get-chess',{
            chessdata: chess.chessdata,
            player: chess.player
        })
    })

    socket.on('sendchessdead',(chess) => {
        const room = chess.room
        console.log(chess)
        socket.to(room).emit('get-chess-dead',{
            Black : chess.Black,
            White : chess.White
        })
    })

    socket.on('surrender',(chess) => {
        console.log('surrender')
        console.log(chess)
        const room = chess.room
        console.log(chess)
        delete rooms[room]
        io.in(room).to(socket.id).emit('end-game',{
            winner : chess.winner
        })
    })

    socket.on('disconnecting', () => {
        // console.log(socket.rooms); // the Set contains at least the socket ID
        console.log("Disconnecting")
        console.log(Array.from(socket.rooms))

        Array.from(socket.rooms).forEach(room => {
            console.log(room)
            if(room != socket.id){
                console.log(socket.rooms); // the Set contains only the socket ID

                if(rooms[room] == undefined){
                    return;
                }

                if(rooms[room].white.id == socket.id){
                    rooms[room].white.id = null
                    rooms[room].white.name = null
                }else{
                    rooms[room].black.id = null
                    rooms[room].black.name = null
                }
                console.log(rooms[room]);
                io.in(room).to(socket.id).emit('play-chess',{
                    room : rooms[room],
                    state: false
                })
                socket.leave(room)
            }
        })
    });
    

})

// instrument(io,{auth: false})


