const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth_controller');
const {check} = require('express-validator');

router.post(
    '/registration',
    [
        check('username',"Имя не может быть пустым").notEmpty(),
        check('password',"Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4,max:10}),
    ],
    authController.registration
);
router.post('/login', authController.login);

module.exports = router