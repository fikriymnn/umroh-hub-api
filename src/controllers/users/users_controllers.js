const userService = require('../../services/users/user_service');

module.exports = {
  // CREATE
  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json({
        status_code: 201,
        success: true,
        message: 'User created',
        data: newUser
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // GET ALL
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Data retrieved',
        data: users
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // GET BY ID
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Data retrieved',
        data: user
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // UPDATE
  async updateUser(req, res) {
    try {
<<<<<<< HEAD
      // if (req.file) {
      //   req.body.image_url = req.file.filename;
      // }

      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'User updated',
        data: user
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // DEACTIVATE
=======
      if (req.file) {
        req.body.image_url = req.file.filename; // tambahkan image_url jika upload file
      }

      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


>>>>>>> 9dcbdda345a95542b2ce894e156b0aa0c9cc10de
  async deactivateUser(req, res) {
    try {
      const user = await userService.deactivateUser(req.params.id);
      if (!user) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'User deactivated',
        data: user
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  // DELETE
  async deleteUser(req, res) {
    try {
      const success = await userService.deleteUser(req.params.id);
      if (!success) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        status_code: 200,
        success: true,
        message: 'User deleted'
      });
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  },

  async getMe(req, res) {
    const id = req.user.id
    try {
      const user = await userService.getMe(id);
      if (!user) return res.status(404).json({ status_code: 404, success: false, message: 'User not found' });
      res.status(200).json({ status_code: 200, success: true, data: user });;
    } catch (err) {
      res.status(500).json({ status_code: 500, success: false, error: err.message });
    }
  }
};
