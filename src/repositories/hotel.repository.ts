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