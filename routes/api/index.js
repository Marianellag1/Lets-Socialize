const router = require('express').Router();
const postRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/thought', thought-routes);
router.use('/user', user-routes);

module.exports = router;
