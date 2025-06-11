const { createPakcageUmroh, getPakcageUmroh, getPakcageUmrohById, editPakcageUmroh, deletePackageUmrohServices, nonActivePackageUmrohServices } = require("../../services/package_umroh/package_umroh_services");

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
            schedules,
            hotel,
            facilities,
            images
        });
        return res.status(200).json({ status_code: 200, success: true, message: 'Package Umroh created successfully', packageUmroh });
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message });
    }
};

const getAllPackageUmroh = async (req, res) => {
    try {
        const packageUmroh = await getPakcageUmroh()
        res.status(200).json({ status_code: 200, success: true, data: packageUmroh })
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
        images
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

module.exports = {
    addPackageUmroh,
    getAllPackageUmroh,
    getOnePackageUmroh,
    editPackageUmroh,
    deletePackageUmroh,
    nonActivePackageUmroh
};