import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  nameId: string | null;
  setNameId: (id: string | null) => void;
  loading:boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [nameId, setNameId] = useState<string | null>(null);
  const [loading, setloading] = useState(true);



  useEffect(() => {
    const storedNameId = localStorage.getItem('nameid');
    if (storedNameId) {
      setNameId(storedNameId);
    }
    setloading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ nameId, setNameId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
