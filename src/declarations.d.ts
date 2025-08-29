declare module 'react-native-sqlite-storage' {
  export interface ResultSet {
    insertId?: number;
    rowsAffected: number;
    rows: {
      length: number;
      item: (index: number) => any;
      raw: () => any[];
    };
  }

  export interface Transaction {
    executeSql: (
      sqlStatement: string,
      args?: any[],
      callback?: (tx: Transaction, resultSet: ResultSet) => void,
      errorCallback?: (tx: Transaction, error: any) => void,
    ) => void;
  }

  export interface SQLiteDatabase {
    transaction(
      callback: (tx: Transaction) => void,
      error?: (err: any) => void,
      success?: () => void,
    ): void;
    executeSql(
      sqlStatement: string,
      args?: any[],
      callback?: (tx: Transaction, resultSet: ResultSet) => void,
      errorCallback?: (tx: Transaction, error: any) => void,
    ): void;
  }

  export function openDatabase(
    params: { name: string; location: 'default' | 'Library' | 'Documents' },
    success?: () => void,
    error?: (err: any) => void,
  ): SQLiteDatabase;

  const SQLite: { openDatabase: typeof openDatabase };
  export default SQLite;
}
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
