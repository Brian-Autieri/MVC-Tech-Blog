const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const response = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;