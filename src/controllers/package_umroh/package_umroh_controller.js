const { createPakcageUmroh, getPakcageUmroh, getPakcageUmrohById, editPakcageUmroh, deletePakcageUmroh } = require("../../services/package_umroh/package_umroh_services");

const addPackageUmroh = async (req, res) => {
    const {
        id_location_departure,
        id_type_departure,
        id_category_departure,
        package_name,
        description,
        date_departure,
        airline,
        duration,
        quota,
        quota_update,
        price,
        schedules,
        hotel,
        facilities,
        // images
    } = req.body;
    const id_mitra = req.user.id
    if (!id_location_departure
        || !id_type_departure
        || !id_category_departure
        || !package_name
        || !description
        || !date_departure
        || !airline
        || !duration
        || !quota
        || !quota_update
        || !price
        || !schedules
        || !hotel
        || !facilities
    ) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: "Incomplete data. Please fill in all required fields."
        });
    }
    try {
        const packageUmroh = await createPakcageUmroh({
            id_mitra,
            id_location_departure,
            id_type_departure,
            id_category_departure,
            package_name,
            description,
            date_departure,
            airline,
            duration,
            quota,
            quota_update,
            price,
            schedules,
            hotel,
            facilities,
            // images
        });
        res.status(200).json({ status_code: 200, success: true, message: 'Package Umroh created successfully', packageUmroh });
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message });
    }
};

const getAllPackageUmroh = async (req, res) => {
    try {
        const packageUmroh = await getPakcageUmroh()
        res.status(200).json({ status_code: 200, success: true, data: packageUmroh })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getOnePackageUmroh = async (req, res) => {
    try {
        const packageUmroh = await getPakcageUmrohById(req.params.id)
        if (!packageUmroh) {
            res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh Departure not found' })
        }
        res.status(200).json({ status_code: 200, success: true, data: packageUmroh })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const editPackageUmroh = async (req, res) => {
    const {
        id_location_departure,
        id_type_departure,
        id_category_departure,
        package_name,
        description,
        date_departure,
        airline,
        duration,
        quota,
        quota_update,
        price,
        schedules,
        hotel,
        facilities,
        // images
    } = req.body;
    try {
        const packageUmroh = await getOnePackageUmroh(req.params.id)
        if (!packageUmroh) {
            res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh Departure not found' })
        }
        const obj = {};
        obj.type_name = type_name ?? type.type_name;
        // obj.type_name = type_name ?? type.type_name;
        // obj.type_name = type_name ?? type.type_name;
        // obj.type_name = type_name ?? type.type_name;
        await updateMasterPackageUmroh(req.params.id, obj)
        res.status(200).json({ status_code: 200, success: true, data: packageUmroh })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const deletePackageUmroh = async (req, res) => {
    try {
        const packageUmroh = await deletePakcageUmroh(req.params.id)
        if (!packageUmroh) {
            res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh Departure not found' })
        }
        await deleteMasterPackageUmroh(req.params.id)
        res.status(200).json({ status_code: 200, success: true, data: packageUmroh })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

module.exports = {
    addPackageUmroh,
    getAllPackageUmroh,
    getOnePackageUmroh,
    editPackageUmroh,
    deletePackageUmroh
};