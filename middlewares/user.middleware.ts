import { Request, Response, NextFunction } from "express";

import User from "../models/user.model";

export const infoUser = async (req: Request, res: Response, next: NextFunction) => {
    if(req.cookies.tokenUser){
        const user = await User.findOne({ 
            token: req.cookies.tokenUser
        }).select('-password');

        res.locals.user = user;
    }
    next();
}
