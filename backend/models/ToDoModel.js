const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type:"String", require: true
    },
}, { timestamps: true })

module.exports = mongoose.model('ToDo', todoSchema)