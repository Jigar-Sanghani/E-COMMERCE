import mongoose from 'mongoose';

const db = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Connect To The Database ||");

    })

    await mongoose.connect(`${process.env.MONGODB_URL}/E-commerce`)
}

export default db
