import jwt from 'jsonwebtoken';
import { creatError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(creatError(401, 'You are authenticated!'));
    }

    jwt.verify(token, process.env.jwt, (err, user) => {
        if (err) return next(creatError(403, 'Token is not valid'));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    console.log('token', req.cookies.access_token);
    verifyToken(req, res, () => {
        console.log('request', req.user);
        if (req.user?.id === req.params.id || req.user?.isAdmin) {
            next();
        } else {
            return next(creatError(403, 'You are not authenticated'));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    // console.log(req.user)
    verifyToken(req, res, () => {
        // this above callback is NEXT parameter
        if (req.user?.isAdmin) {
            //next nay la tham so thu 3 cua verifyAdmin
            next();
        } else {
            return next(creatError(403, 'You are not admin'));
        }
    });
};
