import express from 'express';
import {
    countByCity,
    countByType,
    createHotel,
    deletedHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updatedHotel,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREAT

router.post('/', createHotel);

//UPDATE
router.put('/:id', verifyAdmin, updatedHotel);

//DELETE
router.delete('/:id', verifyAdmin, deletedHotel);
//get
router.get('/find/:id', getHotel);
//countByCity
//get
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
//Get All
router.get('/', getHotels);
//get room
router.get('/room/:id', getHotelRooms);

export default router;
