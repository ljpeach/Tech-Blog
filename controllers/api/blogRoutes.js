const router = require('express').Router();
const { Posts } = require('../../models');

// create post
router.post('/', (req, res) => { });

// delete post
router.delete('/:id', (req, res) => { });

// update post
router.put('/:id', (req, res) => { });

// create comment
router.post('/:id/comment', (req, res) => { });

module.exports = router;