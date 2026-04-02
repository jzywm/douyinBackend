const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const tojwt = promisify(jwt.sign);
const verifyjwt = promisify(jwt.verify);

module.exports.createToken = async userInfo => {
    const token = await tojwt(userInfo, 'Jia19832656608', { expiresIn: '1d' });
    return token;
}
module.exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ code: 401, message: '未提供token' });
    }
    try {
        const userinfo = await verifyjwt(token, 'Jia19832656608');
        req.userinfo = userinfo;
        next();
    } catch (err) {
        return res.status(401).json({ code: 401, message: '无效的token' });
    }
}
