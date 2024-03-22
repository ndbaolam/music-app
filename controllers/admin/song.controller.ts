import { Request, Response } from "express";
import { systemConfig } from "../../config/system";

import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

// [GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false
    });

    res.render("admin/pages/songs/index", {
        pageTitle: "Songs",
        songs: songs
    });
}

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted: false,
        status: "active"
    }).select("title id");

    const singers = await Singer.find({
        deleted: false,
        status: "active"
    }).select("fullName id");
    
    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers
    });
}

export const createPost = async (req: Request & { flash: any }, res: Response) => {
    const song = new Song(req.body);
    await song.save();

    req.flash("success", "Thêm mới bài hát thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}