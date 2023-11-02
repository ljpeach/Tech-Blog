const router = require('express').Router();
const { Users, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');

// homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            include: [{
                model: Users,
                foreignKey: 'user_id',
                attributes: ['name']
            }]
        })
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            page: 'The Tech Blog',
            logged_in: req.session.logged_in,
            posts
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Posts.findAll({
            where: {
                user_id: req.session.user_id
            }
        })
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            page: 'Your Dashboard',
            logged_in: req.session.logged_in,
            posts
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// create post
router.get('/post/create', (req, res) => {
    try {
        res.render('postForm', {
            page: 'Your Dashboard',
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// view post
router.get('/post/view/:id', async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {
            include: [{
                model: Users,
                foreignKey: 'user_id',
                attributes: ['name']
            }]
        })
        const commentData = await Comments.findAll({
            where: {
                post_id: req.params.id
            },
            include: [{
                model: Users,
                foreignKey: 'user_id',
                attributes: ['name']
            }]
        })

        const post = postData.get({ plain: true });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render('postView', {
            page: 'The Tech Blog',
            logged_in: req.session.logged_in,
            ...post,
            comments
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// edit post
router.get('/post/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {})
        const post = postData.get({ plain: true });
        if (post.user_id != req.session.user_id) {
            res.redirect('/dashboard');
            return;
        }
        res.render('postForm', {
            page: 'Your Dashboard',
            update: true,
            logged_in: req.session.logged_in,
            post,
            post_id: req.params.id
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    try {
        res.render('login', {
            page: 'The Tech Blog',
            sign_in: true,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// sign up
router.get('/signup', (req, res) => {
    try {
        res.render('login', {
            page: 'The Tech Blog',
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;