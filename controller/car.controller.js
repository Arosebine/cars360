const cloudinary = require('../utils/cloundinary');
const db = require("../database/postgresql");
const Sequelize = require('sequelize');
const Car = db.car;


exports.carRegistration = async(req, res) => {
  const {name, manufacturer, year, images, number_of_day, amount }= req.body;

  const photo = [];
  for (let i=0; i < req.file; i++ ){
    const result = await cloudinary.uploader.upload(req.file[i].path);
    photo.push(result.secure_url);
  }
  try {

    const newcar = await Car.create({
    name,
    manufacturer,
    year,
    images,
    number_of_day,
    amount,
    })
    console.log(Car);
    return res.status(200).json(newcar)
  } catch (error) {
    console.log(error);
    console.log(error);
    
  }
}







// Retrieve all cars from the database.
exports.findAll = (req, res) => {
    const content = req.query.content;
    const condition = content ? { [Op.iLike]: `%${content}%` } : null;

    Car.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cars."
        });
      });

};

// Find a single car with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Car.findByPk(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found blog with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving blog with id=" + id });
      });

};

// Update a car by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const id = req.params.id;

      Car.update(req.body, {
    where: { id: id }
  })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Car with id=${id}. Maybe Car was not found!`
            });
          } else res.send({ message: "Car was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Car with id=" + id
          });
        });

};

// Delete a car with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Car.destroy({
    where: { id: id }
  })
      .then(data => {
        if (data === 1) {
          res.send({
            message: "Car was deleted successfully!"
          });
        } else {
          res.status(404).send({
            message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Car name with id=" + id
        });
      });

};

// Delete all cars from the database.
exports.deleteAll = (req, res) => {
    Car.destroy({
    where: {},
    truncate: false
  })
    .then(data => {
      res.send({
        message: `${data} Cars were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cars."
      });
    });
};

// Find all published cars
exports.findAllAmount = (req, res) => {
  Car.findAll({ where: { amount: true }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    });
};



// upload files in sequelize? 
// const multer = require('multer')

// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('database', 'username', 'password')

// const MyModel = sequelize.define('myModel', {
//   filePath: Sequelize.STRING,
// })



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './app/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   }
// })

// app.post('/upload', multer({ storage }).single('example'), async (req, res) => {
//     // This needs to be done elsewhere. For this example we do it here.
//     await sequelize.sync()

//     const filePath = `${req.file.destination}/${req.file.filename}`
//     const myModel = await MyModel.create({ filePath })
// })


