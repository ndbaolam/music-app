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
exports.suggest = exports.result = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convert_to_slug_helper_1 = require("../../helpers/convert-to-slug.helper");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = `${req.query.keyword}`;
    const slug = (0, convert_to_slug_helper_1.convertToSlug)(keyword);
    const keywordSlugRegex = new RegExp(slug, "i");
    let songs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, 'i');
        songs = yield song_model_1.default.find({
            $or: [
                { title: keywordRegex },
                { slug: keywordSlugRegex }
            ]
        });
        if (songs.length > 0) {
            for (const song of songs) {
                const infoSinger = yield singer_model_1.default.findOne({
                    _id: song.singerId,
                    deleted: false,
                }).select('avatar title singerId like slug');
                song["infoSinger"] = infoSinger;
            }
        }
    }
    res.render("client/pages/search/result", {
        pageTitle: `Kết quả: ${keyword}`,
        keyword: keyword,
        songs: songs
    });
});
exports.result = result;
const suggest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = `${req.params.keyword}`;
    const slug = (0, convert_to_slug_helper_1.convertToSlug)(keyword);
    const keywordSlugRegex = new RegExp(slug, "i");
    const keywordRegex = new RegExp(keyword, 'i');
    const songs = yield song_model_1.default.find({
        $or: [
            { title: keywordRegex },
            { slug: keywordSlugRegex }
        ]
    });
    res.json({
        code: 200,
        message: "Thành công!",
        songs: songs
    });
});
exports.suggest = suggest;
