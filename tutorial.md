<!-- ====================== Section Separator ====================== -->
For basic db queries (say find hotel ) we would like to write some logic in the JS/TS only instead of writing db queries.
We should be having flexibility of choosing between db queries and js/ts level logic for simple queries

For doing this ORM/ODM libraries comes into the picture
ORM : Object Relational Mapper ( more in the context of RDBMS)
ODM : Object Document Mapper ( more in the context of document db line mongodb)

Ex : Mongoose is a ORM for mongodb
 Sequelize is a ORM which supports sql , pg sql etc
 Prisma it supports both rdbms and mongo as well

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

<!-- ====================== Section Separator ====================== -->
Folder description 
<!-- ====================== Section Separator ====================== -->

1) Model Folder : inside this we are going to write the ts/js representation (classes) of our tables (ex : hotels has tables like name , booking etc)

2) Seeders Folder : to put dummy or seed (initial data)

3) Migration : used to create the version of db
  v(0) : only name and address
  v(1) : added the landmark etc 


  We are going to revert this sequelize and delete these folders (models , seeders , migration and config.json file) and then
  we are going to create these in a slightly different way



<!-- ====================== Section Separator ====================== -->
Folder Restructuring
<!-- ====================== Section Separator ====================== -->

Create a .sequelizerc file which has some config , which will be picked up by sequelize cli 

file : 

const path = require('path');

module.exports = {
      seedersPath : path.resolve('./src/db/seeders'),
      modelsPath  : path.resolve('./src/db/models'),
      migrationsPath : path.resolve('./src/db/migrations'), 
      config: path.resolve('./src/config/config.ts')
}

Now execute the following commands

1) come out of the src folder (cd ..)
2) npx sequelize-cli init 



<!-- ====================== Section Separator ====================== -->
Completing the config.ts file 
<!-- ====================== Section Separator ====================== -->
1) fill the .env file
PORT = 
DB_USER = root
DB_PASSWORD = 
DB_NAME = airbnb_dev ( or create this db )
DB_HOST = localhost

2) go to index.ts file to setup the configuration
// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
}

type DBConfig ={
    DB_USER: string,
    DB_PASSWORD: string,
    DB_NAME: string,
    DB_HOST: string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001
};

export const dbConfig: DBConfig = {
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_NAME: process.env.DB_NAME || 'test_db',
    DB_HOST: process.env.DB_HOST || 'localhost'
};

3) now go in the config.ts file 
import { dbConfig } from "."

const config = {
  development: {
    username : dbConfig.DB_USER,
    password : dbConfig.DB_PASSWORD,
    database : dbConfig.DB_NAME,
    host     : dbConfig.DB_HOST,
    dialect  : 'mysql',
  },
}

export default config;