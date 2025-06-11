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
// REACTIVATE
async  reactivateUser(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status_code: 404,
        success: false,
        message: 'User not found'
      });
    }

    if (user.is_active) {
      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'User is already active'
      });
    }

    const reactivatedUser = await userService.reactivateUser(req.params.id);

    res.status(200).json({
      status_code: 200,
      success: true,
      message: 'User reactivated',
      data: reactivatedUser
    });

  } catch (err) {
    res.status(500).json({
      status_code: 500,
      success: false,
      error: err.message
    });
  }
},

async deactivateUser(req, res) {
  try {
    const user = await userService.getUserById(req.params.id); // pakai get dulu

    if (!user) {
      return res.status(404).json({
        status_code: 404,
        success: false,
        message: 'User not found'
      });
    }

    if (!user.is_active) {
      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'User is already deactivated'
      });
    }

    const updated = await userService.deactivateUser(req.params.id);
    res.status(200).json({
      status_code: 200,
      success: true,
      message: 'User deactivated',
      data: updated
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
    const { id } = req.user;
    try {
      console.log(id);
      const user = await userService.getUserMe(id);
      if (!user) {
        return res.status(404).json({
          status_code: 404,
          success: false,
          message: 'User not found'
        });
      }
      return res.status(200).json({
        status_code: 200,
        success: true,
        data: user
      });
    } catch (err) {
      return res.status(500).json({
        status_code: 500,
        success: false,
        error: err.message
      });
    }
  }
}

