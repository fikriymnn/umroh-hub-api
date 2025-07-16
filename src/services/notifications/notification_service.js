const { notification } = require('../../models');

const saveNotification = async ({ userId, type, message }) => {
  return await notification.create({
    userId,
    type,
    message,
    is_read: false
  });
};

module.exports = {
  saveNotification
};
