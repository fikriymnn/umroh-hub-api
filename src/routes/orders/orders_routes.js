const express = require('express');
const authenticate = require('../../middlewares/auth');
const { addOrders, getAllOrders, getOneOrders, editOrders, deleteOrders, paymentOrders, getAllOrdersByUser, editStatusOrder, getAllOrdersByMitra, editStatusDeparture, upCompleteDataJamaah, rejectOrderUser } = require('../../controllers/orders/orders_controller');
// const uploadPackage = require('../../middlewares/uploadPackageUmroh');
const router = express.Router();

router.post('/addOrder', authenticate(['user']), addOrders);
router.put('/payment/:order_id', authenticate(['user']), paymentOrders)
router.get('/getOrderUser', authenticate(['user']), getAllOrdersByUser)
router.get('/getOrderMitra', authenticate(['mitra']), getAllOrdersByMitra)
router.get('/getOrder', getAllOrders);
router.get('/getOneOrder/:id', getOneOrders)
router.put('/editOrder/:id', authenticate(['user']), editOrders)
router.put('/editOrderStatus/:id', authenticate(['admin']), editStatusOrder)
router.put('/editDepartureStatus/:id', authenticate(['mitra']), editStatusDeparture)
router.put('/completeData/:id', authenticate(['mitra']), upCompleteDataJamaah)
router.delete('/deleteOrder/:id', authenticate(['mitra', 'admin']), deleteOrders)
router.put('/rejectOrder/:id', authenticate(['admin']), rejectOrderUser)
// router.put('/nonActiveOrder/:id', authenticate(['mitra', 'admin']), nonActivePackageUmroh)

module.exports = router;
