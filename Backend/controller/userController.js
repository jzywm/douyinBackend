const { User } = require('../model/index');

exports.getRegisterCode = async (req, res) => {
    const { username, telephone } = req.body;
    // 生成验证码
    const code = Math.floor(100000 + Math.random() * 900000);
    // 模拟发送验证码
    console.log(`Sending verification code ${code} to telephone ${telephone}`);
    // 将验证码存储在数据库中，关联到用户
    const userModel = new User({ username, tel: telephone, code });
    const dbBack = await userModel.save();
    res.status(200).json({
        code: 200,
        message: '验证码已发送',
        code: code,
        data: dbBack
    })
}
exports.register = async (req, res) => {
    const { username, tel, password, code } = req.body;
    const userModel = new User({ username, tel, password, code });
    // 检验验证码是否正确
    const user = await User.findOne({ tel });
    if (!user) {
        return res.status(400).json({ code: 400, message: '用户不存在' });
    }if (user.code !== code) {
        return res.status(400).json({ code: 400, message: '验证码错误' });
    }
    // 验证码正确，保存用户信息
    const dbBack = await userModel.save();
    res.status(200).json({
        code: 200,
        message: '注册成功',
        data: dbBack
    })
}


