const { Post, User, comment, reaction, reply_comment } = require('../../models');

module.exports = {
  async createPost(data) {
    return await Post.create({ ...data, views: 0 });
  },

  async getAllPosts() {
    return await Post.findAll({
      include: [User, comment, reaction],
      order: [['createdAt', 'DESC']]
    });
  },

 async getPostById(id) {
  const foundPost = await Post.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
      },
      {
        model: comment,
        include: [
          {
            model: reply_comment,
            as: 'reply_comments',
            include: [{ model: User, attributes: ['id', 'name'] }]
          },
          {
            model: User,
            attributes: ['id', 'name'],
          }
        ]
      },
      {
        model: reaction,
        include: [{ model: User, attributes: ['id', 'name'] }]
      }
    ]
  });

  if (!foundPost) return null;

  // Tambah views
  foundPost.views += 1;
  await foundPost.save();

  // Urutkan komentar berdasarkan jumlah like (jika kolom like ada)
  if (foundPost.comments) {
    foundPost.comments = foundPost.comments.sort((a, b) => (b.like || 0) - (a.like || 0));
  }

  // Hitung total dan per jenis reaksi
  const reactions = foundPost.reactions || [];
  const totalReactions = reactions.length;
  const reactionCount = {};
  for (const r of reactions) {
    const type = r.type;
    if (!reactionCount[type]) {
      reactionCount[type] = 1;
    } else {
      reactionCount[type]++;
    }
  }

  // Gabungkan hasil
  return {
    ...foundPost.toJSON(),
    totalReactions,
    reactionCount
  };
}

};
