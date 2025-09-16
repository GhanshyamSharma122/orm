import pool from "../config/db.js";
import fs from "fs"
const createTables=async () => {
    const queryText= fs.readFileSync('./data/schemas.sql').toString()
try {
    pool.query(queryText)
    console.log("tables created if not exists")
} catch (error) {
    console.log("error creating users table",error)
}
}
export default createTables