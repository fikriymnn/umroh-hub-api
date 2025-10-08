const { getJamaah, getJamaahToday, getJamaahId, getYearlyStatisticsJamaah } = require("../../services/jamaah/jamaah");

const getAllJamaah = async (req, res) => {
    try {
        const Jamaah = await getJamaah(req.query)
        // console.log(paket);
        res.status(200).json({ status_code: 200, success: true, data: Jamaah })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getFilterJamaahToday = async (req, res) => {
    try {
        const Jamaah = await getJamaahToday(req.query)
        // console.log(paket);
        res.status(200).json({ status_code: 200, success: true, data: Jamaah })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}


const getJamaaById = async (req, res) => {
    try {
        const Jamaah = await getJamaahId(req.params.id)
        if (!Jamaah) {
            return res.status(404).json({ status_code: 404, success: false, message: 'Jamaah not found' })
        }
        res.status(200).json({ status_code: 200, success: true, data: Jamaah })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getStatisticJamaah = async (req, res) => {
    try {
        const Jamaah = await getYearlyStatisticsJamaah(req.query)
        // console.log(paket);
        res.status(200).json({ status_code: 200, success: true, data: Jamaah })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

module.exports = {
    getAllJamaah,
    getFilterJamaahToday,
    getJamaaById,
    getStatisticJamaah
}