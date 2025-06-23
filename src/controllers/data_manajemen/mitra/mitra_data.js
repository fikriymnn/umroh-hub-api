const { dataDashboardMitra, getYearlyStatistics } = require("../../../services/data_management/mitra/mitra_data")

const getDataDashboardMitra = async (req, res) => {
    const id_mitra = req.user.id
    try {
        const data = await dataDashboardMitra(id_mitra)
        res.status(200).json({ status_code: 200, success: true, data: data })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getDataStatisticMitra = async (req, res) => {
    const id_mitra = req.user.id;
    const year = req.params.year;

    if (!year || isNaN(year)) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: 'Tahun harus valid.'
        });
    }

    try {
        const data = await getYearlyStatistics(id_mitra, year);
        res.status(200).json({
            status_code: 200,
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDataDashboardMitra,
    getDataStatisticMitra
}