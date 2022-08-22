const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {createErrorResponse,generateAccessToken} = require('../common/functions/index')

class authController {

    async registration(req,res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
               return createErrorResponse(res,400,`Ошибка при регистрации`)
            }
            const {username,password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return createErrorResponse(res,400,'Пользователь с таким именем уже существует')
            }
            const hashPassword = bcrypt.hashSync(password,4);
            const user = new User({username, password:hashPassword})
            await user.save();
            return res.json({message:"Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e);
            createErrorResponse(res,400,'Ошибка при регистрации')
        }
    }

    async login(req,res) {
        try {
            const {username,password} = req.body;
            const candidate = await User.findOne({username})
            if (!candidate) {
                return createErrorResponse(res,400,'Пользователь с таким именем не найден')
            }
            const validPassword = bcrypt.compareSync(password,candidate.password);
            if (!validPassword) {
                return createErrorResponse(res,400,'Введен неверный пароль')
            }
            const token = generateAccessToken(candidate._id,candidate.username);
            return res.json({token})
        } catch (e) {
            console.log(e);
            createErrorResponse(res,400,'Ошибка при входе в аккаунт')
        }
    }
}

module.exports = new authController()