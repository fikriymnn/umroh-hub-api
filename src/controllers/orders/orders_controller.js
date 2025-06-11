const { createOrders, getOrders, getOrdersById, editOrder, deleteOrdersServices, paymentOrder } = require("../../services/orders/orders_service");

const addOrders = async (req, res) => {
    const {
        // id_user,
        // id_mitra,
        id_package,
        // subtotal,
        // payment_status,
        jamaah,
        // departure_status,
        // order_status,
        // payment_method,
        // bank,
        // no_rek,
    } = req.body;
    const id_user = req.user.id
    if (!id_package
        || !jamaah
        // || !payment_method
        // || !bank
        // || !no_rek
    ) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: "Incomplete data. Please fill in all required fields."
        });
    }
    try {
        const orders = await createOrders({
            id_user,
            id_package,
            // payment_method,
            // bank,
            // no_rek,
            jamaah,
            // images
        });
        return res.status(200).json({ status_code: 200, success: true, message: 'Package Umroh created successfully', orders });
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message });
    }
};

const paymentOrders = async (req, res) => {
    // if (!req.body) {
    //     return res.status(400).json({
    //         status_code: 400,
    //         success: false,
    //         message: "Missing request body"
    //     });
    // }
    const {
        payment_method,
        bank,
        no_rek,
        transaction_proof_url,
    } = req.body;
    // console.log(req.body);

    const { order_id } = req.params
    if (!order_id
        || !payment_method
        || !bank
        || !no_rek
        || !transaction_proof_url
    ) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: "Incomplete data. Please fill in all required fields."
        });
    }
    try {
        // const order = await m()
        // if (!order) {
        //     return res.status(404).json({ status_code: 404, success: false, message: 'Order not found' })
        // }
        await paymentOrder(order_id, req.body)

        return res.status(200).json({ status_code: 200, success: true, message: 'Payment order successfully' });
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message });
    }
}
const getAllOrders = async (req, res) => {
    try {
        const Orders = await getOrders()
        res.status(200).json({ status_code: 200, success: true, data: Orders })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getOneOrders = async (req, res) => {
    try {
        const Orders = await getOrdersById(req.params.id)
        if (!Orders) {
            return res.status(404).json({ status_code: 404, success: false, message: 'Order not found' })
        }
        return res.status(200).json({ status_code: 200, success: true, data: Orders })
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const editOrders = async (req, res) => {
    const {
        payment_status,
        jamaah,
        departure_status,
        order_status,
        payment_method,
        bank,
        no_rek,
    } = req.body;
    try {
        const Orders = await getOrdersById(req.params.id)
        if (!Orders) {
            res.status(404).json({ status_code: 404, success: false, message: 'Orders not found' })
        }

        const obj = {
            payment_status: payment_status ?? Orders.payment_status,
            departure_status: departure_status ?? Orders.departure_status,
            order_status: order_status ?? Orders.order_status,
            payment_method: payment_method ?? Orders.payment_method,
            bank: bank ?? Orders.bank,
            no_rek: no_rek ?? Orders.no_rek,
            jamaah,
        };

        const isSame =
            Orders.payment_status === obj.payment_status &&
            Orders.departure_status === obj.departure_status &&
            Orders.order_status === obj.order_status &&
            Orders.payment_method === obj.payment_method &&
            Orders.bank === obj.bank &&
            Orders.no_rek === obj.no_rek &&
            (!schedules || schedules.length === 0);

        if (isSame) {
            return res.status(200).json({
                status_code: 200,
                success: true,
                message: 'Tidak ada perubahan data'
            });
        }
        await editOrder(req.params.id, obj)
        res.status(200).json({ status_code: 200, success: true, data: Orders })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const deleteOrders = async (req, res) => {
    try {
        const Orders = await getOrdersById(req.params.id);

        if (!Orders) {
            return res.status(404).json({
                status_code: 404,
                success: false,
                message: 'Orders not found'
            });
        }

        await deleteOrdersServices(req.params.id);

        return res.status(200).json({
            status_code: 200,
            success: true,
            data: Orders
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

// const nonActiveOrders = async (req, res) => {
//     try {
//         const package = await getOrdersById(req.params.id)
//         if (!package) {
//             res.status(404).json({ status_code: 404, success: false, message: 'Orders not found' })
//         }
//         await nonAc(req.params.id)
//         res.status(200).json({ status_code: 200, success: true, data: package })
//     } catch (error) {
//         res.status(500).json({ status_code: 500, success: false, message: error.message })
//     }
// }

module.exports = {
    addOrders,
    getAllOrders,
    getOneOrders,
    editOrders,
    deleteOrders,
    paymentOrders
    // nonActiveOrders
};