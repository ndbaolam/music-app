import { Request, Response } from "express";
import Song from "../../models/song.model";

export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false
    });

    res.render("client/pages/songs/index", {
        pageTitle: "Songs",
        songs: songs
    });
}