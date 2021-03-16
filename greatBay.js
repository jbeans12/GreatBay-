const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'greatBayDB',
});

const createItem = () => {
  console.log('Inserting a new item...\n');
  const query = connection.query(
    'INSERT INTO bid SET ?',
    {
      postItem: 'user input',
      bid: 'user input',
      category: 'user input',
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} item inserted!\n`);
      // Call updateProduct AFTER the INSERT completes
      readItems();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
};
const updateItem = () => {
  console.log('Updating bid amount...\n');
  const query = connection.query(
    'UPDATE bid SET ? WHERE ?',
    [
      {
        bid: 'user input',
      },
      {
        postItem: 'user input',
      },
    ],
  
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} bid updated!\n`);
      // Call readItems AFTER the UPDATE completes
      readItems();
    }
    );
}
  const readItems = () => {
    console.log('Selecting all products...\n');
    connection.query('SELECT * FROM bid', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      
    });
  };

  const exit =() =>{

    connection.end();
  }
  
  

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    createItem();
    
  })