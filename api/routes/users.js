import express from 'express';
import { createUser, deletedUser, getUsers, updatedUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/checkauthentication', verifyToken, (req, res, next) => {
    res.send('Hello user,you are logged in');
});

router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send('Hello user,you are logged in');
});

router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send('Hello Admin, you are logged in and you can delete all accoungts');
});
//UPDATE
router.put('/:id', verifyUser, updatedUser);

//DELETE
router.delete('/:id', deletedUser);

//get
router.get('/:id', verifyUser, getUsers);

//Get All
router.get('/', getUsers);

export default router;
