const router = require('express').Router();
const { Users } = require('../../models');

// sign up
router.post('/', async (req, res) => {
    try {
        const userData = await Users.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//login
router.post('/login', async (req, res) => {
    const rejectMessage = 'Incorrect username or password, please try again';
    try {
        const userData = await Users.findOne({ where: { name: req.body.name } });

        if (!userData) {
            res.status(400).json({ message: rejectMessage });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: rejectMessage });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;