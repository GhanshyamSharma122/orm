# ORM Project

This project is a simple ORM (Object-Relational Mapping) implementation in Node.js. It provides basic database operations and table management using JavaScript and SQL.

## Project Structure

```
app.js                # Main application entry point
orm.js                # ORM logic and database operations
package.json          # Project metadata and dependencies
config/db.js          # Database configuration
data/createTables.js  # Script to create database tables
data/schemas.sql      # SQL schema definitions
```

## Getting Started

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Configure the database:**
   - Edit `config/db.js` with your database connection details.

3. **Create tables:**
   ```powershell
   node data/createTables.js
   ```

4. **Run the application:**
   ```powershell
   node app.js
   ```

## Features
- Basic ORM functionality
- Table creation from SQL schemas
- Configurable database connection

## License
MIT
