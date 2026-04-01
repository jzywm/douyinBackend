const { User } = require('../model/index');
exports.register = async (req, res) => {
    const { username, tel, password } = req.body;
    const userModel = new User({ username, tel, password })
    const dbBack = await userModel.save();
    res.status(200).json({
        code: 200,
        message: '注册成功',
        data: dbBack
    })
}


