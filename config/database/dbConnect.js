const mongoose = require('mongoose')

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB Connected')
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = dbConnect;