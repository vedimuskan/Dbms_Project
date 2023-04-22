import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import ejs from 'ejs';
import bodyParser from 'body-parser';
dotenv.config();

const connection = await mysql.createConnection({
	host:process.env.HOST,
	user:process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
});

let customer = 0;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
connection.connect();

app.get('/',async (req,res)=>{
	res.render("home");
});

app.post('/bookstore',async (req,res)=>{
	const retVal = {};
	try {
		const query = `SELECT * FROM BOOKS WHERE title = '${req.body.search}'`;
		const [rows] = await connection.query(query);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		res.render("err",{msg:error,red : "/bookstore",btnName:"Retry"});
	}finally{
		res.render("bookstore",{data:retVal.data});
	}
})

app.get('/bookstore/:id',async (req,res)=>{
	const retVal = {};
	try {
		const query = `call bookstore.gener_func('${req.params.id}');`;
		const [rows] = await connection.query(query);
		retVal.data = rows[0];
	} catch (error) {
		console.error(error);
		retVal.error = error;
		res.render("err",{msg:error,red : "/bookstore",btnName:"Retry"});
	}finally{
		res.render("bookstore",{data:retVal.data});
	}
});

app.get('/favs',async function(req,res){
	const retVal = {};
	try {
		const query = `call bookstore.find_fav(${customer});`;
		const [rows] = await connection.query(query);
		const q2 = `select bookstore.get_sum(${customer});`
		const sum = await connection.query(q2);
		retVal.data = rows[0];
		retVal.sum = sum[0][0][`bookstore.get_sum(${customer})`];
	} catch (error) {
		console.error(error);
		retVal.error = error;
		res.render("err",{msg:error,red : "/bookstore",btnName:"Retry"});
	}finally{
		res.render("favs",{data:retVal.data, sum: retVal.sum});
	}
});

app.get('/fav/:id', async(req,res)=>{
	const query = `Insert into favs (customer_id,book_id) values (${customer},${req.params.id})`;
	await connection.query(query);

	res.redirect('/bookstore');
});

app.post('/fav/:id', async(req,res)=>{
	const query = `delete from favs where book_id=${req.params.id} and customer_id = ${customer};`;
	await connection.query(query);

	res.redirect('/favs');
});

app.get("/register",function(req,res){
    res.render("register");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/register",async function(req,res){
	let status = 200;
	let retVal = {};

	try {
		const query = `INSERT INTO CUSTOMERS (name,email,password) VALUES ("${req.body.username}","${req.body.email}","${req.body.password}")`;
		const [rows] = await connection.query(query);
		retVal.data = rows;
		customer = rows.insertId;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.redirect("/bookstore");
	}
});

app.post("/login",async (req,res)=>{

	const id = req.body.username;

	const query = 'SELECT * FROM CUSTOMERS WHERE name=?';
	const [rows] = await connection.query(query, [id]);

	customer = rows[0].customer_id;

	if(rows[0]){
	    if(rows[0].password===req.body.password){
			res.redirect("/bookstore");
		}
		else{
			res.render("err",{msg:"Please check your password",red : "/login",btnName:"Login"});
		}
	}
	else{
		res.render("err",{msg:"Please Register First!!",red : "/register",btnName:"Register"})
	}

});

app.get('/admin/books',async (req,res)=>{
	res.render("admlogin");
});

app.post('/admin/books',async (req,res)=>{
	const id = req.body.username;

	const query = 'SELECT * FROM ADMINS WHERE adminName=?';
	const [rows] = await connection.query(query, [id]);

	if(rows[0]){
	    if(rows[0].admPassword===req.body.password){
			res.redirect("/admin/dashboard/book");
		}
		else{
			res.render("err",{msg:"Please check your password",red : "/admin/books",btnName:"Admin Login"});
		}
	}
	else{
		res.render("err",{msg:"You are not admin!!",red : "/",btnName:"Home"})
	}
})

app.get('/admin/dashboard/book',async (req,res)=>{
	res.render('adminOps');
});

app.get('/admin/dashboard/addbook',async (req,res)=>{
	res.render('bookForm', {title:"Add Book", action:"/admin/dashboard/addbook",btn:"publish"});
});

app.get('/admin/dashboard/removebook',async (req,res)=>{
	res.render('bookrForm', {title:"Remove Book", action:"/admin/dashboard/removebook",btn:"Remove"});
});

app.get('/admin/dashboard/addadmin',async (req,res) => {
	res.render('addadmin');
});

let count = 0;
app.get('/sort',async (req,res)=>{
	let retVal = {};

	if(count===0){
		count++;
		count %= 3;
		try {
			const query = 'SELECT * FROM Books ORDER BY price';
			const [rows] = await connection.query(query);
			retVal.data = rows;
		} catch (error) {
			console.error(error);
			retVal.error = error;
			res.render("err",{msg:error,red : "/bookstore",btnName:"Retry"});
		}finally{
			res.render("bookstore",{data:retVal.data});
		}
	}
	else if(count===1){
		count++;
		count %= 3;
		try {
			const query = 'SELECT * FROM Books ORDER BY price DESC';
			const [rows] = await connection.query(query);
			retVal.data = rows;
		} catch (error) {
			console.error(error);
			retVal.error = error;
			res.render("err",{msg:error,red : "/bookstore",btnName:"Retry"});
		}finally{
			res.render("bookstore",{data:retVal.data});
		}
	}
	else{
		count++;
		count %= 3;
		try {
			const query = 'SELECT * FROM Books';
			const [rows] = await connection.query(query);
			retVal.data = rows;
		} catch (error) {
			console.error(error);
			retVal.error = error;
			res.render("err",{msg:error,red : "/bookstore",btnName:"Retry"});
		}finally{
			res.render("bookstore",{data:retVal.data});
		}
	}
})

app.post('/admin/dashboard/addadmin',async (req,res) => {
	const name = req.body.message;
	const pswd = req.body.password;
	
	try{
		const query = `INSERT INTO ADMINS (adminName,admPassword) VALUES ("${name}","${pswd}");`;
		const [rows] = await connection.query(query);
	}catch(err){
		console.error(err);
	}finally{
		res.redirect('/admin/dashboard/book');
	}
});

app.post('/admin/dashboard/removebook',async (req,res)=>{
	const bookName = req.body.message;
	
	try{
		const query = `DELETE FROM BOOKS WHERE title=?`;
		const [rows] = await connection.query(query,[bookName]);
	}catch(err){
		console.error(err);
	}finally{
		res.redirect('/admin/dashboard/book');
	}
});

app.post('/admin/dashboard/addbook', async (req, res) => {
	let status = 200;
	let retVal = {};

	try {
		const query = `INSERT INTO BOOKS (title,author, genre, publisher, publish_date, price) VALUES ("${req.body.message}","${req.body.author}","${req.body.genre}","${req.body.publisher}","${req.body.publish_date}","${req.body.price}")`;
		const [rows] = await connection.query(query);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		status = 500;
	}finally{
		res.redirect("/admin/dashboard/book");
	}
});

app.get('/bookstore',async (req,res)=>{
	let retVal = {};

	try {
		const query = 'SELECT * FROM Books';
		const [rows] = await connection.query(query);
		retVal.data = rows;
	} catch (error) {
		console.error(error);
		retVal.error = error;
		res.render("err",{msg:error,red : "/bookstore",btnName:"Retry"});
	}finally{
		res.render("bookstore",{data:retVal.data});
	}
});

app.listen(5000, () => {
	console.log('App is running');
});