import SQLite from 'react-native-sqlite-2';

type SQLiteDatabase = ReturnType<typeof SQLite.openDatabase>;
let db: SQLiteDatabase;

export const initDB = (): void => {
  if (db) return; // agar already init hai to dobara mat karo

  db = SQLite.openDatabase('app.db', '1.0', 'App Database', 200000);

  // Tables banani
  db.transaction(tx => {
    // Users Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        img TEXT,
        email TEXT UNIQUE,
        pass TEXT
      );`,
    );

    // Notes Table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  });
};

export const getDB = (): SQLiteDatabase => {
  if (!db) {
    throw new Error('DB not initialized! Call initDB() first.');
  }
  return db;
};
