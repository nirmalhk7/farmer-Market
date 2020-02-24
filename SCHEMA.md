# Schema
Tables
- Users
- Items
- ItemSeller
- Cart

## Users
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| username | varchar(10)  | NO   | MUL | NULL    |                |
| password | varchar(25)  | NO   |     | NULL    |                |
| fullname | varchar(20)  | NO   |     | NULL    |                |
| email    | varchar(50)  | NO   |     | NULL    |                |
| role     | varchar(20)  | YES  |     | NULL    |                |
| address  | varchar(100) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+

## Items
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| name        | varchar(20)  | NO   |     | NULL    |                |
| description | varchar(100) | YES  |     | NULL    |                |
| id          | int          | NO   | PRI | NULL    | auto_increment |
| category    | varchar(20)  | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+

## ItemSeller
+--------------+-------------+------+-----+---------+-------+
| Field        | Type        | Null | Key | Default | Extra |
+--------------+-------------+------+-----+---------+-------+
| sellerId     | int         | YES  |     | NULL    |       |
| itemId       | int         | YES  |     | NULL    |       |
| pricePerItem | float(10,2) | YES  |     | NULL    |       |
| unit         | varchar(10) | YES  |     | NULL    |       |
| quantity     | int         | YES  |     | NULL    |       |
+--------------+-------------+------+-----+---------+-------+

## Cart
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| userid     | int         | YES  |     | NULL    |                |
| itemno     | int         | YES  |     | NULL    |                |
| sellerid   | int         | YES  |     | NULL    |                |
| quantity   | int         | YES  |     | NULL    |                |
| itemStatus | varchar(20) | YES  |     | NULL    |                |
| price      | varchar(10) | YES  |     | NULL    |                |
| id         | int         | NO   | PRI | NULL    | auto_increment |
+------------+-------------+------+-----+---------+----------------+
