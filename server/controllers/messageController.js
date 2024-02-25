const messageModel = require("../models/messageModel");
const jwt = require('jsonwebtoken')
module.exports.addMessage = async function addMessage(req, res) {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        if(data) return res.json({
            msg:"message added successfully",
            data:data
        })
        else return res.json({
            msg:"cannot add message successfully",
        })
    } catch (error) {
        return res.json(error);
    }
}

module.exports.getAllMesssage = async function getAllMesssage(req, res) {
    const {from,to} = req.body;
    const messages = await messageModel.find({
        users:{
            $all:[from,to],
        },
    }).sort({updatedAt:1});
    const projectMessages = messages.map((msg)=>{
        return{
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
            time: msg.createdAt.toLocaleTimeString().replace(/:\d+\s/, ' '),
        };
    });
    res.json(projectMessages)
}

module.exports.findLatest = async function findLatest(req,res){
    let token = req.cookies.login;
    let uid = jwt.verify(token,process.env.JWT_KEY).payload;
    
}