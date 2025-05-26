const {
    createMasterCategoryDeparture,
    getMasterCategoryDeparture,
    updateMasterCategoryDeparture,
    getMasterCategoryDepartureById,
    deleteMasterCategoryDeparture,
    nonActiveMasterCategoryDeparture
} = require("../../services/master_category_departure/master_category_departure_services")

const addCategoryDeparture = async (req, res) => {
    const { category_name } = req.body;
    if (!category_name) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: "Incomplete data. Please fill in all required fields."
        });
    }
    try {
        const category = await createMasterCategoryDeparture({ category_name })
        res.status(200).json({ status_code: 200, success: true, data: category })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getAllCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDeparture()
        res.status(200).json({ status_code: 200, success: true, data: category })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getOneCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDepartureById(req.params.id)
        if (!category) {
            res.status(404).json({ status_code: 404, success: false, message: 'Category Departure not found' })
        }
        res.status(200).json({ status_code: 200, success: true, data: category })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const editCategoryDeparture = async (req, res) => {
    const { category_name } = req.body;
    try {
        const category = await getMasterCategoryDepartureById(req.params.id)
        if (!category) {
            res.status(404).json({ status_code: 404, success: false, message: 'Category Departure not found' })
        }

        const obj = {};
        obj.category_name = category_name ?? category.category_name;

        await updateMasterCategoryDeparture(req.params.id, obj)
        res.status(200).json({ status_code: 200, success: true, data: obj })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const deleteCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDepartureById(req.params.id)
        if (!category) {
            res.status(404).json({ status_code: 404, success: false, message: 'Category Departure not found' })
        }
        await deleteMasterCategoryDeparture(req.params.id)
        res.status(200).json({ status_code: 200, success: true, data: category })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const nonActiveCategoryDeparture = async (req, res) => {
    try {
        const category = await getMasterCategoryDepartureById(req.params.id)
        if (!category) {
            res.status(404).json({ status_code: 404, success: false, message: 'Category Departure not found' })
        }
        await nonActiveMasterCategoryDeparture(req.params.id)
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
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