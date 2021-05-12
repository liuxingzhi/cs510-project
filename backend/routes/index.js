const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./user'); // 引入user路由模块
const historyRouter = require('./history'); // 注入用户路由模块
const apiRouter = require('./api')
const router = express.Router(); // 注册路由

// We can enable jwt later
// router.use('/api', require('../middlewares/auth.js'))

router.use('/api', apiRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter); // 注入用户路由模块
router.use('/history', historyRouter); // 注入用户路由模块


module.exports = router;