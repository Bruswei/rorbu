// src/context/ServiceContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import {FirebaseRepository} from '../backend/repositories/firebaseRepository';
import {AppService} from '../backend/services/appService';

const ServiceContext = createContext<AppService | null>(null);

interface ServiceProviderProps {
    children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const repository = new FirebaseRepository();
  const service = new AppService(repository);
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};
