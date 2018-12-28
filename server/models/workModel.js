const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const workSchema = new Schema({
    dateWork: {
        type: String,
        required: true
    },
    toDoList: {
        type: Array,
        required:true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Work',workSchema)