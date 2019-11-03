CREATE DATABASE db_restaurant;

USE db_restaurant;

CREATE TABLE Customer(
	CustomerID int AUTO_INCREMENT NOT NULL,
	Name varchar(50) NULL,
 CONSTRAINT `PK_Customer` PRIMARY KEY 
(
	`CustomerID` ASC
)
)
;
/*DESCRIBE Customer/**/;        

CREATE TABLE `Item`(
	`ItemID` int AUTO_INCREMENT NOT NULL,
	`Name` varchar(50) NULL,
	`Price` decimal(18, 2) NULL,
 CONSTRAINT `PK_Item` PRIMARY KEY 
(
	`ItemID` ASC
)
)
; 

CREATE TABLE `Order`(
	`OrderID` `bigint` AUTO_INCREMENT NOT NULL,
	`OrderNo` varchar(50) NULL,
	`CustomerID` int NULL,
	`PMethod` varchar(50) NULL,
	`GTotal` decimal(18, 2) NULL,
 CONSTRAINT `PK_Order` PRIMARY KEY 
(
	`OrderID` ASC
)
);

CREATE TABLE `OrderItems`(
	`OrderItemID` `bigint` AUTO_INCREMENT NOT NULL,
	`OrderID` `bigint` NULL,
	`ItemID` int NULL,
	`Quantity` int NULL,
 CONSTRAINT `PK_OrderItems` PRIMARY KEY 
(
	`OrderItemID` ASC
)
)
;
ALTER TABLE `Order`  WITH CHECK ADD  CONSTRAINT FOREIGN KEY (`CustomerID`)
REFERENCES `Customer` (`CustomerID`)
;
ALTER TABLE `Order` CHECK CONSTRAINT `FK_Order_Customer`
;
ALTER TABLE `OrderItems`  WITH CHECK ADD  CONSTRAINT FOREIGN KEY (`ItemID`)
REFERENCES `Item` (`ItemID`)
;
ALTER TABLE `OrderItems` CHECK CONSTRAINT `FK_OrderItems_Item`
;
ALTER TABLE `OrderItems`  WITH CHECK ADD  CONSTRAINT FOREIGN KEY (`OrderID`)
REFERENCES `Order` (`OrderID`)
;
ALTER TABLE `OrderItems` CHECK CONSTRAINT `FK_OrderItems_Order`
;
USE `master`
;
ALTER DATABASE `RestaurantDB` SET  READ_WRITE 
;