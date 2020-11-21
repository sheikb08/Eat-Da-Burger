-- Drops/deletes database if already exists -- 
DROP DATABASE IF EXISTS burgers_db;

-- Creates the "burgers_db" database --
CREATE DATABASE burgers_db;

USE burgers_db;

-- Create table 'burgers'
CREATE TABLE burgers(
	id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(50) NOT NULL,
    devoured BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY(id)
);