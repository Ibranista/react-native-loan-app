import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoanContextValue {
  loans: any[];
  addLoan: (amount: number, duration: number) => void;
  repayLoan: (id: number, amount: number) => void;
}

export const LoanContext = createContext<LoanContextValue | null>(null);

export function LoanProvider({ children }) {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // Load persisted loans on app start
    (async () => {
      const savedLoans = await AsyncStorage.getItem('loans');
      if (savedLoans) {
        setLoans(JSON.parse(savedLoans));
      }
    })();
  }, []);

  useEffect(() => {
    // Persist loans whenever they change
    AsyncStorage.setItem('loans', JSON.stringify(loans));
  }, [loans]);

  const addLoan = (amount, duration) => {
    const newLoan = {
      id: Date.now(),
      amount: Number(amount),
      duration: Number(duration),
      status: 'Active',
    };
    setLoans((prev) => [...prev, newLoan]);
  };

  const repayLoan = (id, repayAmount) => {
    setLoans((prev) =>
      prev.map((loan) => {
        if (loan.id === id && loan.status === 'Active') {
          const updatedAmount = loan.amount - Number(repayAmount);
          return {
            ...loan,
            amount: updatedAmount <= 0 ? 0 : updatedAmount,
            status: updatedAmount <= 0 ? 'Paid' : 'Active',
          };
        }
        return loan;
      })
    );
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan, repayLoan }}>
      {children}
    </LoanContext.Provider>
  );
}
