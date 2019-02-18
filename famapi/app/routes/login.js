const passport = require('passport');
const router = require('express').Router();
const auth = require('./auth');


router.get('/', auth.optional, (req, res) => {
    res.render('templates/login', { user: 'mrabon'})
   });


module.exports = router;