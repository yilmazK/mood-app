const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const moods = req.body.moods;
    const _id = req.body._id;
    const newUser = new User({username, moods, _id});
    console.log(newUser);

    newUser.save()
        .then(() => { res.json(newUser) })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
     User.findByIdAndUpdate(req.params.id)
        .then(user => {
            user.moods.push(req.body.new);
            user.save()
                .then(() => res.json('Exercise Updatetd!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

    module.exports = router;


