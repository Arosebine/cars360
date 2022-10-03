const db = require("../models/carpostres.model");
const { cloudinary_js_config } = require("../utils/cloundinary");
const Car = db.car;

// Create and Save a new blog
exports.create = async (req, res) => {
    // Create a Car360
  const {
    name,
    manufacture,
    year,
    images,
    number_of_day,
    amount,
  }= req.body

  const photo =[];
  for (let i= 0; i< req.files.length; i++);
  const result = await cloudinary_js_config.uploader.upload(req.files(i).path);
  photo.push(result.secure_url);

  // Save car info in the database
  const newCar = await Car.create({
    name,
    manufacture,
    year,
    images:photo,
    number_of_day,
    amount,
  })
  res.status(201).send(newCar)
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the car."
      });
    });

};

// Retrieve all blogs from the database.
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

// Find a single blog with an id
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

// Update a blog by the id in the request
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

// Delete a blog with the specified id in the request
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

// Delete all blogs from the database.
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

// Find all published blogs
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
