import express from 'express';
import {
    createRoom,
    deletedRoom,
    deletedRooms,
    getRoom,
    getRooms,
    updatedRoom,
    updateRoomAvailability,
} from '../controllers/Room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREAT

router.post('/:hotelid', verifyAdmin, createRoom);

//UPDATE
router.put('/:id', verifyAdmin, updatedRoom);
router.put('/availability/:id', updateRoomAvailability);
//delete All
router.delete('/deleteAll', deletedRooms);
//DELETE
router.delete('/:id/:hotelid', verifyAdmin, deletedRoom);
//get
router.get('/:id', getRoom);
//Get All
router.get('/', getRooms);

export default router;
