const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_TOKEN, async (error, decoded) => {
        //console.log({error, decoded})
      if (error) {
        return res.status(401).json({ msg: 'Invalid Token' });
      } else {
        //console.log("decoded.user =", decoded.user);
        const user = await User.findOne({ _id: decoded.user.id })
        if(!user.isApproved){
          return res.status(401).json({ msg: 'Only approved admins can access' });
        }
        //console.log("user=", user);
        if(user.roles[0] === 'HOD' 
          || user.roles[0] === 'WARDEN' 
          || user.roles[0] === 'PROJECT_GUIDE' 
          || user.roles[0] === 'LOCAL_GUARDIAN'
          || user.roles[0] === 'DSW'
          || user.roles[0] === 'SYSTEM_ADMIN'){
            console.log('normal admin and system admin...')
            req.user = user;
            next();
        } else {
            return res.status(401).json({ msg: 'Admin only route' });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};