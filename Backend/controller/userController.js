const { json } = require('express');
const { User } = require('../model/index');
const { createToken } = require('../utils/jwt');

// 用户注册
exports.getRegisterCode = async (req, res) => {
    const { username, tel } = req.query;
    // 生成验证码
    const code = Math.floor(100000 + Math.random() * 900000);
    // 模拟发送验证码
    console.log(`Sending verification code ${code} to telephone ${tel}`);
    // 将验证码存储在数据库中，关联到用户
    const userModel = new User({ username, tel, code });
    const dbBack = await userModel.save();
    res.status(200).json({
        code: 200,
        message: '验证码已发送',
        verificationCode: code,
        data: dbBack
    })
}
exports.register = async (req, res) => {
    const { username, tel, password, code } = req.body;
    // 检验验证码是否正确
    const user = await User.findOne({ tel });
    if (!user) {
        return res.status(400).json({ code: 400, message: '用户不存在' });
    } if (user.code !== code) {
        return res.status(400).json({ code: 400, message: '验证码错误' });
    }
    // 验证码正确，保存用户信息
    const dbBack = await User.findOneAndUpdate({ tel }, { username, password }, { new: true });
    res.status(200).json({
        code: 200,
        message: '注册成功',
        data: dbBack
    })
}

// 用户登录
// 验证码登录
exports.getcode = async (req, res) => {
    const { tel } = req.body;
    // 生成验证码
    const code = Math.floor(100000 + Math.random() * 900000);
    // 模拟发送验证码    
    console.log(`Sending verification code ${code} to telephone ${tel}`);
    // 将验证码存储在数据库中，关联到用户
    const user = await User.findOne({ tel });
    user.code = code;
    const deta = await user.save();
    res.status(200).json({
        code: 200,
        message: '验证码已发送',
        verificationCode: code,
        data: deta.code
    })
}
exports.codelogin = async (req, res) => {
    const { tel, code } = req.body;
    const user = await User.findOne({ tel, code });
    if (!user) {
        return res.status(400).json({ code: 400, message: '手机号或验证码错误' });
    }
    const token = await createToken(user.toJSON());

    res.status(200).json({
        code: 200,
        message: '登录成功',
        data: { ...user.toObject(), token: token }
    })
}
exports.passwordlogin = async (req, res) => {
    const { tel, password } = req.body;
    const user = await User.findOne({ tel, password });
    if (!user) {
        return res.status(400).json({ code: 400, message: '手机号或密码错误' });
    }
    const token = await createToken(user.toJSON());
    res.status(200).json({
        code: 200,
        message: '登录成功',
        data: { ...user.toObject(), token: token }
    })
}
