import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}doctor-namagement`)
        console.log('MongoDb Successfully Connected !!!!')
    } catch (err) {
        console.log("ERROR : ", err)
    }
}