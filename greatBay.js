const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'dz2bo6sy79',
  database: 'greatBayDB',
});

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
  });


const postProduct = [];

inquirer
  .prompt([
      {
          type: 'list',
          message: 'Would you like to bid or auction item?',
          name: 'choice',
          choices: ['bid','post'],
          validate: checkInput => {
            if (checkInput) {
              return true;
            } else {
              console.log('Bid or post!?')
              return false;
            }
          }
      },
  ])
  .then(userChoice => {
      if (userChoice.choice === 'post') {
          inquirer
              .prompt ([
                  {
                      type: 'input',
                      message: `What are you selling?`,
                      name: 'product',
                      validate: checkInput => {
                          if (checkInput) {
                              return true;
                          } else {
                              console.log(`Please tell us what you are selling!!`)
                              return false;
                          }
                      }
                  },
                  {
                    type: 'list',
                    message: 'Please choose a category',
                    name: 'category',
                    choices: ['home/office', 'electronics', 'outdoor', 'everything else'],
                  },
                  {
                    type: 'input',
                    message: 'What is the starting bid?',
                    name: 'startBid',
                    validate: checkInput => {
                      if (checkInput) {
                        return true;
                      } else {
                        console.log('Please enter a starting bid!!!')
                        return false;
                      }
                    }
                  },
              ])
              .then (postedProduct => {
                  const newProduct = new Product (postedProduct.product + postedProduct.category + postedProduct.startBid);
                  postProduct.push(newProduct)
              })
      } else if (userChoice.choice === 'bid') {
          inquirer
              .prompt ([
                  {
                      type: 'list',
                      message: `Please select what you would like to bid on`,
                      name: 'bidOn',
                      choices: /*this is where the current list of items would go ??? */ [],
                  }
              ])
              .then (userBid => {

              })
            
      } 
  })


