import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [catagory, setCatagory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { user } = useUser();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id,
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      catagory: catagory,
      paymentMethod: paymentMethod,
    };
    // addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCatagory("");
    setPaymentMethod("");
  };
  return (
    <div className="form-container">
      <form>
        <div className="from-field">
          <label>Description:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="from-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="from-field">
          <label>Catagory:</label>
          <select
            required
            className="input"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
          >
            <option value="">Select a Catagory</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilites">Utilites</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <div className="from-field">
            <label>Payment Method:</label>
            <select
              required
              className="input"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select a Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <button type="submit" className="button">
            add record
          </button>
        </div>
      </form>
    </div>
  );
};
