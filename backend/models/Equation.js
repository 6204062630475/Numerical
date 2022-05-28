const mongoose = require('mongoose')
const Schema = mongoose.Schema

let equationSchema = new Schema({
    equation: {
        type: String
    }

}, {
    collection: "equations"
})
module.exports = mongoose.model('Equation',equationSchema);