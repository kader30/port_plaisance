const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});  
    res.json(users);
    } catch (error) {   
    next(error);
    }
};
