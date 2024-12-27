import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SubmissionResult } from '../Problem';

interface GlobalStateContextType {
  result: SubmissionResult | null;
  setResult: React.Dispatch<React.SetStateAction<SubmissionResult | null>>;
}

const resultContext = createContext<GlobalStateContextType | undefined>(undefined);

export const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<SubmissionResult | null>(null);

  return (
    <resultContext.Provider value={{ result, setResult }}>
      {children}
    </resultContext.Provider>
  );
};

export const useResultContext = () => {
  const context = useContext(resultContext);
  if (!context) throw new Error('useGlobalState must be used within a GlobalStateProvider');
  return context;
};
