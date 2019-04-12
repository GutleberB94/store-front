var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {

    if (err) throw err;

    promptUser();
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
        .then(function (answer) {

            sqlQueryItem(answer.itemID)

        })

}


function sqlQueryItem(id) {

    connection.query(
        "SELECT * FROM products WHERE id = ?",
        {
            item_id: "id"
        },
        function (err, res) {

        });
}

function sqlQueryQuantity(id) {

    connection.query(
        "SELECT stock_quantity FROM products WHERE item_id = ?",
        {
            item_id: id
        },
        function (err, res) {

            return res;

        });

        return res;
}