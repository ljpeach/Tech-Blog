const router = require('express').Router();
const { Posts } = require('../../models');

// create post
router.post('/', async (req, res) => {
    try {
        if (!req.session.user_id) {
            res.status(440).json({ message: "Session expired" });
            return;
        }
        const postData = await Posts.create({
            title: req.body.title,
            post_body: req.body.post_body,
            user_id: req.session.user_id
        });

        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update post
router.put('/:id', async (req, res) => {
    try {
        if (!req.session.user_id) {
            res.status(440).json({ message: "Session expired" });
            return;
        }
        console.log("id", req.params.id);
        const postData = await Posts.update({
            title: req.body.title,
            post_body: req.body.post_body,
        },
            {
                where: { id: req.params.id }
            });

        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// delete post
router.delete('/:id', async (req, res) => {
    try {
        if (!req.session.user_id) {
            res.status(440).json({ message: "Session expired" });
            return;
        }
        const postData = await Posts.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }
        res.status(200).json(postData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// create comment
router.post('/:id/comment', (req, res) => { });

module.exports = router;