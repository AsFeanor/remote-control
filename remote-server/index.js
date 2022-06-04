let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/view', (req, res) => {
    res.sendFile(__dirname + '/display.html');
})

io.on('connection', (socket)=> {

    socket.on("join-message", (roomId) => {
        socket.join(roomId);
        console.log("User joined in a room : " + roomId);
    })

    socket.on('screen-data', (data) => {
        data = JSON.parse(data);
        let room = data.room;
        let imgStr = data.image;
        socket.broadcast.to(room).emit('screen-data', imgStr);
    })
})

let server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})