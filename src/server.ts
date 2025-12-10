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

        

        // const hotel = await Hotel.create({
        //     name: 'Hotel California',
        //     address: '42 Sunset Boulevard',
        //     location: 'Los Angeles, CA',
        //     rating: 4.5,
        //     ratingCount: 120
        // });

        // logger.info('Test hotel created:', hotel.toJSON()); 

        // tp fetch all hotels
        const hotels = await Hotel.findAll();
        logger.info(`Number of hotels in the database: ${hotels.length}`);

    } catch (error) {
        logger.error('Error while connecting to the database:', error);
    }
});
