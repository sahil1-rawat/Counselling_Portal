const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads');
const register = require('../controller/register-controller');
const login = require('../controller/login-controller');
const profile = require('../controller/Profile-controller');
const authMiddleware = require('../middleware/auth-middleware');
const pswRecVerify = require('../controller/pswRecVerify-controller');
const resetPassword = require('../controller/resetPassword-controller');
const selectCourse = require('../controller/selectCourse-controller');
const paymentSuccess = require('../controller/payment-success');
const createPaymentSession = require('../controller/payment-controller');

router.post(
  '/register',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'sign', maxCount: 1 },
    { name: 'thumb', maxCount: 1 },
  ]),

  register
);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.post('/pswRecVerify', pswRecVerify);
router.put('/reset-password/:id', resetPassword);
router.put('/select-course/:id', selectCourse);
router.post('/payment', createPaymentSession);
router.get('/payment-success/:id', paymentSuccess);

module.exports = router;
