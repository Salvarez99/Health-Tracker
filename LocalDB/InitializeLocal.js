import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("Health-Tracker.db");

export const dropTable = async () => {
  try {
    await db.execAsync("DROP TABLE IF EXISTS weights;");
    console.log("Weights Table Dropped Successfully.");
  } catch (e) {
    console.error("Error Dropping Table:", e);
  }
};

export const createTable = async () => {
  try {
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS weights (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "weight_lbs REAL NOT NULL, " +
        "weight_kgs REAL NOT NULL, " +
        "date TEXT NOT NULL" +
        ");"
    );
    console.log("Weights Table Created Successfully.");
  } catch (e) {
    console.error("Error Creating Weights Table:", e);
  }
};

export const fetchWeightsByUnits = async (units) => {
  try {
    let result = null; // Declare result as a variable (let) instead of a constant (const)

    if (units === "lbs") {
      result = await db.getAllAsync("SELECT weight_lbs, date FROM weights"); 
      console.log("Fetched lbs");
    } else {
      result = await db.getAllAsync("SELECT weight_kgs, date FROM weights"); 
      console.log("Fetched kgs");
    }

    return result || [];
  } catch (e) {
    console.error(`Error fetching ${units}`, e);
    return [];
  }
};


export const dateExist = async (date) => {
  try {
    const result = await db.getFirstAsync(
      "SELECT 1 FROM weights WHERE date = ?",
      [date]
    );
    return result !== null;
  } catch (e) {
    console.error("Error checking date:", e);
    return false;
  }
};

export const updateWeight = async (date, new_lbs, new_kgs) => {
  try {
    await db.runAsync(
      "UPDATE weights " +
        "SET weight_lbs = ?, weight_kgs = ?" +
        "WHERE date = ?",
      [new_lbs, new_kgs, date]
    );
    console.log("Weight updated successfully for", date);
  } catch (e) {
    console.log("Error updating weight for " + date + " ", e);
  }
};

export const insertWeight = async (lbs, kgs, date) => {
  try {
    await db.runAsync(
      "INSERT INTO weights (weight_lbs, weight_kgs, date) VALUES (?,?,?)",
      [lbs, kgs, date]
    );
    console.log(
      "Weight inserted successfully: " + lbs + "lbs, " + kgs + "kgs, " + date
    );
  } catch (e) {
    console.error("Error inserting weight: ", e);
  }
};

export const fetchWeights = async () => {
  try {
    const data = await db.getAllAsync("SELECT * FROM weights;");
    console.log("Fetched from weights.");
    return data || [];
  } catch (e) {
    console.error("Error fetching weights: ", e);
    return [];
  }
};
