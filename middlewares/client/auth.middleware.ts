import { Request, Response, NextFunction } from "express";

import User from "../../models/user.model";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.cookies.tokenUser) {
      res.redirect("/user/login");
    } else {
      const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false,
      }).select("-password");
  
      if(!user) {
        res.redirect("/user/login");
      } else {
        res.locals.infoUser = user;
        
        next();
      }
    }
  } catch (error) {
    res.json(error);
  }
}