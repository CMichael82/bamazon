# bamazon

## Trilogy Boot-Camp Assignment 12

### Objective: 
Create an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. The program can also track product sales across departments and then provide a summary of sales/profits by department.

#### Instructions: 
Using node in the command line, enter one of the following files.

View a demo:
[Screencastify Video] https://drive.google.com/file/d/1tJVD5PSPB9XSKdiHX_tuv_oW-_JF1bAI/view

1. bamazonCustomer.js 
	* Displays all of the items available for sale
	* Prompts the customer for a purchase
	* If there is sufficient stock available, display the sale total. Otherwise, notify "Insufficient Quantity!." 

![Alt text](./assets/images/customer.png?raw=true "Customer View")

2. bamazonManager.js
	* If a manager selects "View Products for Sale", the app will list all items available for sale.
	* If a manager selects "View Low Inventory", the app will list all items with an inventory count lower than five.
	* If a manager selects "Add to Inventory", the app displays a prompt that will let the manager "add more" of any item currently in the store.
	* If a manager selects "Add New Product", the app allows the manager to add a completely new product to the store.

![Alt text](./assets/images/manager.png?raw=true "Manager View 1/2")
![Alt text](./assets/images/manager2.png?raw=true "Manager View 2/2")

3. bamazonSupervisor.js
	* If a supervisor selects "View Product Sales by Department", the app displays a summarized table including department overhead, sales, & profits.
	* If a supervisor selects "Create New Department", the app prompts them for new department details.

![Alt text](./assets/images/supervisor.png?raw=true "Supervisor View")

### Technologies Used:
	* mySql
	* Node.js
	* Javascript
	* Inquirer NPM
	* Console Table NPM

### Built Using:
Visual Code

### Authors:
Carolyn Michael