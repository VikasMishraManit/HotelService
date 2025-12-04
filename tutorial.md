## Need for ORM

For simple Db query , if we could write some js/ts code to interacting with the database. We should have flexibilty that we can write both db queries and or js/ts query.

## Definitions

ORM : Object Relational Mapper ( for rdbms data) .
ODM : Object document mapper (for document data like mongodb)

ORM/ODM is a library which enables us to write db interactions in native language.
These convert this language code into raw db queries.

Some ORMs are : Sequelize , PRISMA (rdbms + mongo also) , TypeORM



## Folder Description

1) Models : here we will write how our database is going to look like .
Example : hotel will have name , address , pincode etc . We will write the
js/ts representation of this thing.

2) Seeders : In this folder we write code to put the dummy/seed data in our tables.
Seed data means initial data.

3) Migrations : It is used to create versions of our db.


## Setup

orm : sequelize
driver : mysql2 ( driver of mysql)
cli : sequelizecli (as dev dependency) 

1) Write a file .sequelizerc file . It has configurations which are picked up by cli
/*
const path = require('path');

module.exports = {
  seedersPath : path.resolve('./src/db/seeders'),
  modelsPath  : path.resolve('./src/db/models'),
  migrationsPath : path.resolve('./src/db/migrations'),
  config : path.resolve('./src/config/config.ts')
}
*/

2) go to main folder cd ..
npx sequelize-cli init

Now folders as per the .sequelizerc file will be created


3) Now setup the config.ts as described


## Setting the config file

1) Import from .env
/*
PORT=3000
DB_USER=root
DB_PASSWORD=sql@12345
DB_NAME=airbnb_dev
DB_HOST=localhost
*/

2) Now go to index.ts and define the type for db config and export it
/*

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
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'hotel_service_dev',
    DB_HOST: process.env.DB_HOST || 'localhost'
};
*/

3) Now change the config.ts file 
/*
import { dbConfig } from './index';

const config = {
  development: {
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database:   dbConfig.DB_NAME,
    host:     dbConfig.DB_HOST,
    dialect: 'mysql',
  }
}

export default config;
*/



## Check whether sequelize is able to connect to db







