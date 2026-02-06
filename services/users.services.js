const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});  
    res.json(users);
    } catch (error) {   
    next(error);
    }
};

exports.getUserByEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });       
    if (!user) {    
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
    } catch (error) {   
    next(error);
    }   
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);  
    await newUser.save();    
    res.status(201);
    res.redirect('/users');
    } catch (error) {   
    next(error);
    }   
};  

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body, 
        { new: true }
    );
    if (!updatedUser) {    
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }       
    res.redirect('/users');
    } catch (error) {
    next(error);

    }
};

exports.deleteUser = async (req, res, next) => {    
    try {
        const deletedUser = await User.findOneAndDelete({ email: req.params.email });
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }           
       
        res.redirect('/users');
    } catch (error) {
        next(error);
    }   
};
