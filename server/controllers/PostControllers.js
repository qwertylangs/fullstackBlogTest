import postModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await postModel.find().populate("user").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await postModel
      .findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: "after",
        }
      )
      .populate("user");
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await postModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить тэги",
    });
  }
};

export const create = async (req, res) => {
  try {
    const { title, text, tags, viewsCount, imageUrl } = req.body;
    const doc = new postModel({
      title,
      text,
      tags,
      viewsCount,
      imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findOneAndDelete({
      _id: postId,
    });
    if (!post) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, text, tags, viewsCount, imageUrl } = req.body;

    await postModel.updateOne(
      {
        _id: postId,
      },
      {
        title,
        text,
        tags,
        viewsCount,
        imageUrl,
      }
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
