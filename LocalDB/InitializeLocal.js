import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabaseSync("Health-Tracker.db")

export const dropTable = async () => {
  try {
    await db.execAsync("DROP TABLE IF EXISTS weights;")
    console.log("Weights Table Dropped Successfully.")
  } catch (e) {
    console.error("Error Dropping Table:", e)
  }
}

export const createTable = async () => {
  try {
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS weights (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "weight_lbs REAL NOT NULL, " +
        "weight_kgs REAL NOT NULL, " +
        "date TEXT NOT NULL" +
        ");",
    )
    console.log("Weights Table Created Successfully.")
  } catch (e) {
    console.error("Error Creating Weights Table:", e)
  }
}

export const createUserPrefs = async () => {
  try {
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS userPreferences (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "theme_mode TEXT NOT NULL DEFAULT 'light', " +
        "units TEXT NOT NULL DEFAULT 'lbs', " +
        "filterRange TEXT NOT NULL DEFAULT '7 days'" +
        ");",
    )
    console.log("UserPreferences Table Created Successfully.")

    const result = await db.getFirstAsync(
      "SELECT COUNT(*) as count FROM userPreferences",
    )
    const count = result.count

    if (count === 0) {
      await db.runAsync(
        "INSERT INTO userPreferences (theme_mode, units, filterRange) VALUES ('light', 'lbs', '7 days')",
      )
    } else {
      console.log(
        `User Preferences Table already contains data, ${count} rows. No insert performed.`,
      )
    }
  } catch (e) {
    console.error("Error Creating User Preferences Table:", e)
  }
}

export const fetchUserPrefs = async () => {
  try {
    const user = await db.getFirstAsync("SELECT * FROM userPreferences")
    console.log("User fetched successfully")
    return user || []
  } catch (e) {
    console.error("Error fetching user: ", e)
  }
}

export const updateThemeMode = async theme_mode => {
  try {
    await db.runAsync(
      "UPDATE userPreferences SET theme_mode = ? WHERE id = 1",
      [theme_mode],
    )
    console.log("Theme mode updated successfully: " + theme_mode)
  } catch (e) {
    console.error("Error updating theme mode: ", e)
  }
}

export const updateUnits = async units => {
  try {
    await db.runAsync("UPDATE userPreferences SET units = ?", [units])
    console.log("Units updated successfully: " + units)
  } catch (e) {
    console.error("Error updating units: ", e)
  }
}

export const updateFilterRange = async filterRange => {
  try {
    await db.runAsync("UPDATE userPreferences SET filterRange = ?", [
      filterRange,
    ])
    console.log("FilterRange updated successfully: " + filterRange)
  } catch (e) {
    console.error("Error updating filterRange: ", e)
  }
}

export const fetchWeightsByUnits = async units => {
  try {
    let result = null

    if (units === "lbs") {
      result = await db.getAllAsync("SELECT weight_lbs, date FROM weights")
      console.log("Fetched lbs")
    } else {
      result = await db.getAllAsync("SELECT weight_kgs, date FROM weights")
      console.log("Fetched kgs")
    }

    return result || []
  } catch (e) {
    console.error(`Error fetching ${units}`, e)
    return []
  }
}

export const dateExist = async date => {
  try {
    const result = await db.getFirstAsync(
      "SELECT 1 FROM weights WHERE date = ?",
      [date],
    )
    return result !== null
  } catch (e) {
    console.error("Error checking date:", e)
    return false
  }
}

export const updateWeight = async (date, new_lbs, new_kgs) => {
  try {
    await db.runAsync(
      "UPDATE weights " +
        "SET weight_lbs = ?, weight_kgs = ?" +
        "WHERE date = ?",
      [new_lbs, new_kgs, date],
    )
    console.log("Weight updated successfully for", date)
  } catch (e) {
    console.log("Error updating weight for " + date + " ", e)
  }
}

export const insertWeight = async (lbs, kgs, date) => {
  try {
    await db.runAsync(
      "INSERT INTO weights (weight_lbs, weight_kgs, date) VALUES (?,?,?)",
      [lbs, kgs, date],
    )
    console.log(
      "Weight inserted successfully: " + lbs + "lbs, " + kgs + "kgs, " + date,
    )
  } catch (e) {
    console.error("Error inserting weight: ", e)
  }
}

export const fetchWeights = async () => {
  let statement
  try {
    statement = await db.prepareAsync("SELECT * FROM weights ORDER BY date;")

    const result = await statement.executeAsync()
    const rows = await result.getAllAsync()

    return rows
  } catch (e) {
    console.error("Error fetching weights: ", e)
    return []
  } finally {
    if (statement) {
      await statement.finalizeAsync()
    }
  }
}

export const fetchWeightsAfterDate = async (startDate, endDate) => {
  let statement
  try {
    statement = await db.prepareAsync(
      "SELECT * FROM weights WHERE date >= $startDate AND date <= $endDate ORDER BY date",
    )

    const result = await statement.executeAsync({
      $startDate: startDate,
      $endDate: endDate,
    })
    const allRows = await result.getAllAsync()

    console.log(`Fetched weights between ${startDate} - ${endDate}:`)
    return allRows
  } catch (e) {
    console.error("Error fetching weights.", e)
    return []
  } finally {
    if (statement) {
      await statement.finalizeAsync()
    }
  }
}
