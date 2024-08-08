import { Children, createContext, useState } from "react";

interface FinancialRecord {
  id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  // updateRecord: (id: string, nweRecord: FinancialRecord) => void;
  // deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records,setRecords])= useState<FinancialRecord[]>([])

  const addRecords = (record: FinancialRecord)=>{}
  return (
    <FinancialRecordsContext.Provider value={{records,addRecord {
        
    },}}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};
