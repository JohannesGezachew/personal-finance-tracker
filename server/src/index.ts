import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

console.log("MongoDB URI:", process.env.MONGO_URI);

const mongoURI: string = process.env.MONGO_URI || "";
// "mongodb+srv://yohannesgezachew2:mB4vsjDe4rcu6IDD@personalfinancetracker.knktusg.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Define routes and middleware here
app.use("/financial-records", financialRecordRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
