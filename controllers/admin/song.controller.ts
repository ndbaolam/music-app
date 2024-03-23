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
    //console.log(req.body)
    if(req.body.avatar){
        req.body.avatar = req.body.avatar[0];
    }

    if(req.body.audio){
        req.body.audio = req.body.audio[0];
    }

    const song = new Song(req.body);
    await song.save();

    req.flash("success", "Thêm mới bài hát thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}

//[GET] /songs/detail/:idSong
export const edit = async (req: Request, res: Response) => {
    const song = await Song.findOne({
        _id: req.params.idSong
    });

    const topics = await Topic.find({
        deleted: false,
        status: "active"
    }).select("title id");

    const singers = await Singer.find({
        deleted: false,
        status: "active"
    }).select("fullName id");    

    res.render("admin/pages/songs/edit", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers,
        song: song
    });
}

export const editPatch = async (req: Request & { flash: any }, res: Response) => {
    const id = req.params.idSong;

    //console.log(req.body)
    if(req.body.avatar){
        req.body.avatar = req.body.avatar[0];
    }

    if(req.body.audio){
        req.body.audio = req.body.audio[0];
    }

    await Song.updateOne({_id: id}, req.body);

    req.flash("success", "Cập nhật bài hát thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}