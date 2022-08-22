const jwt = require('jsonwebtoken');

function createErrorResponse(res,status,message) {
    return res.status(status).json({message});
}

function generateAccessToken(id,username) {
    const payload={id,username};
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn: '24h'});
}

module.exports = {createErrorResponse,generateAccessToken}