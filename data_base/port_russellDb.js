const mongoose = require('mongoose');

const clientOptions = {
  
  dbname: "Russell",
};

exports.initClientDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  } 
};