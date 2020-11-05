const mongoose = require('mongoose');

const room = new mongoose.Schema({
    room_code: {
        unique: true,
        type: String,
        required: true
    },
    chats: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Room', room, 'room')