const { createOrders,getOrderWithUserByOrderId, getOrders, getOrdersById, editOrder, deleteOrdersServices, paymentOrder, getOrdersByIdUser, updateStatusOrder, getOrdersByIdMitra, uploadCompleteDataJamaah, updateStatusDeparture } = require("../../services/orders/orders_service");
const { sendEmail } = require('../../services/notifications/email_services');
const   notificationService  = require('../../services/notifications/notification_service')
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
  const {
    payment_method,
    bank,
    no_rek,
    transaction_proof_url,
  } = req.body;

  const { order_id } = req.params;

  if (!order_id || !payment_method || !bank || !no_rek || !transaction_proof_url) {
    return res.status(400).json({
      status_code: 400,
      success: false,
      message: "Incomplete data. Please fill in all required fields."
    });
  }

  try {
    // Proses pembayaran (asumsikan ini service kamu)
    await paymentOrder(order_id, req.body);

    // Ambil data order + user
    const orderData = await getOrderWithUserByOrderId(order_id);
    const user = orderData?.user;

    if (!user) {
      throw new Error('User tidak ditemukan untuk order ini.');
    }

    // Kirim email
    await sendEmail(
      user.email,
      'Pembayaran Diterima',
      `Halo ${user.name},\n\nPembayaran kamu untuk pesanan #${order_id} telah berhasil dikonfirmasi.\n\nTerima kasih telah berbelanja!`
    );

    // ✅ Simpan Notifikasi
    await notificationService.saveNotification({
      userId: user.id,
      type: 'payment',
      message: `Pembayaran kamu untuk pesanan #${order_id} telah berhasil dikonfirmasi.`
    });

    return res.status(200).json({
      status_code: 200,
      success: true,
      message: 'Payment order successful, email sent, and notification saved.',
    });

  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      success: false,
      message: error.message,
    });
  }
};

const editStatusOrder = async (req, res) => {
    const {
        order_status
    } = req.body;
    try {
        const Order = await getOrdersById(req.params.id)
        if (!Order) {
            return res.status(404).json({ status_code: 404, success: false, message: 'Order not found' })
        }

        await updateStatusOrder(req.params.id, { order_status })

        const updated = await getOrdersById(req.params.id);
        return res.status(200).json({ status_code: 200, success: true, data: updated })
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const editStatusDeparture = async (req, res) => {
    // const {
    //     order_status
    // } = req.body;
    try {
        const Order = await getOrdersById(req.params.id)
        if (!Order) {
            return res.status(404).json({ status_code: 404, success: false, message: 'Order not found' })
        }

        await updateStatusDeparture(req.params.id)

        const updated = await getOrdersById(req.params.id);
        return res.status(200).json({ status_code: 200, success: true, data: updated })
    } catch (error) {
        return res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}
const getAllOrders = async (req, res) => {
    try {
        const Orders = await getOrders(req.query)
        res.status(200).json({ status_code: 200, success: true, data: Orders })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getAllOrdersByUser = async (req, res) => {
    // const id = req.user.id
    // const { payment_status, order_status } = req.query
    // const paym
    try {
        const Orders = await getOrdersByIdUser(req.user.id, req.query)
        res.status(200).json({ status_code: 200, success: true, data: Orders })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}

const getAllOrdersByMitra = async (req, res) => {
    // const id = req.user.id
    // const { payment_status, order_status } = req.query
    // const paym
    try {
        const Orders = await getOrdersByIdMitra(req.user.id, req.query)
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
        console.log(JSON.stringify(orderData, null, 2));
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

const upCompleteDataJamaah = async (req, res) => {
    const { visa_url, passport_url, hotel_ticket, airplane_ticket } = req.body;
    if (!hotel_ticket
        || !payment_method
        || !airplane_ticket
    ) {
        return res.status(400).json({
            status_code: 400,
            success: false,
            message: "Incomplete data. Please fill in all required fields."
        });
    }
    try {
        const Orders = await getOrdersById(req.params.id, req.body)
        if (!Orders) {
            res.status(404).json({ status_code: 404, success: false, message: 'Orders not found' })
        }

        await uploadCompleteDataJamaah(req.params.id, req.body)
        res.status(200).json({ status_code: 200, success: true, data: Orders })
    } catch (error) {
        res.status(500).json({ status_code: 500, success: false, message: error.message })
    }
}
module.exports = {
    addOrders,
    getAllOrders,
    getOneOrders,
    editOrders,
    deleteOrders,
    paymentOrders,
    getAllOrdersByUser,
    editStatusOrder,
    getAllOrdersByMitra,
    editStatusDeparture,
    upCompleteDataJamaah
    // nonActiveOrders
};