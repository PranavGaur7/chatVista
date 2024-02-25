const express = require('express');
const { addMessage, getAllMesssage } = require('../controllers/messageController');
const messageRouter = express.Router()

messageRouter.route('/addMessage')
.post(addMessage)

messageRouter.route('/getMessage')
.post(getAllMesssage)
module.exports = messageRouter