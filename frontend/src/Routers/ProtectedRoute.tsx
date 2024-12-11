import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Global/Context';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { nameId, loading } = useAuth();


  if(loading)   {
    return <div>loading....</div>;
  }

  if (!nameId) {
    return <Navigate to="/LoginPage" replace/>;
  }

  return children;
};

export default ProtectedRoute;
