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
					var total = parseFloat(answer.amount * chosenItem.price);
					var sales = chosenItem.product_sales + total;
					connection.query(
						"UPDATE products SET ?, ? WHERE ?",
						[
							{
								stock_quantity: revisedStock,
							},
							{
								product_sales: sales,
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
				runOptions();
			}
			)
	});
}

function runOptions() {
	inquirer
		.prompt([
			{
				name: "options",
				type: "rawlist",
				message: "What would you like to do next?",
				choices: ["Place Another Order", "Exit"]
			},
		]).then(function (answer) {
			switch (answer.options) {
				case "Place Another Order":
					selectItem();
					break;
				case "Exit":
					exit();
					break;
			}
		})
}

function exit() {
	connection.end();
}
