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
    res.status(201).json({ message: 'Admin registered', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// LOGIN
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin || !(await comparePassword(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!admin.is_active) {
      return res.status(403).json({ message: 'Account not active' });
    }

    const token = generateToken({ id: admin.id, role: 'admin' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// LOGOUT
function logoutAdmin(req, res) {
  res.json({ message: 'Logout success (hapus token di client)' });
}

// GET ALL
async function getAllAdmins(req, res) {
  try {
    const admins = await adminService.getAllAdmins();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET BY ID
async function getAdminById(req, res) {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// UPDATE
async function updateAdmin(req, res) {
  try {
    const admin = await adminService.updateAdmin(req.params.id, req.body);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DEACTIVATE
async function deactivateAdmin(req, res) {
  try {
    const admin = await adminService.deactivateAdmin(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deactivated', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE
async function deleteAdmin(req, res) {
  try {
    const success = await adminService.deleteAdmin(req.params.id);
    if (!success) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deactivateAdmin,
  deleteAdmin
};
