const express = require('express');
const authenticate = require('../../middlewares/auth');
const { addOrders, getAllOrders, getOneOrders, editOrders, deleteOrders, paymentOrders } = require('../../controllers/orders/orders_controller');
// const uploadPackage = require('../../middlewares/uploadPackageUmroh');
const router = express.Router();

router.post('/addOrder', authenticate(['user']), addOrders);
router.put('/payment/:order_id', authenticate(['user']), paymentOrders)
router.get('/getOrder', getAllOrders);
router.get('/getOneOrder/:id', getOneOrders)
router.put('/editOrder/:id', authenticate(['user']), editOrders)
router.delete('/deleteOrder/:id', authenticate(['mitra', 'admin']), deleteOrders)
// router.put('/nonActiveOrder/:id', authenticate(['mitra', 'admin']), nonActivePackageUmroh)

module.exports = router;
