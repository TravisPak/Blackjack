const mysql = require ('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mvp'
});

module.exports.addInfo = (username, email, callback) => {
  connection.query(`INSERT INTO users (username, email) VALUES ('${username}', '${email}')`,
  (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result)
    }
  })
}