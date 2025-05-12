import { createContext, useContext } from "react";
import type { Database } from "../database";

type DatabaseContextType = {
  database: Database | null;
  safelyExecute: <T>(operation: (db: Database) => Promise<T>) => Promise<T>;
  reinitializeDatabase: () => Promise<void>;
};

export const DatabaseContext = createContext<DatabaseContextType>({
  database: null,
  safelyExecute: async () => {
    throw new Error("Database context not initialized");
  },
  reinitializeDatabase: async () => {
    throw new Error("Database context not initialized");
  },
});

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};
