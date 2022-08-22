const jwt = require('jsonwebtoken');
const {createErrorResponse} = require('../common/functions/index');

module.exports = function (req,res,next) {
    if (req.method==="OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return createErrorResponse(res,403,'Пользователь не авторизован')
        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decodedData;
        next();
    } catch(e) {
        console.log(e);
        return createErrorResponse(res,403,'Пользователь не авторизован');
    }
}