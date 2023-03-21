const { Router } = require('express');
const authController = require('../controllers/authController');
const { notRequireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/signup', notRequireAuth, authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', notRequireAuth, authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;