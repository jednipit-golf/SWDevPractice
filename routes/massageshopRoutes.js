const express = require('express');
const {getMassageShops, getMassageShop, createMassageShop, updateMassageShop, deleteMassageShop} = require('../controllers/massageshopController');

//Include other resource routers
const reservationRouter=require('./reservationRoutes');

const router = express.Router();
const {protect,authorize} = require('../middleware/authMiddleware');

//Re-route into other resource routers
router.use('/:massageShopId/reservations', reservationRouter);

router.route('/').get(getMassageShops).post(protect,authorize('admin'), createMassageShop);
router.route('/:id').get(getMassageShop).put(protect,authorize('admin'), updateMassageShop).delete(protect,authorize('admin'), deleteMassageShop);

module.exports=router;
