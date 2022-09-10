import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import { creatError } from '../utils/error.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
    // try {
    //     const savedRoom = await newRoom.save();
    //     console.log(savedRoom);
    //     try {
    //         await hotelId.findByIdAndUpdate(hotelId, {
    //             $push: { rooms: savedRoom._id },
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    //     res.status(200).json(savedRoom);
    // } catch (error) {
    //     next(error);
    // }
};

//update
export const updatedRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
};

export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            {
                'roomNumber._id': req.params.id,
            },
            {
                $push: {
                    'roomNumber.$.unavailableDates': req.body.dates,
                },
            },
        );
        res.status(200).json('Room status has been updated.');
    } catch (error) {
        next(error);
    }
};

//delete
export const deletedRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);

        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
            const deletedHotel = await Hotel.findById(hotelId);
            res.status(201).json(deletedHotel);
        } catch (err) {
            next(err);
        }
    } catch (error) {
        next(error);
    }
};
//get
export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

//get all
export const getRooms = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const rooms = await Room.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        }).limit(req.query.limit);
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};

export const deletedRooms = async (req, res, next) => {
    console.log('delete all');
    try {
        await Room.deleteMany({});
        res.send('deleted All');
    } catch (err) {
        console.log('err');
        next(err);
    }
};
