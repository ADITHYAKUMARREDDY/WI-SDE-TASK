const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { addTrain, getSeatAvailability } = require('../controllers/trainController');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const { protect, adminOnly, validateAdminApiKey } = require('../middleware/auth');

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/train', protect,  adminOnly,validateAdminApiKey, addTrain);
router.post('/availability', protect, getSeatAvailability);
router.post('/book', protect, bookSeat);
router.post('/booking-details', protect, getBookingDetails);

module.exports = router;
