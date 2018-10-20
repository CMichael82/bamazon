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
	runSearch();
});

function runSearch() {
	inquirer
		.prompt({
			name: "action",
			type: "rawlist",
			message: "What would you like to do?",
			choices: [
				"View Products for Sale",
				"View Low Inventory",
				"Add to Inventory",
				"Add New Product",
				"Exit"
			]
		})
		.then(function (answer) {
			switch (answer.action) {
				case "View Products for Sale":
					forSale();
					break;

				case "View Low Inventory":
					lowInventory();
					break;

				case "Add to Inventory":
					addInventory();
					break;

				case "Add New Product":
					newProduct();
					break;

				case "Exit":
					exit();
					break;
			}
		});
}

function forSale() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("Item ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price + " | Quantity: " + res[i].stock_quantity);
		}
		console.log("\n-----------------------")
		runSearch();
	})
}

function lowInventory() {
	connection.query("SELECT *FROM products WHERE stock_quantity < 5", function (err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("Item ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price + " | Quantity: " + res[i].stock_quantity + "\n");
		}
		console.log("\n-----------------------")
		runSearch();
	})
}

function addInventory() {
	inquirer.prompt([
		{
			type: "input",
			name: "product",
			message: "Which product would you like to adjust (By ID)?"
		},
		{
			type: "input",
			name: "increase",
			message: "What amount is to be added to stock?"
		}
	]).then(function (updatedItem) {
		var adjustment = parseInt(updatedItem.increase);
		connection.query("SELECT * FROM products WHERE ?", { item_id: updatedItem.product }, function (err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
				var adjInventory = adjustment + res[i].stock_quantity;
				console.log("New Adjusted Inventory: " + adjInventory);
				connection.query("UPDATE products SET ? WHERE ?", [
					{
						stock_quantity: adjInventory
					},
					{
						item_id: updatedItem.product
					}
				], function (err, res) {
					if (err) throw err;
					console.log("\n" + res.affectedRows + " product quantity updated!");
					console.log("\n-----------------------")
					runSearch();
				})
			}
		})
	})
}

function newProduct() {
	inquirer.prompt([
		{
			type: "input",
			name: "product",
			message: "Which product would you like to add?"
		},

		{
			type: "input",
			name: "department",
			message: "For which department?",
		},

		{
			type: "input",
			name: "price",
			message: "What is the product's price?",

		},

		{
			type: "input",
			name: "quantity",
			message: "Please enter the quantity to be added"
		}
	]).then(function (newProduct) {
		console.log(newProduct);
		connection.query(
			"INSERT INTO products SET ?",
			{
				product_name: newProduct.product,
				department_name: newProduct.department,
				price: parseFloat(newProduct.price),
				stock_quantity: parseInt(newProduct.quantity)
			},
			function (err, res) {
				console.log("\n" + res.affectedRows + " product inserted!")
				console.log("\n-----------------------");
				runSearch();
			}
		);
	})
}

function exit() {
	connection.end();
}