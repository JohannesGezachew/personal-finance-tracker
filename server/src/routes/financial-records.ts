import express, { Request, Response } from "express";
import FinancialRecordModel from "../Schema/financial-record"; // Ensure this path is correct
const router = express.Router();

router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });

    if (records.length === 0) {
      return res.status(404).send("No records are found for the user");
    }

    res.status(200).send(records);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving records");
  }
});

export default router;
