const express = require('express');
const router = express.Router();
const auth = require('./routes/api/auth')
const adminRoute = require('./routes/api/adminRoutes')
const profile = require('./routes/api/profile')
const users = require('./routes/api/users')

router.use('/api/auth', auth)
router.use('/api/admin', adminRoute)
router.use('/api/profile', profile)
router.use('/api/users', users)

module.exports = router;