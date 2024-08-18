import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
const mongoURI: string =
  "mongodb+srv://yohannesgezachew2:tCpEraNivNZh8dkO@personalfinancetracker.knktusg.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Define routes and middleware here
app.use("/financial-records", financialRecordRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
