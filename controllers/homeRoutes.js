const router = require('express').Router();
const { Users, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');

// homepage
router.get('/', (req, res) => {
    try {
        res.render('homepage', {
            page: 'The Tech Blog',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// dashboard
router.get('/dashboard', (req, res) => {
    try {
        res.render('', {
            page: 'Your Dashboard',
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// edit post
router.get('/post/:id/edit', (req, res) => {
    try {
        res.render('', {
            page: 'Your Dashboard',
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// create post
router.get('/post/create', (req, res) => {
    try {
        res.render('', {
            page: 'Your Dashboard',
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// view post
router.get('/post/:id', (req, res) => {
    try {
        res.render('', {
            page: 'The Tech Blog',
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// login
router.get('/login', (req, res) => {
    try {
        res.render('', {
            page: 'The Tech Blog',
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// sign up
router.get('/signup', (req, res) => {
    try {
        res.render('', {
            page: 'The Tech Blog',
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;