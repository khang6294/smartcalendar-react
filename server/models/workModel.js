const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const workSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    toDo: {
        type: Array
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Work',workSchema)