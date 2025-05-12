import { type ReactNode, useEffect, useRef, useState } from "react";
import { DatabaseContext } from "./DatabaseContext";
import { closeDatabase, createDatabase } from "../database";
import type { Database } from "../../types";

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [database, setDatabase] = useState<Database | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializingRef = useRef(false);

  const initDatabase = async () => {
    if (initializingRef.current) {
      return;
    }

    initializingRef.current = true;
    setIsLoading(true);

    try {
      if (database && (database.destroyed || !database.collections)) {
        await closeDatabase();
        setDatabase(null);
      }

      if (!database) {
        const db = await createDatabase();

        if (!db || db.destroyed) {
          throw new Error("Could not create a valid database");
        }

        setDatabase(db);
      }

      setError(null);
    } catch (error: unknown) {
      console.error("Database initialization error:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
      setDatabase(null);
    } finally {
      setIsLoading(false);
      initializingRef.current = false;
    }
  };

  useEffect(() => {
    initDatabase();

    return () => {
      if (database && !database.destroyed) {
        closeDatabase().catch((err) =>
          console.error("Error closing database on unmount:", err),
        );
      }
    };
  }, []);

  const handleDatabaseError = async (error: Error) => {
    if (error && "code" in error && error.code === "COL21") {
      console.log("Detected closed collection, reinitializing database...");
      await initDatabase();
    }
  };

  const contextValue = {
    database,
    safelyExecute: async <T,>(
      operation: (db: Database) => Promise<T>,
    ): Promise<T> => {
      if (!database || database.destroyed) {
        await initDatabase();

        if (!database) {
          throw new Error("Database not available");
        }
      }

      try {
        return await operation(database);
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        await handleDatabaseError(err);
        throw err;
      }
    },
    reinitializeDatabase: initDatabase,
  };

  if (error) {
    return <div>Database Error {JSON.stringify(error)}</div>;
  }

  if (isLoading || !database) {
    return <div>Initializing database...</div>;
  }

  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};
