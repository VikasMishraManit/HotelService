## ⬢ New Section : Need for ORM

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





## ⬢ New Section : Add Rating (New Migrations) to the hotel tables

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




## ⬢ New Section : API to interact with the DB

1) Models layer is going to ensure that whatever is the schema in the db , with respect to the same schema we have a class in js/ts through which we can interact with the db. 
Technically this class is db in js/ts

2) Inside the models folder create a hotel.ts file . Note the hotel which we will create in ts will not be propogated in the db (untill all checks and rest things are done) so its properties like id , createdAt etc will be optional




## ⬢ New Section : Creating the db/models/hotel.ts file

1) Code of the file
```
import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";


class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare location: string;
  declare rating: number;
  declare ratingCount: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: Date;
}
```

2) There is a fundamental problem with this code , how it is going to map with the Hotel table automatically (say if we had one more table with same properties but different name)

3) We have to manually connect it to the desired table. This is done using the Hotel.init() which describes which table to map , and which column to map. 

Note : Whatever rule that are created in db layer ( using the migrations) , ideally they should match with whatever being created in the TS layer like which columns have default assigned , which can take null etc .

4)  We will create a sequelize.ts file in models folder which will have the configuration to tell which table we will have to map to
```
import { Sequelize } from "sequelize";
import { dbConfig } from "../../config";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: dbConfig.DB_HOST, 
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  logging: true
});

export default sequelize;
```

5) Now the Hotel.init({object1} , {object2}) here object1 tells about the column mapping and object2 tells about the table mapping
```
import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./sequelize";


class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare location: string;
  declare rating?: number;
  declare ratingCount?: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Hotel.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    address: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    location: {
      type: "VARCHAR(255)",
      allowNull: false,
    },
    rating: {
      type: "FLOAT",
      defaultValue: 0,
    },
    ratingCount: {
      type: "INTEGER",
      defaultValue: 0,
    },
    createdAt: {
      type: "DATE",
      allowNull: false,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: "DATE",
      allowNull: false,
      defaultValue: new Date(),
    },  

  },
  {
    tableName: "hotels",
    sequelize: sequelize,
    underscored: true,
    timestamps: true,

  });



export default Hotel;
```




## ⬢ New Section : Setting this for testing it.

1) Go to the server.ts file and make the app.listen callback as async and create a hotel there
```
import express from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import v2Router from './routers/v2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import sequelize from './db/models/sequelize';
import Hotel from './db/models/hotel';
const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router); 


/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, async () => {
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    logger.info(`Press Ctrl+C to stop the server.`);

    try{
        await sequelize.authenticate(); // Test the database connection
        logger.info('Database connection has been established successfully.');

        const hotel = await Hotel.create({
            name: 'Test Hotel',
            address: '123 Test St, Test City',
            location: 'Test City Center',
            rating: 4.5,
            ratingCount: 100
        });

        logger.info('Test hotel created:', hotel.toJSON()); 

    } catch (error) {
        logger.error('Error while connecting to the database:', error);
    }
});
```

2) Run npm run dev to confirm it 

3) To create new Hotel , first stop the server (since it has nodemon)

4) To fetch all the hotels in this function . First comment out the hotel creation and then fetch them
```
// to fetch all hotels
        const hotels = await Hotel.findAll();
        logger.info(`Number of hotels in the database: ${hotels.length}`);
```




## ⬢ New Section : Writing the API

1) DTO Layer : From some client (say postman) we will be passing some request body , that is going to have some data of the hotel. Whenever we have to define some object that will be transfered , we define a DTO layer. 
src/dto/hotel.dto.ts
```
export type createHotelDTO = {
  name: string;
  address: string;
  location: string;
  rating?: number;
  ratingCount?: number;
};
```


2) Repository layer : It will have all the db interactions. It will have all the database opeartions (like createHotel , findAllHotels etc). 
src/repositories/hotel.repository.ts

```
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import logger from "../config/logger.config";
import { NotFoundError } from "../utils/errors/app.error";


export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create({
      name: hotelData.name,
      address: hotelData.address,
      location: hotelData.location,
      rating: hotelData.rating,
      ratingCount: hotelData.ratingCount
    })

    logger.info(`Hotel created with ID: ${hotel.id}`);

    return hotel;
}

export async function getHotelById(hotelId: number) {
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
        logger.error(`Hotel with ID: ${hotelId} not found.`);
        throw new NotFoundError(`Hotel with ID: ${hotelId} not found.`);
    }
    logger.info(`Hotel with ID: ${hotelId} retrieved successfully.`);
    return hotel;
}
```

3) Service Layer : It is going to have all the bussiness level logic (ex: "Rating must be between 0 and 5","Hotel name must be unique","Cannot delete a hotel that has active bookings")
src/services/hotel.service.ts
```
import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel, getHotelById } from "../repositories/hotel.repository";



export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    return hotel;
}
```

4) Controller Layer : It handles HTTP request/response, extract data from req, send proper responses. 
src/controllers/hotel.controller.ts
```
import { NextFunction, Request, Response } from "express";
import { createHotelService, getHotelByIdService } from "../services/hotel.service";

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer to create a hotel
    const hotelResponse = await createHotelService(req.body);
    
    // 2. Send the response
    res.status(201).json({
        message: "Hotel created successfully",
        data: hotelResponse,
        success: true
    });
}

// getHotelByIdHandler can be implemented similarly 
 export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) { 
    const hotelId = await getHotelByIdService(Number(req.params.id));
    
    res.status(200).json({
        message: "Hotel retrieved successfully",
        data: hotelId,
        success: true
    }); 
 }

```

5) Routing layer (routers/v1/hotel.router.ts) : It defines API endpoints and map them to controller methods. 
```
import express from 'express';
import { createHotelHandler, getHotelByIdHandler } from '../../controllers/hotel.controller';

const hotelRouter = express.Router();

hotelRouter.post('/', createHotelHandler); // TODO: Resolve this TS compilation issue

hotelRouter.get('/id', getHotelByIdHandler);

export default hotelRouter;
```



6) Validation Layer (src/validators/hotel.validator.ts)
```
import { z } from "zod";

export const hotelSchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    location: z.string().min(1),
    rating: z.number().min(0).optional(),
    ratingCount: z.number().min(0).optional()
})
```

7) Register the routing routers/index.router.ts file
```
import express from 'express';
import pingRouter from './ping.router';
import hotelRouter from './hotel.router';

const v1Router = express.Router();



v1Router.use('/ping',  pingRouter);
v1Router.use('/hotels', hotelRouter);

export default v1Router;
```

8) Add the validation logic in the src/routers/v1/hotel.router.ts
```
import express from 'express';
import { createHotelHandler, getHotelByIdHandler } from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { hotelSchema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post('/', 
  validateRequestBody(hotelSchema),
  createHotelHandler); // TODO: Resolve this TS compilation issue

hotelRouter.get('/id', getHotelByIdHandler);

export default hotelRouter;
```