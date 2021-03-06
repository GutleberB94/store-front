var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "Fhqwhgads1!",
    database: "bamazonDB"
});

connection.connect(function (err) {

    if (err) throw err;

    promptUser();

});

function promptUser() {

    inquirer.prompt([
        {

            name: "itemID",
            type: "number",
            message: "What is the ID of the item you would like to purchase?"
        },
        {
            name: "itemQuantity",
            type: "number",
            message: "How many do you want to purchase?"

        },
    ])
        .then(function (answer) {

            sqlQueryQuantity(answer.itemID, function (stock) {
                console.log(stock)
                if (answer.itemQuantity > stock) {

                    console.log("Sorry, we do not have enough of that item in stock")
                } else {
                    
                        sqlQueryUpdate(answer.itemID, answer.itemQuantity, function (cost) {

                        console.log("Your Total Cost Is: $" + cost);

                    })

                }
            });
        })
}

function sqlQueryQuantity(id, callback) {

    connection.query(
        "SELECT stock_quantity FROM products WHERE ?",
        {
            item_id: id
        },
        function (err, res) {

            console.log(res[0].stock_quantity)
            callback(res[0].stock_quantity);

        });

}

function sqlQueryUpdate(id, quantity, callback) {

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: - quantity
            },
            {
                item_id: id
            }
        ],
        function (err, res) {

            var cost = quantity + res[0].price;
            console.log(cost)
            callback(cost);

        });

}