import { Request, Response } from "express";
import md5 from 'md5';
// Import the flash middleware
import { flash } from "express-flash";

import User from "../../models/user.model";

import * as generateHelper from '../../helpers/generate.helper';

export const register = (req: Request, res: Response) => {
    res.render("client/pages/users/register", {
        pageTitle: "Đăng ký tài khoản",
    });
}

export const registerPost = async (req: Request & { flash }, res: Response) => {
    const existEmail = await User.findOne({
        email: req.body.email
    });

    if(existEmail){
        //flash
        req.flash("error", "Email đã tồn tại");
        return res.redirect("back");
    }

    const infoUser = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
    }

    const user = new User(infoUser);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    //flash
    req.flash("success", "Đăng ký thành công");
    console.log(user);
    res.redirect('/user/login');
}