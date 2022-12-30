import mongoose from "mongoose"

mongoose.set('strictQuery', false);

//await function makes the function return a promise:
const connectMongo = async () => mongoose.connect("mongodb+srv://user1:password1234@cluster0.zbb2xhj.mongodb.net/?retryWrites=true&")

export default connectMongo;