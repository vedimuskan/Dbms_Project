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
    (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 'Scribner', '1925-04-10', 12),
    (2, 'To Kill a Mockingbird', 'Harper Lee', 'Classic', 'J. B. Lippincott & Co.', '1960-07-11', 10),
    (3, '1984', 'George Orwell', 'Dystopian', 'Secker & Warburg', '1949-06-08', 8),
    (4, 'Animal Farm', 'George Orwell', 'Allegory', 'Secker & Warburg', '1945-08-17', 7),
    (5, 'Pride and Prejudice', 'Jane Austen', 'Romance', 'T. Egerton', '1813-01-28', 9),
    (6, 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 'Houghton Mifflin', '1937-09-21', 15),
    (7, 'The Da Vinci Code', 'Dan Brown', 'Thriller', 'Doubleday', '2003-03-18', 13),
    (8, 'Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 'Fantasy', 'Bloomsbury', '1997-06-26', 9),
    (9, 'The Hitchhiker''s Guide to the Galaxy', 'Douglas Adams', 'Science Fiction', 'Pan Books', '1979-10-12', 11),
    (10, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 'Mystery', 'Norstedts Förlag AB', '2005-08-01', 14),
    (11, 'A Game of Thrones', 'George R.R. Martin', 'Fantasy', 'Bantam Books', '1996-08-01', 12),
    (12, 'The Hunger Games', 'Suzanne Collins', 'Dystopian', 'Scholastic Press', '2008-09-14', 10),
    (13, 'Animal Farm', 'George Orwell', 'Political Satire', 'Secker and Warburg', '1945-08-17', 8),
    (14, 'The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 'Allen & Unwin', '1954-07-29', 19),
    (15, 'Brave New World', 'Aldous Huxley', 'Science Fiction', 'Chatto & Windus', '1932-01-01', 7),
    (16, 'The Fellowship of the Ring', 'J.R.R. Tolkien', 'Fantasy', 'Houghton Mifflin', '1954-01-01', 17.99),
    (17, 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 'Fantasy', 'Geoffrey Bles', '1950-01-01', 12.99),
    (18, 'Eragon', 'Christopher Paolini', 'Fantasy', 'Knopf Books for Young Readers', '2002-01-01', 9.99),
    (19, 'The Name of the Wind', 'Patrick Rothfuss', 'Fantasy', 'DAW Books', '2007-01-01', 11.99),
    (20, 'The Eye of the World', 'Robert Jordan', 'Fantasy', 'Tor Books', '1990-01-01', 14.99),
    (21, 'Mistborn: The Final Empire', 'Brandon Sanderson', 'Fantasy', 'Tor Books', '2006-01-01', 13.99),
    (22, 'The Lies of Locke Lamora', 'Scott Lynch', 'Fantasy', 'Gollancz', '2006-01-01', 12.99),
    (23, 'The Blade Itself', 'Joe Abercrombie', 'Fantasy', 'Gollancz', '2006-01-01', 10.99),
    (24, 'The Way of Kings', 'Brandon Sanderson', 'Fantasy', 'Tor Books', '2010-01-01', 16.99),
    (25, 'Gardens of the Moon', 'Steven Erikson', 'Fantasy', 'Bantam Books', '1999-01-01', 11.99);`;


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