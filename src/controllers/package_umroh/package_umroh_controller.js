const { createPakcageUmroh, getPakcageUmroh, getPakcageUmrohById, editPakcageUmroh, deletePackageUmrohServices, nonActivePackageUmrohServices, updateStatusPackageUmroh, getPackageUmrohByMitra, rejectUmrohPackage, getPakcageUmrohByIdView } = require("../../services/package_umroh/package_umroh_services");
const models = require('../../models');
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
        jamaah_requirements,
        // quota_update,
        price,
        schedules,
        hotel,
        facilities,
        images
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
        || !jamaah_requirements
        // || !quota_update
        || !price
        || !schedules
        || !hotel
        || !images
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
            quota_update: quota,
            price,
            jamaah_requirements,
            schedules,
            hotel,
            facilities,
            images,
        });
        return res.status(200).json({ status_code: 200, success: true, message: 'Package Umroh created successfully', packageUmroh });
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message });
    }
};

const getAllPackageUmroh = async (req, res) => {
    try {
        const packageUmroh = await getPakcageUmroh(req.query)
        const paket = await models.package_umroh.count();
        console.log(paket);
        res.status(200).json({ status_code: 200, success: true, data: packageUmroh, jumlahPaket: paket })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getOnePackageUmroh = async (req, res) => {
    try {
        const packageUmroh = await getPakcageUmrohById(req.params.id)
        if (!packageUmroh) {
            return res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh Departure not found' })
        }
        return res.status(200).json({ status_code: 200, success: true, data: packageUmroh })
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getOnePackageUmrohWithView = async (req, res) => {
    try {
        const packageUmroh = await getPakcageUmrohByIdView(req.params.id)
        if (!packageUmroh) {
            return res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh Departure not found' })
        }
        return res.status(200).json({ status_code: 200, success: true, data: packageUmroh })
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message })
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
        price,
        schedules,
        hotel,
        facilities,
        images,
        package_status
    } = req.body;
    try {
        const packageUmroh = await getPakcageUmrohById(req.params.id)
        if (!packageUmroh) {
            res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh Departure not found' })
        }

        const obj = {
            id_location_departure: id_location_departure ?? packageUmroh.id_location_departure,
            id_type_departure: id_type_departure ?? packageUmroh.id_type_departure,
            id_category_departure: id_category_departure ?? packageUmroh.id_category_departure,
            package_name: package_name ?? packageUmroh.package_name,
            description: description ?? packageUmroh.description,
            date_departure: date_departure ?? packageUmroh.date_departure,
            airline: airline ?? packageUmroh.airline,
            duration: duration ?? packageUmroh.duration,
            quota: quota ?? packageUmroh.quota,
            price: price ?? packageUmroh.price,
            package_status: package_status ?? packageUmroh.package_status,
            hotel,
            facilities,
            schedules,
            images
        };

        const isSame =
            packageUmroh.id_location_departure === obj.id_location_departure &&
            packageUmroh.id_type_departure === obj.id_type_departure &&
            packageUmroh.id_category_departure === obj.id_category_departure &&
            packageUmroh.package_name === obj.package_name &&
            packageUmroh.description === obj.description &&
            packageUmroh.date_departure === obj.date_departure &&
            packageUmroh.airline === obj.airline &&
            packageUmroh.duration === obj.duration &&
            packageUmroh.quota === obj.quota &&
            packageUmroh.price === obj.price &&
            packageUmroh.package_status == obj.package_status &&
            (!hotel || hotel.length === 0) &&
            (!facilities || facilities.length === 0) &&
            (!images || images.length === 0) &&
            (!schedules || schedules.length === 0);

        if (isSame) {
            return res.status(200).json({
                status_code: 200,
                success: true,
                message: 'Tidak ada perubahan data'
            });
        }
        await editPakcageUmroh(req.params.id, obj)
        res.status(200).json({ status_code: 200, success: true, data: packageUmroh })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const deletePackageUmroh = async (req, res) => {
    try {
        const packageUmroh = await getPakcageUmrohById(req.params.id);

        if (!packageUmroh) {
            return res.status(404).json({
                status_code: 404,
                success: false,
                message: 'Package Umroh Departure not found'
            });
        }

        await deletePackageUmrohServices(req.params.id);

        return res.status(200).json({
            status_code: 200,
            success: true,
            data: packageUmroh
        });

    } catch (error) {
        console.error('Delete error:', error); // debug log

        return res.status(500).json({
            status_code: 500,
            success: false,
            message: error?.message || 'Internal Server Error'
        });
    }
};

const nonActivePackageUmroh = async (req, res) => {
    try {
        const package = await getPakcageUmrohById(req.params.id)
        if (!package) {
            res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh not found' })
        }
        await nonActivePackageUmrohServices(req.params.id)
        res.status(200).json({ status_code: 200, success: true, data: package })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const editStatusPackage = async (req, res) => {
    const {
        package_status
    } = req.body;
    try {
        const packageUmroh = await getPakcageUmrohById(req.params.id)
        if (!packageUmroh) {
            return res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh not found' })
        }

        await updateStatusPackageUmroh(req.params.id, { package_status })

        const updated = await getPakcageUmrohById(req.params.id);
        return res.status(200).json({ status_code: 200, success: true, data: updated })
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getAllPackageUmrohByMitra = async (req, res) => {
    try {
        const packageUmroh = await getPackageUmrohByMitra(req.user.id, req.query)
        const paket = await models.package_umroh.count();
        console.log(paket);
        res.status(200).json({ status_code: 200, success: true, data: packageUmroh, jumlahPaket: paket })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const rejectPackageUmroh = async (req, res) => {
    const {
        admin_note
    } = req.body;
    try {
        const packageUmroh = await getPakcageUmrohById(req.params.id)
        if (!packageUmroh) {
            return res.status(404).json({ status_code: 404, success: false, message: 'Package Umroh not found' })
        }

        await rejectUmrohPackage(req.params.id, { admin_note })

        const updated = await getPakcageUmrohById(req.params.id);
        return res.status(200).json({ status_code: 200, success: true, data: updated })
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

module.exports = {
    addPackageUmroh,
    getAllPackageUmroh,
    getOnePackageUmroh,
    editPackageUmroh,
    deletePackageUmroh,
    nonActivePackageUmroh,
    editStatusPackage,
    getAllPackageUmrohByMitra,
    rejectPackageUmroh,
    getOnePackageUmrohWithView
};