const reactionService = require('../../services/reaction/reaction_service');

module.exports = {
  async reactToPost(req, res) {
    try {
      const { postId } = req.params;
      const { type } = req.body;

      const reaction = await reactionService.createOrUpdateReaction({
        postId,
        userId: req.user.id,
        type
      });

      res.status(200).json({ success: true, message: 'Reaction saved', data: reaction });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
