const router = require('express').Router();
const { Users, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');

// homepage
router.get('/', (req, res) => {
    try {
        res.render('homepage', {
            page: 'The Tech Blog',
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// dashboard
router.get('/dashboard', withAuth, (req, res) => {
    try {
        res.render('dashboard', {
            page: 'Your Dashboard',
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// edit post
router.get('/post/:id/edit', withAuth, async (req, res) => {
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

// create post
router.get('/post/create', withAuth, (req, res) => {
    try {
        res.render('postForm', {
            page: 'Your Dashboard',
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// view post
router.get('/post/:id', (req, res) => {
    try {
        res.render('postView', {
            page: 'The Tech Blog',
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// login
router.get('/login', (req, res) => {
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