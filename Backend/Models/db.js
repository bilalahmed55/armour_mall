import mongoose from "mongoose";

const response = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => { console.log("Connected to MongoDB") })
    .catch((err) => { console.log("Error connecting to MongoDB", err) })
}


export default response;