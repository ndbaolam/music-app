import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

//[GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
    const slugTopic: string = req.params.slugTopic;

    const topic = await Topic.findOne({
        slug: slugTopic,
        deleted: false,
        status: "active"
    });

    const songs = await Song.find({
        topicId: topic.id,
        deleted: false,
        status: "active"
    }).select('avatar title singerId like slug');

    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        });
        song["infoSinger"] = infoSinger;
    }

    res.render("client/pages/songs/list", {
        pageTitle: topic.title,
        songs: songs
    });
}

//[GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {  
    const slugSong = req.params.slugSong;

    const song = await Song.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    });

    const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
    }).select('fullName');

    const topic = await Topic.findOne({
        _id: song.topicId,
        deleted: false,
    })

    const userId: string = res.locals.user ? res.locals.user.id : "";
    console.log(userId);

    const favoriteSong = await FavoriteSong.findOne({
        userId: userId,
        songId: song.id
    });
    
    song["isFavoriteSong"] = favoriteSong ? true : false;

    res.render("client/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
}

//[PATCH] /songs/like/:type/:idSong
export const like = async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong;
    const type: string = req.params.type;

    const song = await Song.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });

    let updateLike: number = song.like;

    updateLike = (type === "yes") ? ++updateLike : --updateLike;

    await Song.updateOne({
        _id: idSong,
    }, {
        like: updateLike
    });

    res.json({
        code: 200,
        message: "Thành công!",
        like: updateLike
    });
}

// [PATCH] /songs/favorite/:type/:idSong
export const favorite = async (req: Request, res: Response) => {
    const idSong: string = req.params.idSong;
    const type: string = req.params.type;
    const userId: string = res.locals.user.id;
  
    if(type == "yes") {
      const existRecord = await FavoriteSong.findOne({
        userId: userId,
        songId: idSong,
      });
  
      if(!existRecord) {
        const record = new FavoriteSong({
          userId: userId,
          songId: idSong,
        });
        await record.save();
      }
    } else {
      await FavoriteSong.deleteOne({
        userId: userId,
        songId: idSong
      });
    }
  
    res.json({
      code: 200,
      message: "Thành công!"
    });
}