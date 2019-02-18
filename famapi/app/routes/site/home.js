const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
//const passport = require('passport');

router.get('/', auth.optional, (req, res, next) => {
    //console.log(req);
    res.render('templates/index', { user: user});
    //passport.authenticate('local',function(err,user){
    //    if (!user) { return res.redirect('/login'); }
    //    console.log('authenticated');
    //    res.render('templates/index', { user: user});
    //});
});


module.exports = router;