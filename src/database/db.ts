import SQLite from 'react-native-sqlite-2';
import { Note } from '../types';

type SQLiteDatabase = ReturnType<typeof SQLite.openDatabase>;
let db: SQLiteDatabase;

export const initDB = (): void => {
  db = SQLite.openDatabase('notes.db', '1.0', 'Notes Database', 200000);

  db.transaction(tx => {
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

export const getNotes = (callback: (notes: Note[]) => void): void => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM notes ORDER BY created_at DESC',
      [],
      (_, result) => {
        const rows = [];
        for (let i = 0; i < result.rows.length; i++) {
          rows.push(result.rows.item(i));
        }
        callback(rows as Note[]);
      },
    );
  });
};

export const addNote = (note: Note, callback: () => void): void => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO notes (title, content) VALUES (?,?)',
      [note.title, note.content],
      () => callback(),
    );
  });
};

export const updateNote = (note: Note, callback: () => void): void => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE notes SET title=?, content=? WHERE id=?',
      [note.title, note.content, note.id],
      () => callback(),
    );
  });
};

export const deleteNote = (id: number, callback: () => void): void => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM notes WHERE id=?', [id], () => callback());
  });
};
