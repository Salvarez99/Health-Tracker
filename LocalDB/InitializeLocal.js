import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('Health-Tracker.db');

export const createTable = async () => {
  console.log('before');
  await db.execSync( 'CREATE TABLE IF NOT EXISTS weights (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'weight_lbs INTEGER NOT NULL, ' + 
      'weight_kgs INTEGER NOT NULL, ' +
      'date TEXT NOT NULL' +
    ');'
  );
  console.log('after');
};

export const insertWeight = async () =>{
  await db.runSync('INSERT INTO weights (weight_lbs, weight_kgs, date) VALUES (?,?,?)', 120, 100, 'June 10,2024');
};