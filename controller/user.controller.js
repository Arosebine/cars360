const Car = require('../models/cars.model');
const cloudinary = require('../utils/cloundinary');
const Admin = require('../models/usermongo.model');
const path = require('path');



exports.carCreate = async (req, res) => {
  const id = req.params.id;
  try {
    const adminExist = await Admin.findOne({_id: id })
    if(!adminExist == "user"){
      return res.status(500).json('you are not admin')};
      
    const result = await cloudinary.uploader.upload(req.files.path );
    const newUser = { name, manufacturer, year, picture: result.secure_url, number_of_days, amount } = req.body;    

    const newCar = await Car.save(newUser);
return res.status(201).json({ newCar })


} catch (error) {
  return res.status(500).json({ message: error.message })
}
};