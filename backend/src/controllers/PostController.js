const Post = require('../models/Post');

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PostController = {
    index: async (req, res) => {
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },
    store: async (req, res) => {
        const { author, place, description, hashtags } = req.body;
        const { filename, destination } = req.file;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(destination, 'resized', filename)
            )

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename
        })

        req.io.emit('post', post);

        return res.json(post);
    },
    delete: async (req, res) => {
        await Post.deleteOne({ _id: req.params.id });
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    }
}

module.exports = PostController;