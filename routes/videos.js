const express = require("express");
const router = express.Router();
const fs = require("fs");
const filePath = "./data/videos.json";
const { v4: uuid } = require("uuid");

const readFile = () => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

const writeFile = (fileData) => {
  fs.writeFileSync(filePath, JSON.stringify(fileData));
};

router.get("/", (req, res) => {
  const videosData = readFile();
  const resJSON = videosData.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });

  res.send(resJSON);
});

router.get("/:id", (req, res) => {
  const videosData = readFile();
  const video = videosData.find((video) => video.id === req.params["id"]);
  const resJSON = {
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
    description: video.description,
    views: video.views,
    likes: video.likes,
    duration: video.duration,
    video: video.video,
    timestamp: video.timestamp,
    comments: video.comments,
  };
  res.send(resJSON);
});

router.post("/", (req, res) => {
  const videosData = readFile();
  if (!req.body.title || !req.body.image || !req.body.description) {
    return res
      .status(400)
      .send(
        "Please make sure to include title, image and description of the video"
      );
  }


  const newVideo = {
    id: uuid(),
    title: req.body.title,
    channel: req.body.channel ,
    image: req.body.image,
    description: req.body.description,
    views:0,
    likes:0,
    duration: req.body.durantion || 1,
    video: req.body.video || "no url",
    timestamp: Date.now(),
    comments:[]
  };
 
  videosData.push(newVideo);
  writeFile(videosData);

  return res.sendStatus(201);
});

module.exports = router;
