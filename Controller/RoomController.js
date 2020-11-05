const Room = require('../Model/RoomModel')
const uuid4 = require('uuid4');


exports.getChats = async (req, res, next) => {
    // console.log(req.body)
    try {
        let rooms = await Room.find({ room_code: req.body.room_code });
        if (rooms === undefined || rooms.length === 0) {
            return res.status(400).send({
                success: false,
                msg: "invalid-room"
            })
        }
        let room = rooms[0];
        return res.status(200).send({
            success: true,
            chats: room.chats
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: 'Internal server error'
        })
    }
}

exports.insertRoom = async (req, res, next) => {
    try {
        await Room.create({ room_code: req.body.room_code });
        return res.status(200).json({
            success: true,
            msg: 'room-created'
        })
    } catch (error) {
        if (error.name === 'MongoError') {
            return res.status(400).json({
                success: false,
                msg: 'Room already exists'
            })
        }
        return res.status(500).send({
            success: false,
            msg: 'Internal server error'
        })
    }
}

exports.createRoom = async (name, roomCode) => {
    try {
        await Room.create({ room_code: roomCode });
        return { user: "name" };
    } catch (error) {
        if (error.name === 'MongoError') {
            return { user: "name" };
        }
        return { error }
    }
}

exports.sendMessage = async (name, room_code, message) => {
    try {
        let rooms = await Room.find({ room_code: room_code });
        if (rooms === undefined || rooms.length === 0) {
            return { error: "Error" }
        }
        let room = rooms[0];
        let msg = {
            _id: uuid4(),
            msg: message,
            username: name,
            createdAt: Date.now()
        }
        room.chats.push(msg)
        await Room.updateOne({ room_code: room_code }, { $set: room })
        return { msg };
    } catch (error) {
        return { error }
    }
}