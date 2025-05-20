const { createMasterLocation, getMasterLocation, getMasterLocationById, updateMasterLocation, deleteMasterLocation, nonActiveMasterLocation } = require("../../services/master_location/master_location_services")

const addLocation = async (req, res) => {
    try {
        const category = await createMasterLocation(req.body)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllLocation = async (req, res) => {
    try {
        const category = await getMasterLocation()
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneLocation = async (req, res) => {
    try {
        const category = await getMasterLocationById(req.params.id)
        if (!category) {
            res.status(404).json({ message: 'Location not found' })
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const editLocation = async (req, res) => {
    try {
        const category = await getMasterLocationById(req.params.id)
        if (!category) {
            res.status(404).json({ message: 'Location Departure not found' })
        }
        await updateMasterLocation(req.params.id, req.body)
        res.status(200).json({ message: 'Success', category })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteLocation = async (req, res) => {
    try {
        const category = await getMasterLocationById(req.params.id)
        if (!category) {
            res.status(404).json({ message: 'Location not found' })
        }
        await deleteMasterLocation(req.params.id)
        res.status(200).json({ message: 'Success' })
    } catch (error) {

    }
}

const nonActiveLocation = async (req, res) => {
    try {
        const category = await getMasterLocationById(req.params.id)
        if (!category) {
            res.status(404).json({ message: 'Location not found' })
        }
        await nonActiveMasterLocation(req.params.id)
        res.status(200).json({ message: 'Success' })
    } catch (error) {

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