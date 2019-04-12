var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user:  "root",

    password: "",
    database: "bamazonDB"
});


function promptUser() {

    inquirer.prompt(
        {

            name: "itemID",
            type: "number",
            message: "What is the ID of the item you would like to purchase?"
        },
        {
            name: "itemQuantity",
            type: "number",
            message: "How many do you want to purchase?"

        })
        .then(function(answer) {







        })

} 


function sqlQuery(id, quantity) {




}