const { createMasterLocation, getMasterLocation, getMasterLocationById, updateMasterLocation, deleteMasterLocation, nonActiveMasterLocation } = require("../../services/master_location/master_location_services")

const addLocation = async (req, res) => {
    const { location_name } = req.body;
    if (!location_name) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: "Incomplete data. Please fill in all required fields."
        });
    }
    try {
        const location = await createMasterLocation(req.body)
        res.status(200).json({ status_code: 200, success: true, data: location })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getAllLocation = async (req, res) => {
    try {
        const location = await getMasterLocation()
        res.status(200).json({ status_code: 200, success: true, data: location })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getOneLocation = async (req, res) => {
    try {
        const location = await getMasterLocationById(req.params.id)
        if (!location) {
            res.status(404).json({ status_code: 404, success: false, message: 'Location not found' })
        }
        res.status(200).json({ status_code: 200, success: true, data: location })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const editLocation = async (req, res) => {
    const { location_name } = req.body;
    try {
        const location = await getMasterLocationById(req.params.id)
        if (!location) {
            res.status(404).json({ status_code: 404, success: false, message: 'Location Departure not found' })
        }

        const obj = {};
        obj.location_name = location_name ?? location.location_name;

        await updateMasterLocation(req.params.id, obj)
        res.status(200).json({ status_code: 200, success: true, data: obj })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const deleteLocation = async (req, res) => {
    try {
        const location = await getMasterLocationById(req.params.id)
        if (!location) {
            res.status(404).json({ status_code: 404, success: false, message: 'Location not found' })
        }
        await deleteMasterLocation(req.params.id)
        res.status(200).json({ status_code: 200, success: true, data: location })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const nonActiveLocation = async (req, res) => {
    try {
        const location = await getMasterLocationById(req.params.id)
        if (!location) {
            res.status(404).json({ message: 'Location not found' })
        }
        await nonActiveMasterLocation(req.params.id)
        res.status(200).json({ status_code: 200, success: true, data: location })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}
module.exports = {
    addLocation,
    getAllLocation,
    getOneLocation,
    editLocation,
    deleteLocation,
    nonActiveLocation
}