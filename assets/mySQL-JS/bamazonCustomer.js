var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_db"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	afterConnection();
});

function afterConnection() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("Item ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price);
		}
		console.log("-----------------------------------");
		selectItem();
	});
}

function selectItem() {
	connection.query("SELECT * FROM products", function (err, results) {
		if (err) throw err;
		inquirer
			.prompt([
				{
					name: "choice",
					type: "input",
					message: "Which item would you like to purchase (by ID)?"
				},
				{
					name: "amount",
					type: "input",
					message: "How many would you like to buy?"
				}
			]).then(function (answer) {
				var chosenItem;
				for (var i = 0; i < results.length; i++) {
					if (results[i].item_id === parseInt(answer.choice)) {
						chosenItem = results[i];
						// console.log(results[i].product_name);
						// console.log(answer.amount);
					}
				}
				if (chosenItem.stock_quantity > parseInt(answer.amount)) {
					var revisedStock = chosenItem.stock_quantity - answer.amount;
					var total = answer.amount * chosenItem.price;
					connection.query(
						"UPDATE products SET ? WHERE ?",
						[
							{
								stock_quantity: revisedStock
							},
							{
								item_id: chosenItem.item_id
							}
						],
						function (error) {
							if (error) throw err;
						}
					);
					console.log("Your Order for " + answer.amount + " " + chosenItem.product_name + " has been processed! Your total is: $" + total);
					// console.log("Inventory has been adjusted. The new stock quantity is: " + revisedStock);
				}
				else {
					console.log("Insufficient quantity!");
				}
				connection.end();
			}
			)
	});
}