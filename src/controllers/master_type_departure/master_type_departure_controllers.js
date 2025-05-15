const {
    createMasterTypeDeparture,
    getMasterTypeDeparture,
    updateMasterTypeDeparture,
    getMasterTypeDepartureById,
    deleteMasterTypeDeparture,
    nonActiveMasterTypeDeparture
} = require("../../services/master_type_departure/master_type_departure_services")

const addTypeDeparture = async (req, res) => {
    try {
        const type = await createMasterTypeDeparture(req.body)
        res.status(200).json(type)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDeparture()
        res.status(200).json(type)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDepartureById(req.params.id)
        if (!type) {
            res.status(404).json({ message: 'Type Departure not found' })
        }
        res.status(200).json(type)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const editTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDepartureById(req.params.id)
        if (!type) {
            res.status(404).json({ message: 'Type Departure not found' })
        }
        await updateMasterTypeDeparture(req.params.id, req.body)
        res.status(200).json({ message: 'Success', type })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDepartureById(req.params.id)
        if (!type) {
            res.status(404).json({ message: 'Type Departure not found' })
        }
        await deleteMasterTypeDeparture(req.params.id)
        res.status(200).json({ message: 'Success' })
    } catch (error) {

    }
}

const nonActiveTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDepartureById(req.params.id)
        if (!type) {
            res.status(404).json({ message: 'Type Departure not found' })
        }
        await nonActiveMasterTypeDeparture(req.params.id)
        res.status(200).json({ message: 'Success' })
    } catch (error) {

    }
}
module.exports = {
    addTypeDeparture,
    getAllTypeDeparture,
    getOneTypeDeparture,
    editTypeDeparture,
    deleteTypeDeparture,
    nonActiveTypeDeparture
}