import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const { totalIncome, expenseCategories } = useMemo(() => {
    let income = 0;
    const expenses = {};

    records.forEach((record) => {
      if (record.amount > 0) {
        income += record.amount;
      } else {
        const category = record.category || "Uncategorized";
        if (!expenses[category]) {
          expenses[category] = 0;
        }
        expenses[category] += Math.abs(record.amount);
      }
    });

    return {
      totalIncome: income,
      expenseCategories: expenses,
    };
  }, [records]);

  const data = useMemo(() => {
    const categories = Object.keys(expenseCategories);
    const expenseValues = Object.values(expenseCategories);

    return {
      labels: ["Income", ...categories],
      datasets: [
        {
          data: [totalIncome, ...expenseValues],
          backgroundColor: [
            "#36A2EB",
            "#FF6384",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#36A2EB",
            "#FF6384",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };
  }, [totalIncome, expenseCategories]);

  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <FinancialRecordForm />
      <div>
        Total Monthly: $
        {totalIncome -
          Object.values(expenseCategories).reduce((a, b) => a + b, 0)}
      </div>
      <div className="donut-chart-container">
        <Doughnut data={data} />
      </div>
      <FinancialRecordList />
    </div>
  );
};
