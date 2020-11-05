const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv')

const router = require('./router/router')
const connectDb = require('./config/db')
const { createRoom, sendMessage } = require('./Controller/RoomController')

connectDb();

const app = express();

app.use(express.json())

dotenv.config({ path: './config/config.env' })

app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

app.use('/api/v1', router)


io.on('connect', (socket) => {
    console.log("User connected")
    socket.on('join', async ({ name, roomCode }, callback) => {
        let { error } = await createRoom(name, roomCode);
        if (error) return callback(error);
        socket.join(roomCode);
        io.to(roomCode).emit('message', { type: "entry", _id: "hello", user: "admin", text: `${name} has entered into the chat` });
        callback();
    })
    socket.on('sendMessage', async ({ message, name, roomCode }, callback) => {
        let { error, msg } = await sendMessage(name, roomCode, message)
        if (error) return callback()
        io.to(roomCode).emit('message', { _id: msg._id, user: name, text: message });
        callback();
    });
    socket.on('disconnect', () => {
        console.log("User disconnected!")
    })
})

server.listen(process.env.PORT, console.log(`Server is listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))

