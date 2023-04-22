export const dropAdminTable = 'DROP TABLE IF EXISTS Admins';

export const createAdminTable = `CREATE TABLE Admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    adminName VARCHAR(255) NOT NULL,
    admPassword VARCHAR(255) NOT NULL
);`;

export const insertIntoAdminTable = `INSERT INTO Admins (admin_id,adminName,admPassword)
VALUES
    (1, 'Darshan', '1255');`;

export const dropBooksTable = 'DROP TABLE IF EXISTS Books';

export const createBooksTable = `CREATE TABLE Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    publisher VARCHAR(255),
    publish_date DATE,
    price DECIMAL(10, 2)
);`;

export const insertIntoBooksTable = `INSERT INTO Books (book_id, title, author, genre, publisher, publish_date, price)
VALUES
    (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 'Scribner', '1925-04-10', 12.99),
    (2, 'To Kill a Mockingbird', 'Harper Lee', 'Classic', 'J. B. Lippincott & Co.', '1960-07-11', 10.99),
    (3, '1984', 'George Orwell', 'Dystopian', 'Secker & Warburg', '1949-06-08', 8.99),
    (4, 'Animal Farm', 'George Orwell', 'Allegory', 'Secker & Warburg', '1945-08-17', 7.99),
    (5, 'Pride and Prejudice', 'Jane Austen', 'Romance', 'T. Egerton', '1813-01-28', 9.99);`;


export const dropCustomersTable = 'DROP TABLE IF EXISTS Customers';

export const createCustomersTable = `CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(20)
);`;

export const insertIntoCustomersTable = `INSERT INTO Customers (customer_id, name, email, password)
VALUES
    (1, 'John Smith', 'john.smith@example.com', '555-1234'),
    (2, 'Jane Doe', 'jane.doe@example.com', '555-5678'),
    (3, 'Bob Johnson', 'bob.johnson@example.com', '555-9012');`;

export const dropOrder_ItemsTable = 'DROP TABLE IF EXISTS Favs';

export const createOrder_ItemsTable = `CREATE TABLE Favs (
    customer_id INT NOT NULL,
    book_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);`;
        
export const insertIntoOrder_ItemsTable = `INSERT INTO Favs (customer_id, book_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 5);`;