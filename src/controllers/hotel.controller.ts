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
