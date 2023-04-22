import { 
	createBooksTable, dropBooksTable, insertIntoBooksTable,
	createCustomersTable, dropCustomersTable, insertIntoCustomersTable,
	createOrder_ItemsTable, dropOrder_ItemsTable, insertIntoOrder_ItemsTable,
	createAdminTable, dropAdminTable, insertIntoAdminTable
 } from './sql.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection({
	host:process.env.HOST,
	user:process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
});

const loadAndSaveData = async () => {
	try {
		connection.connect();

		//clear the existing records
		await connection.query(dropOrder_ItemsTable);
		await connection.query(dropCustomersTable)
		await connection.query(dropBooksTable);
		await connection.query(dropAdminTable);
		console.log('***dropped All tables***');

		await connection.query(createBooksTable); 
		await connection.query(createCustomersTable); 
		await connection.query(createOrder_ItemsTable);  
		await connection.query(createAdminTable);      
		console.log('***created All tables***');
        
		await connection.query(insertIntoBooksTable);
		await connection.query(insertIntoCustomersTable);
		await connection.query(insertIntoOrder_ItemsTable);
		await connection.query(insertIntoAdminTable);
		console.log('***All Data saved***');
    
	}catch(err){
		console.error(err);
	}
};

await loadAndSaveData();
process.exit(0);