const { Admin } = require('../../models');
const adminService = require('../../services/admins/admin_service');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/token');

// REGISTER
async function registerAdmin(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashed = await hashPassword(password);
    const admin = await Admin.create({
      name,
      email,
      password: hashed,
      is_active: true
    });

    res.status(201).json({ message: 'Admin registered', data: admin });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false, status_code: 500 });

  }
}

// LOGIN
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin || !(await comparePassword(password, admin.password))) {
      return res.status(401).json({ status_code: 401, success: false, message: 'Invalid credentials' });
    }

    if (!admin.is_active) {
      return res.status(403).json({ status_code: 403, success: false, message: 'Account not active' });
    }

    const token = generateToken({ id: admin.id, role: 'admin' });
    res.cookie('token', token, { httpOnly: true, sameSite: "None", secure: true, path: "/" });
    res.status(200).json({ status_code: 200, success: true, message: 'Login successful', data: { token } });
  } catch (err) {
    res.status(500).json({ status_code: 500, success: false, error: err.message });
  }
}

// LOGOUT

const logoutAdmin = async (req, res) => {
  const id = req.admin.id
  try {
    res.clearCookie('token', { httpOnly: true, sameSite: "None", secure: true, path: "/" });
    console.log('logout berhasil');


    res.status(200).json({ message: 'logout berhasil' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// GET ALL
async function getAllAdmins(req, res) {
  try {
    const admins = await adminService.getAllAdmins();

    res.status(200).json({ status_code: 200, success: true, data: admins });

  } catch (err) {
    res.status(500).json({ status_code: 500, success: false, error: err.message });
  }
}

// GET BY ID
async function getAdminById(req, res) {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({ status_code: 404, success: false, message: 'Admin not found' });
    }
    res.status(200).json({ status_code: 200, success: true, message: 'Data retrieved', data: admin });
  } catch (err) {
    res.status(500).json({ status_code: 500, success: false, error: err.message });
  }
}

// UPDATE
async function updateAdmin(req, res) {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({ status_code: 404, success: false, message: 'Admin not found' });
    }
    await adminService.updateAdmin(req.params.id, req.body);
    return res.status(200).json({ status_code: 200, success: true, message: 'Admin updated', data: admin });
  } catch (err) {
    res.status(500).json({ status_code: 500, success: false, error: err.message });
  }
}

// REACTIVATE
async function reactivateAdmin(req, res) {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    
    if (!admin) {
      return res.status(404).json({
        status_code: 404,
        success: false,
        message: 'Admin not found'
      });
    }

    if (admin.is_active) {
      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Admin is already active'
      });
    }

    const reactivatedAdmin = await adminService.reactivateAdmin(req.params.id);

    res.status(200).json({
      status_code: 200,
      success: true,
      message: 'Admin reactivated',
      data: reactivatedAdmin
    });

  } catch (err) {
    res.status(500).json({
      status_code: 500,
      success: false,
      error: err.message
    });
  }
}



// DEACTIVATE ADMIN
async function deactivateAdmin(req, res) {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        status_code: 404,
        success: false,
        message: 'Admin not found'
      });
    }

    if (!admin.is_active) {
      return res.status(200).json({
        status_code: 200,
        success: true,
        message: 'Admin already deactivated'
      });
    }

    const result = await adminService.deactivateAdmin(req.params.id);

    res.status(200).json({
      status_code: 200,
      success: true,
      message: 'Admin deactivated',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      status_code: 500,
      success: false,
      error: err.message
    });
  }
}



// DELETE
async function deleteAdmin(req, res) {
  try {
    const success = await adminService.deleteAdmin(req.params.id);
    if (!success) {
      return res.status(404).json({ status_code: 404, success: false, message: 'Admin not found' });
    }
    res.status(200).json({ status_code: 200, success: true, message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ status_code: 500, success: false, error: err.message });
  }
}

async function getMe(req, res) {
  const { id } = req.user;
  try {
    console.log(id);
    const admin = await adminService.getAdminMe(id);
    if (!admin) {
      return res.status(404).json({
        status_code: 404,
        success: false,
        message: 'Admin not found'
      });
    }
    return res.status(200).json({
      status_code: 200,
      success: true,
      data: admin
    });
  } catch (err) {
    return res.status(500).json({
      status_code: 500,
      success: false,
      error: err.message
    });
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  reactivateAdmin,
  deactivateAdmin,
  deleteAdmin,
  getMe
};
