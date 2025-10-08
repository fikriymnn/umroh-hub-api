const { dataDashoardAdmin, getYearlyStatistics, getYearlyStatisticsDataPackageOrder } = require("../../../services/data_management/admin/admin_data")

const getDataDashboardAdmin = async (req, res) => {
    // const id_mitra = req.user.id
    try {
        const data = await dataDashoardAdmin()
        res.status(200).json({ status_code: 200, success: true, data: data })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getDataPackageOrderdAdmin = async (req, res) => {
    try {
        const data = await getYearlyStatisticsDataPackageOrder(req.query)
        res.status(200).json({ status_code: 200, success: true, data: data })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getDataStatisticAdmin = async (req, res) => {
    try {
        const data = await getYearlyStatistics(req.query)
        res.status(200).json({ status_code: 200, success: true, data: data })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

module.exports = {
    getDataDashboardAdmin,
    getDataPackageOrderdAdmin,
    getDataStatisticAdmin
}