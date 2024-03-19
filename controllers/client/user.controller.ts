import { Request, Response } from "express";
import md5 from 'md5';
// Import the flash middleware
import { flash } from "express-flash";

import User from "../../models/user.model";

import * as generateHelper from '../../helpers/generate.helper';

//[GET] /user/register
export const register = (req: Request, res: Response) => {
    res.render("client/pages/users/register", {
        pageTitle: "Đăng ký tài khoản",
    });
}

//[POST] /user/register
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

    //flash
    req.flash("success", "Đăng ký thành công");
    res.redirect('/user/login');
}

//[GET] /user/login
export const login = (req: Request, res: Response) => {
    res.render("client/pages/users/login", {
        pageTitle: "Đăng nhập",
    });
}

//[POST] /user/login
export const loginPost = async (req: Request & { flash }, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ 
        email: email,
        deleted: false
    });

    if(!user){
        req.flash('error', 'Email not found');
        return res.redirect('back');
    } 

    if(md5(password) !== user.password){
        req.flash('error', 'Password not match');
        return res.redirect('back');
    }

    res.cookie("tokenUser", user.tokenUser);

    req.flash('success', 'Login successful');
    res.redirect('/topics');
}

//[GET] /user/logout
export const logout = (req: Request & { flash }, res: Response) => {
    res.clearCookie('tokenUser');

    req.flash('success', 'Logout successful');
    res.redirect('/topics');
}