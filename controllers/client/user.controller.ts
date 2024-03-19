import { Request, Response } from "express";
import md5 from 'md5';

import User from "../../models/user.model";

import * as generateHelper from '../../helpers/generate.helper';

export const register = (req: Request, res: Response) => {
    res.render("client/pages/users/register", {
        pageTitle: "Đăng ký tài khoản",
    });
}

export const registerPost = async (req: Request, res: Response) => {
    const existEmail = await User.findOne({
        email: req.body.email
    });

    if(existEmail){
        //flash
        return res.redirect("/users/register");
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
    console.log(user);
    res.redirect('back');
}