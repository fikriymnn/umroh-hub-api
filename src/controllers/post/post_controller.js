const postService = require('../../services/post/post_service');

module.exports = {
 async createPost(req, res) {
  try {
    const userId = req.user.id; // Ambil ID user dari token (middleware auth)
    const postData = {
      ...req.body,
      userid: userId
    };

    const newPost = await postService.createPost(postData);

    res.status(201).json({
      success: true,
      message: 'Post created',
      data: newPost
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
},


  async getAllPosts(req, res) {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getPostById(req, res) {
    try {
      const post = await postService.getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      res.status(200).json({ success: true, data: post });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
