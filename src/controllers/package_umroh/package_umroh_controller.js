const { createPakcageUmroh } = require("../../services/package_umroh/package_umroh_services");

const addPackageUmroh = async (req, res) => {
    try {
        const packageUmroh = await createPakcageUmroh(req.body);
        res.status(201).json({ message: 'Package Umroh created successfully', packageUmroh });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addPackageUmroh,
};