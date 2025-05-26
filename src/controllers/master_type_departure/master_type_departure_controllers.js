const {
    createMasterTypeDeparture,
    getMasterTypeDeparture,
    updateMasterTypeDeparture,
    getMasterTypeDepartureById,
    deleteMasterTypeDeparture,
    nonActiveMasterTypeDeparture
} = require("../../services/master_type_departure/master_type_departure_services")

const addTypeDeparture = async (req, res) => {
    const { type_name } = req.body;
    if (!type_name) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: "Incomplete data. Please fill in all required fields."
        });
    }
    try {
        const type = await createMasterTypeDeparture(req.body)
        res.status(200).json({ status_code: 200, success: true, data: type })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getAllTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDeparture()
        res.status(200).json({ status_code: 200, success: true, data: type })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getOneTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDepartureById(req.params.id)
        if (!type) {
            res.status(404).json({ status_code: 404, success: false, message: 'Type Departure not found' })
        }
        res.status(200).json({ status_code: 200, success: true, data: type })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const editTypeDeparture = async (req, res) => {
    const { type_name } = req.body;
    try {
        const type = await getMasterTypeDepartureById(req.params.id)
        if (!type) {
            res.status(404).json({ status_code: 404, success: false, message: 'Type Departure not found' })
        }
        const obj = {};
        obj.type_name = type_name ?? type.type_name;

        await updateMasterTypeDeparture(req.params.id, obj)
        res.status(200).json({ status_code: 200, success: true, data: obj })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const deleteTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDepartureById(req.params.id)
        if (!type) {
            res.status(404).json({ status_code: 404, success: false, message: 'Type Departure not found' })
        }
        await deleteMasterTypeDeparture(req.params.id)
        res.status(200).json({ status_code: 200, success: true, data: type })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const nonActiveTypeDeparture = async (req, res) => {
    try {
        const type = await getMasterTypeDepartureById(req.params.id)
        if (!type) {
            res.status(404).json({ status_code: 404, success: false, message: 'Type Departure not found' })
        }
        await nonActiveMasterTypeDeparture(req.params.id)
        res.status(200).json({ status_code: 200, success: true, data: type })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
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