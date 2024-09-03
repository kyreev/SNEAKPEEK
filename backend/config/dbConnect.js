import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb Connected");
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};
