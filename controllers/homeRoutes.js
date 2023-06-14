const router = require('express').Router();
const { Post, User, Comment, Index } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

  router.get('/post/:id', async (req, res) => {
    try {
      const projectData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            include: [
              User
            ]
          }
        ],
      });
  
      const post = projectData.get({ plain: true });
      console.log(post);
      res.render('post', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/post', withAuth, async (req, res) => {
    try {
      const postData = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;