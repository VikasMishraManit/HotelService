<!-- ====================== Section Separator ====================== -->
For basic db queries (say find hotel ) we would like to write some logic in the JS/TS only instead of writing db queries.
We should be having flexibility of choosing between db queries and js/ts level logic for simple queries

For doing this ORM/ODM libraries comes into the picture
ORM : Object Relational Mapper ( more in the context of RDBMS)
ODM : Object Document Mapper ( more in the context of document db line mongodb)

Ex : Mongoose is a ORM for mongodb
 Sequelize is a ORM which supports sql , pg sql etc
 PRisma it supports both rdbms and mongo as well

 ORM -> interacts with driver library -> then interacts with the database

 ORM : sequelize 
 driver : mysql 2

<!-- ====================== Section Separator ====================== -->
Setting up the connection
<!-- ====================== Section Separator ====================== -->
1) npm install sequelize 
2) npm i mysql2

Now , we will install sequelize cli as dev dependency
3) npm i -D  sequelize-cli

Now , we will be setting up things

1) cd src

2) npx sequelize-cli init 

Sequelize CLI [Node: 22.19.0, CLI: 6.6.3, ORM: 6.37.7]

Created "config/config.json"
Successfully created models folder at "/Users/vikasmishra/Developer/HotelService/src/models".
Successfully created migrations folder at "/Users/vikasmishra/Developer/HotelService/src/migrations".
Successfully created seeders folder at "/Users/vikasmishra/Developer/HotelService/src/seeders".
vikasmishra@Vikass-MacBook-Air src % 

it created config.json file , models folder , migrations folder and seeders folder

