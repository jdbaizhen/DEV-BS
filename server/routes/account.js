let express = require('express');
let router = express.Router();

router.post('/login', function (req, res) {
	let data = null;
	let {username, password,role} = req.body;
	if (username === 'admin' && password === 'admin' && role!== '') {
		data = {
			result: true,
			message: '登录成功',
			role : role
		}
	} else {
		data = {result: false, message: '用户名或密码错误'}
	}
	res.send(JSON.stringify(data))
});

router.get('/logout', function (req, res) {
	let data = {
		result: true,
		message: '退出成功'
	};

	res.send(JSON.stringify(data));
});

module.exports = router;