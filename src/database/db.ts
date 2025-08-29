import { getDB } from './sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id?: number;
  name: string;
  img: string;
  email: string;
  pass: string;
};

export type Note = {
  id?: number;
  title: string;
  content: string;
  created_at?: string;
};

// ------------------ USERS ------------------

// User Insert
export const addUser = (
  name: string,
  img: string,
  email: string,
  pass: string,
  callback: () => void,
): void => {
  const db = getDB();
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, img, email, pass) VALUES (?,?,?,?)',
      [name, img, email, pass],
      () => callback(),
      (_, error) => {
        console.log('Error inserting user:', error);
        return false;
      },
    );
  });
};

// Login Check
export const loginUser = (
  email: string,
  pass: string,
  callback: (user: User | null) => void,
): void => {
  const db = getDB();
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE email=? AND pass=? LIMIT 1',
      [email, pass],
      async (_, result) => {
        if (result.rows.length > 0) {
          const user = result.rows.item(0) as User;
          // Save Session
          await AsyncStorage.setItem('user', JSON.stringify(user));
          callback(user);
        } else {
          callback(null);
        }
      },
    );
  });
};

// Get Current User (Session)
export const getCurrentUser = async (): Promise<User | null> => {
  const userStr = await AsyncStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Logout User
export const logoutUser = async (): Promise<void> => {
  await AsyncStorage.removeItem('user');
};

// ------------------ NOTES ------------------

// Get Notes
export const getNotes = (callback: (notes: Note[]) => void): void => {
  const db = getDB();
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

// Add Note
export const addNote = (note: Note, callback: () => void): void => {
  const db = getDB();
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO notes (title, content) VALUES (?,?)',
      [note.title, note.content],
      () => callback(),
    );
  });
};

// Update Note
export const updateNote = (note: Note, callback: () => void): void => {
  const db = getDB();
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE notes SET title=?, content=? WHERE id=?',
      [note.title, note.content, note.id],
      () => callback(),
    );
  });
};

// Delete Note
export const deleteNote = (id: number, callback: () => void): void => {
  const db = getDB();
  db.transaction(tx => {
    tx.executeSql('DELETE FROM notes WHERE id=?', [id], () => callback());
  });
};
