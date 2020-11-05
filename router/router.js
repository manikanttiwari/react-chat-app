const express = require('express');
const router = express.Router();

const { getChats, insertRoom } = require('../Controller/RoomController')

router.post('/get-chat-list', getChats)
router.post('/create-room', insertRoom)

module.exports = router