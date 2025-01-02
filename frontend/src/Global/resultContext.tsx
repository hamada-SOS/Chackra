import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ContesttDetails, SubmissionResult } from '../Problem';

interface GlobalStateContextType {
  result: SubmissionResult | null;
  setResult: React.Dispatch<React.SetStateAction<SubmissionResult | null>>;
  teamBProgress: number
  setteamBProgress : React.Dispatch<React.SetStateAction<number>>;
  teamAProgress: number
  setteamAProgress : React.Dispatch<React.SetStateAction<number>>;
  contestDetails: ContesttDetails | null;
  setContestDetails:  React.Dispatch<React.SetStateAction<ContesttDetails | null>>
}

const resultContext = createContext<GlobalStateContextType | undefined>(undefined);

export const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [teamBProgress, setteamBProgress] = useState<number>(0)
  const [teamAProgress, setteamAProgress] = useState<number>(0)
  const [contestDetails, setContestDetails] = useState<ContesttDetails | null>(null);


  const incrementTeamAProgress = (value: number) => {
    setteamAProgress((prev) => prev + value);
  };

  const incrementTeamBProgress = (value: number) => {
    setteamBProgress((prev) => prev + value);
  };
  

  return (
    <resultContext.Provider value={{ result, setResult , teamBProgress, setteamBProgress, teamAProgress, setteamAProgress,contestDetails, setContestDetails}}>
      {children}
    </resultContext.Provider>
  );
};

export const useResultContext = () => {
  const context = useContext(resultContext);
  if (!context) throw new Error('useGlobalState must be used within a GlobalStateProvider');
  return context;
};
