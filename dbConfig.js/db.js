import Mongoose from 'mongoose';

async function connectDB() {
  try {
    await Mongoose.connect(process.env.LOCAL_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;
