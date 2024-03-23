"use strict";
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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const system_1 = require("../../config/system");
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/songs/index", {
        pageTitle: "Songs",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title id");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName id");
    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        req.body.audio = req.body.audio[0];
    }
    const song = new song_model_1.default(req.body);
    yield song.save();
    req.flash("success", "Thêm mới bài hát thành công!");
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield song_model_1.default.findOne({
        _id: req.params.idSong
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title id");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName id");
    res.render("admin/pages/songs/edit", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers,
        song: song
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.idSong;
    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        req.body.audio = req.body.audio[0];
    }
    yield song_model_1.default.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật bài hát thành công!");
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.editPatch = editPatch;
