const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');
const Post = require('../models/post');
const router = express.Router();
const cash = require('../app')

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      delete cash[req.user.id];
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:id/unfollow', isLoggedIn, async (req,res,next)=>{
  try{
    const user = await User.findOne({where : {id : req.user.id}});
    if(user)
    {
      user.removeFollowing(parseInt(req.params.id, 10));
      delete cash[req.user.id];
      res.send('success');
    }
    else{
      res.status(404).send('no user');
    }
  }
  catch (error)
  {
    console.error(error);
    next(error)
  }
});

router.post('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (post) {
      await post.addLiker(req.user.id);
      delete cash[req.user.id];
      res.send('success');
    } else {
      res.status(404).send('no post');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/unlike', isLoggedIn, async (req,res,next)=>{
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (post) {
      await post.removeLiker(req.user.id);
      delete cash[req.user.id];
      res.send('success');
    } else {
      res.status(404).send('no post');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/delete', isLoggedIn, async (req,res,next)=>{
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (post) {
      await Post.destroy({where:{id:req.params.postId}});
      res.send('success');
    } else {
      res.status(404).send('no post');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;