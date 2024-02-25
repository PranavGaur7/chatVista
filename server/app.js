const express = require('express')
const app = express();
var cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socket = require('socket.io')
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
}))
require('dotenv').config();
// app.use(express.bodyParser({limit: '50mb'}))
const server = app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})
app.use(cookieParser())

const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    })
})

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'bad request'
    })
})

const userRouter = require('./routers/userRouter');
const messageRouter = require('./routers/messageRouter');
app.use('/user', userRouter);
app.use('/message', messageRouter);

