const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://project:manikant@manikant.uc3ja.mongodb.net/chat?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('MongoDb is connected')
    } catch (error) {
        console.log("Error: ", error)
    }

}
module.exports = connectDB;