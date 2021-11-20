const db = require("../models");
const Student = db.students;


exports.create = (req,res)=>{
    if(!req.body.name){
        res.status(400).send({message: "Cannot be empty"});
    }

    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        dob: new Date(req.body.dob),
        isActive: req.body.isActive
    });

    student.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })

}

exports.findAll = (req, res) => {
    const search = req.query.name;
    var condition = search ? { title: { $regex: new RegExp(search), $options: "i" } } : {};
    Student.find(search)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).status({ message: err.message })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Student.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Student with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Student with id=" + id });
      });
  };


  exports.update = (req, res) => {
      const id = req.params.id;
      const data = req.body;

      Student.findByIdAndUpdate(id, data, { new: true })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Student with id=${id}. Maybe Student was not found!`
          });
        } else res.send({ message: "Student was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
        });
      });
    };

    exports.delete = (req, res) => {
        const id = req.params.id;
      
        Student.findByIdAndRemove(id)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
              });
            } else {
              res.send({
                message: "Student was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Student with id=" + id
            });
          });
      };


      exports.deleteAll = (req, res) => {
        Student.deleteMany({})
          .then(data => {
            res.send({
              message: `${data.deletedCount} Students were deleted successfully!`
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all Students."
            });
          });
      };

      exports.findAllActive = (req, res) => {
        Student.find({ isActive: true })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving students."
            });
          });
      };