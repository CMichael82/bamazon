var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_db"
});

connection.connect(function (err) {
	if (err) throw err;
	runOptions();
})

function runOptions() {
	inquirer
		.prompt({
			name: "action",
			type: "rawlist",
			message: "Which action would you like to take?",
			choices: [
				"View Product Sales by Department",
				"Create New Department",
				"Exit"
			]
		}).then(function (answer) {
			switch (answer.action) {
				case "View Product Sales by Department":
					viewSales();
					break;
				case "Create New Department":
					createDept();
					break;
				case "Exit":
					exit();
					break;
			}
		});
}

function viewSales() {
	connection.query(
		"SELECT d.department_id, d.department_name,d.over_head_costs, SUM(p.product_sales) AS product_sales FROM departments AS d INNER JOIN products AS p ON p.department_name = d.department_name GROUP BY d.department_name",
		function (err, res) {
			if (err) throw err;
			var summary = []
			for (i = 0; i < res.length; i++) {
				var item = [

					res[i].department_id,
					res[i].department_name,
					res[i].over_head_costs,
					res[i].product_sales,
					res[i].product_sales - res[i].over_head_costs

				];
				summary.push(item)
			}
			console.log("\n-------------------\n")
			console.table(["department_id", "department_name", "over_head_costs", "product_sales", "total_profit"], summary);
			runOptions();
		})
}

function createDept() {
	inquirer.prompt([
		{
			type: "input",
			name: "dept",
			message: "Which department would you like to add?"
		},

		{
			type: "input",
			name: "overhead",
			message: "What is the total ($) department overhead cost?",
		},

	]).then(function (newDept) {
		console.log(newDept);
		connection.query(
			"INSERT INTO departments SET ?",
			{
				department_name: newDept.dept,
				over_head_costs: parseFloat(newDept.overhead)
			},
			function (err, res) {
				if (err) throw err;
				console.log("\n" + res.affectedRows + " department added!")
				console.log("\n-----------------------");
				runOptions();
			}
		);
	})
}

function exit() {
	connection.end();
}