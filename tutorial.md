### ⬢ New Section : Need for ORM

For simple Db query , if we could write some js/ts code to interacting with the database. We should have flexibilty that we can write both db queries and or js/ts query.

## ⬢ New Section : Definitions

ORM : Object Relational Mapper ( for rdbms data).  
ODM : Object document mapper (for document data like mongodb)

ORM/ODM is a library which enables us to write db interactions in native language.
These convert this language code into raw db queries.

Some ORMs are : Sequelize , PRISMA (rdbms + mongo also) , TypeORM



## ⬢ New Section : Folder Description

1) Models : here we will write how our database is going to look like .
Example : hotel will have name , address , pincode etc . We will write the
js/ts representation of this thing.

2) Seeders : In this folder we write code to put the dummy/seed data in our tables.
Seed data means initial data.

3) Migrations : It is used to create versions of our db.


## ⬢ New Section : Setup

orm : sequelize. 
driver : mysql2 ( driver of mysql). 
cli : sequelizecli (as dev dependency) 

1) Write a file .sequelizerc file . It has configurations which are picked up by cli
```
const path = require('path');

module.exports = {
  seedersPath : path.resolve('./src/db/seeders'),
  modelsPath  : path.resolve('./src/db/models'),
  migrationsPath : path.resolve('./src/db/migrations'),
  config : path.resolve('./src/config/config.js')
}
```

2) go to main folder 
```
cd ..
npx sequelize-cli init
```

Now folders as per the .sequelizerc file will be created


3) Now setup the config.ts as described


## ⬢ New Section : Setting the config file (it is config.js only)

1) Import from .env
```
PORT=3000
DB_USER=root
DB_PASSWORD=sql@12345
DB_NAME=airbnb_dev
DB_HOST=localhost
```

2) Now go to index.ts and define the type for db config and export it
```
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
```

3) Now change the config.js file 
```
import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    dialect: 'mysql',
  }
}

export default config;
```



## ⬢ New Section : Check whether sequelize is able to connect to db

We will try to write a migration. 

Migrations has two parts : up and down. 

Up : contains the code which will make new changes in the db when we run the migrations. 

down : contains the code which will revert the changes made by the migrations


1) sequelize cli can automatically create this for us
```
npx sequelize-cli migration:generate --name create-hotel-table
```
By defualt this will create a js file .


## ⬢ New Section : Changes in the Migration file


1) Create the migration code in the file
```
module.exports = {
  async up (queryInterface) {
   await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS Hotels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
  },

  async down (queryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS Hotels;
    `);
  }
};

```

2) Apply the migration 
```
npx sequelize-cli db:migrate 
```

3) To revert the last migration
```
npx sequelize-cli db:migrate:undo
```



## ⬢ New Section : Converting to typescript

1) For the migrations file ( rename it to .ts)
```
import { QueryInterface } from "sequelize";


export default {
  async up (queryInterface : QueryInterface) {
   await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
  },

  async down (queryInterface : QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS Hotels;
    `);
  }
};
```
2) Change the config.js to db.config.js. and its code to common js
```
const dotenv = require('dotenv');
dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};

module.exports = config;

```


3) Create a new file src/config/sequelize.config.js
```
require('ts-node/register')
const config = require('./db.config')

module.exports = config;
```
In this code this line require('ts-node/register') tells nodejs to dynamically
compile and run the typescript file on the go. So , this file will get converted to .js and then sequelize will be able to make sense of it 

4) Change the .sequelizerc file
```
const path = require('path');

module.exports = {
  seedersPath : path.resolve('./src/db/seeders'),
  modelsPath  : path.resolve('./src/db/models'),
  migrationsPath : path.resolve('./src/db/migrations'),
  config : path.resolve('./src/config/sequelize.config.js')
}
```

In this code this line require('ts-node/register') tells Nodejs to dynamically
compile and run the typescript file on the go. So , this file will get converted to .js and then sequelize will be able to make sense of it 




## ⬢ New Section : Running to confirm

1) Execute this command
```
npx sequelize-cli db:migrate 
```

2) Then in the sql to confirm this 
```
use airbnb_dev;
show tables

desc hotels;
```

3) To revert the last migration
```
npx sequelize-cli db:migrate:undo
```





## ⬢ New Section : Add Rating (New Migartions) to the hotel tables

Let us say now we want to store the rating for our hotels also. Then we can do so by creating a new migration.

1) Create a new migration
```
npx sequelize-cli migration:generate --name add-ratings-hotel-table
```
This is create a new js file . Rename it to a typescript file



2) Add the migrations in the new file created
```
import { QueryInterface } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE Hotels
      ADD COLUMN rating DECIMAL(3,2) DEFAULT 0,
      ADD COLUMN rating_count INT DEFAULT 0;
    `);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE Hotels
      DROP COLUMN rating,
      DROP COLUMN rating_count;
    `);
  }
};

```



## ⬢ New Section : Add script for migrations

1) Install sequelize-cli locally
```
npm install --save-dev sequelize-cli
```

2) Add a migrate script in package.json file (for handy )
```
 "scripts": {
    "start": "ts-node src/server.ts",
    "dev": "nodemon src/server.ts",
    "migrate": "sequelize-cli db:migrate",
    "rollback": "sequelize-cli db:migrate:undo"
  }
```

3) Now the new commands are
```
npm run migrate
```
and
```
npm run rollback
```



