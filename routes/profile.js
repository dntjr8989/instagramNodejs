const express = require('express');
const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');
const router = express.Router();
const cash = require('../app');

router.post('/profile-modify', isLoggedIn, async(req,res,next)=>{
    const user = await User.findOne({where :{id : req.user.id}});
    if(user)
    {
        await User.update({
            nick : req.body.nick,
        },{
            where:{ id : req.user.id }
        });
        delete cash[req.user.id];
        res.redirect('/');
    }
    else{
        res.status(404).send('no user');
    }
});

module.exports = router;