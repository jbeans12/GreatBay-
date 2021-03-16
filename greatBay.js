const mysql = require('mysql');
const inquirer = require('inquirer');
const { up } = require('inquirer/lib/utils/readline');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'yourRootPassword',
  database: 'greatBayDB',
});

const init = () => {
  inquirer
  .prompt([
      {
          type: 'list',
          message: 'Would you like to bid or auction item?',
          name: 'choice',
          choices: ['bid','post'],
          // validate: checkInput => {
          //   if (checkInput) {
          //     return true;
          //   } else {
          //     console.log('Bid or post!?')
          //     return false;
          //   }
          // }
      }
  ])
  .then(userChoice => {
    if (userChoice.choice === 'post') {
      createItem();
    } else if (userChoice.choice === 'bid') {
      readItems();
    }
  })
}
const createItem = () => {
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
              .then((response) => {
                console.log('Inserting a new item...\n');
  const query = connection.query(
    'INSERT INTO bid SET ?',
    {
      postItem: response.product,
      bid: response.startBid,
      category: response.category,
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} item inserted!\n`);
      // Call updateProduct AFTER the INSERT completes
      init();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
              })
  
};
const updateItem = (bid,item) => {
  console.log('Updating bid amount...\n');
  const query = connection.query(
    'UPDATE bid SET ? WHERE ?',
    [
      {
        bid: bid,
      },
      {
        postItem: item,
      },
    ],
  
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} bid updated!\n`);
      // Call readItems AFTER the UPDATE completes
      
    }
    );
}
  const readItems = () => {

    console.log('Selecting all products...\n');

    connection.query('SELECT * FROM bid', (err, res) => {
      
      if (err) throw err;

       inquirer
          .prompt ([
              {
                  type: 'list',
                  message: `Please select what you would like to bid on`,
                  name: 'bidOn',
                  choices() {
                    const  choiceArray = []
                    res.forEach(({
                      postItem
                    }) => {
                      choiceArray.push(postItem)

                    });
                    return choiceArray
                  }
              },
              {
                type: 'input',
                message:`Please place your bid`,
                name:'bidNum',
                
                
              }
            
          ]).then(answer =>{

            console.log(answer)
            
            const test = connection.query(`SELECT bid FROM bid WHERE postItem = "${answer.bidOn}"`,(err,res)=>{

              if (answer.bidNum < res[0].bid) {
              
                console.log('Bid ammount to low')
                
              }else{
                updateItem(answer.bidNum, answer.bidOn)
              }
              
              init()

            })

           


          })
      
    });
  };

  const exit =() =>{

    connection.end();
  }
  
  

// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
  
    init();
    
  })




const postProduct = [];

// inquirer
//   .prompt([
//       {
//           type: 'list',
//           message: 'Would you like to bid or auction item?',
//           name: 'choice',
//           choices: ['bid','post'],
//           validate: checkInput => {
//             if (checkInput) {
//               return true;
//             } else {
//               console.log('Bid or post!?')
//               return false;
//             }
//           }
//       },
//   ])
//   .then(userChoice => {
//       if (userChoice.choice === 'post') {
//           inquirer
//               .prompt ([
//                   {
//                       type: 'input',
//                       message: `What are you selling?`,
//                       name: 'product',
//                       validate: checkInput => {
//                           if (checkInput) {
//                               return true;
//                           } else {
//                               console.log(`Please tell us what you are selling!!`)
//                               return false;
//                           }
//                       }
//                   },
//                   {
//                     type: 'list',
//                     message: 'Please choose a category',
//                     name: 'category',
//                     choices: ['home/office', 'electronics', 'outdoor', 'everything else'],
//                   },
//                   {
//                     type: 'input',
//                     message: 'What is the starting bid?',
//                     name: 'startBid',
//                     validate: checkInput => {
//                       if (checkInput) {
//                         return true;
//                       } else {
//                         console.log('Please enter a starting bid!!!')
//                         return false;
//                       }
//                     }
//                   },
//               ])
//               .then (postedProduct => {
//                   const newProduct = new Product (postedProduct.product + postedProduct.category + postedProduct.startBid);
//                   postProduct.push(newProduct)
//               })
//       } else if (userChoice.choice === 'bid') {
//           inquirer
//               .prompt ([
//                   {
//                       type: 'list',
//                       message: `Please select what you would like to bid on`,
//                       name: 'bidOn',
//                       choices: /*this is where the current list of items would go ??? */ [],
//                   }
//               ])
//               .then (userBid => {

//               })
            
//       } 
//   })



