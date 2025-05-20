const {
    createMasterCategoryDeparture,
    getMasterCategoryDeparture,
    updateMasterCategoryDeparture,
    getMasterCategoryDepartureById,
    deleteMasterCategoryDeparture,
    nonActiveMasterCategoryDeparture
} = require("../../services/master_category_departure/master_category_departure_services")

const addCategoryDeparture = async (req, res) => {
    try {
        const category = await createMasterCategoryDeparture(req.body)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDeparture()
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDepartureById(req.params.id)
        if (!category) {
            res.status(404).json({ message: 'Category Departure not found' })
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const editCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDepartureById(req.params.id)
        if (!category) {
            res.status(404).json({ message: 'Category Departure not found' })
        }
        await updateMasterCategoryDeparture(req.params.id, req.body)
        res.status(200).json({ message: 'Success', category })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDepartureById(req.params.id)
        if (!category) {
            res.status(404).json({ message: 'Category Departure not found' })
        }
        await deleteMasterCategoryDeparture(req.params.id)
        res.status(200).json({ message: 'Success' })
    } catch (error) {

    }
}

const nonActiveCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDepartureById(req.params.id)
        if (!category) {
            res.status(404).json({ message: 'Category Departure not found' })
        }
        await nonActiveMasterCategoryDeparture(req.params.id)
        res.status(200).json({ message: 'Success' })
    } catch (error) {

    }
}
module.exports = {
    addCategoryDeparture,
    getAllCategoryDeparture,
    getOneCategoryDeparture,
    editCategoryDeparture,
    deleteCategoryDeparture,
    nonActiveCategoryDeparture
}