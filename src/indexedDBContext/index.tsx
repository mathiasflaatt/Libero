import React, { createContext, useContext } from "react";
import { useIndexedDB } from "./useIndexedDB";

type IndexContext = ReturnType<typeof useIndexedDB>;

const indexDBContext = createContext<IndexContext | undefined>(undefined);

export const useIndexedDBContext = (): IndexContext => {
  const context = useContext(indexDBContext);

  if (!context) {
    throw new Error(
      "useIndexdDBContext() must be used in a component within a IndexedDBContextProvider"
    );
  }
  return context;
};

export const IndexedDBContextProvider: React.FC = ({ children }) => {
  return (
    <indexDBContext.Provider value={useIndexedDB()}>
      {children}
    </indexDBContext.Provider>
  );
};
