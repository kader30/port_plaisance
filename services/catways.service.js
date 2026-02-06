const Catway = require('../models/Catway');

exports.getAllCatways = async (req, res, next) => {
  try {
    const catways = await Catway.find({});  
    res.json(catways);
    } catch (error) {   
    next(error);
    }

};

exports.getCatwayByNumber = async (req, res, next) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {    
        return res.status(404).json({ message: 'Catway non trouvé' });
    }   
    res.json(catway);
    } catch (error) {
    next(error);
    }   
};

exports.createCatway = async (req, res, next) => {
  try {
    const newCatway = new Catway(req.body);  
    await newCatway.save();    
    res.status(201).json(newCatway);
    } catch (error) {   
    next(error);
    }   
};  


exports.updateCatway = async (req, res, next) => {
  try {
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },  
        req.body,   
        { new: true }
    );
    if (!updatedCatway) {    
        return res.status(404).json({ message: 'Catway non trouvé' });
    }   
    res.redirect('/catways');
    } catch (error) {
    next(error);
    }
};

exports.deleteCatway = async (req, res, next) => {
    try {
        const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        if (!deletedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }

};



