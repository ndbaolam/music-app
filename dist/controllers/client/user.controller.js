"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const generateHelper = __importStar(require("../../helpers/generate.helper"));
const register = (req, res) => {
    res.render("client/pages/users/register", {
        pageTitle: "Đăng ký tài khoản",
    });
};
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existEmail = yield user_model_1.default.findOne({
        email: req.body.email
    });
    if (existEmail) {
        req.flash("error", "Email đã tồn tại");
        return res.redirect("back");
    }
    const infoUser = {
        email: req.body.email,
        fullName: req.body.fullName,
        password: (0, md5_1.default)(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
    };
    const user = new user_model_1.default(infoUser);
    yield user.save();
    req.flash("success", "Đăng ký thành công");
    res.redirect('/user/login');
});
exports.registerPost = registerPost;
const login = (req, res) => {
    res.render("client/pages/users/login", {
        pageTitle: "Đăng nhập",
    });
};
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req.flash('error', 'Email not found');
        return res.redirect('back');
    }
    if ((0, md5_1.default)(password) !== user.password) {
        req.flash('error', 'Password not match');
        return res.redirect('back');
    }
    res.cookie("tokenUser", user.tokenUser);
    req.flash('success', 'Login successfull');
    res.redirect('/topics');
});
exports.loginPost = loginPost;
const logout = (req, res) => {
    res.clearCookie('tokenUser');
    req.flash('success', 'Logout successful');
    res.redirect('/topics');
};
exports.logout = logout;
const profile = (req, res) => {
    res.render("client/pages/users/profile", {
        pageTitle: "Thông tin tài khoản",
    });
};
exports.profile = profile;
