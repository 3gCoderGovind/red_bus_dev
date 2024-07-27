const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust this based on your needs
  host: 'localhost', // Replace with your host name
  user: 'root', // Replace with your database username
  password: 'Admin@1234', // Replace with your database password
  database: 'red_bus' // Replace with your database name
});

const mysql_connect = async (query, values=null) => {
  return new Promise((resolve, reject) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool:', err.stack);
        reject('Error getting connection from pool: ' + err.stack);
        return;
      }
      console.log('Connected to the database as id', connection.threadId);

      // Execute the query
      connection.query(query, values, (error, result) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          console.error('Error executing query:', error.stack);
          reject('Error executing query: ' + error.stack);
          return;
        }

        // Resolve the result
        resolve(result);
      });
    });
  });
};

module.exports = { mysql_connect };
