import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb Connected Successfully");
    }
    catch(err) {
        console.log("MongoDB connection failed ", err.message);
        process.exit(1); //stops the applications if the database connection failed
    }
}

export default connectDB;