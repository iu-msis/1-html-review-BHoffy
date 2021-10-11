CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;

DROP TABLE IF EXISTS books;

CREATE TABLE books (
    Title VARCHAR(300),
    Author VARCHAR(300),
    YearPublished YEAR,
    Publisher VARCHAR(300),
    PageCount INT,
    MSRP VARCHAR(15)
);

INSERT INTO books VALUES
('How to be a Loser','Joe Biden',2021,'Trump Publishing',207,'$0'),
('Larrys Book of Fun','Mike Dudley',1999,'Warner Bros',342,'$500'),
('Art of Deception','Ronald McDonald',1984,'Burger King',324,'$58.23'),
('How to be a Winner','Hawking Steve',1983,'Activision',999,'$68.99');