const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_LINK)
    .then(function (db) {
        console.log("message db connected");
    })
    .catch(function (err) {
        console.log(err);
    })

const messageSchema = mongoose.Schema(
    {

        message: {
            text: {
                type: String,
                required: true,
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel",
            required: true,
        },
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('messageModel', messageSchema);