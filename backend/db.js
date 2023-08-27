const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/pocket-notes?directConnection=true&readPreference=nearest&authMechanism=DEFAULT'

const connectToMongo = async()=>{
    mongoose.connect(mongoURI)
    console.log('mongose is connected')
}

module.exports = connectToMongo


