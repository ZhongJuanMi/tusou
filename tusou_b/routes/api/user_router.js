var router = require('koa-router')();
var user_controller = require('../../app/controllers/user_controller');
router.post('/logUser', user_controller.logUser);
router.get('/ifUser', user_controller.ifUser);
router.post('/registerUser', user_controller.registerUser);

module.exports = router;