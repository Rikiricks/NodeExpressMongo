module.exports = app =>{
const express = require("express");
const ctrlStudent = require("../controllers/student.controller");

const router = express.Router();


router.get("/", ctrlStudent.findAll);
router.get("/active-students",ctrlStudent.findAllActive);
router.get("/:id", ctrlStudent.findOne);
router.post("/",ctrlStudent.create);
router.put("/:id",ctrlStudent.update);
router.delete("/:id",ctrlStudent.delete);
router.delete("/",ctrlStudent.deleteAll);
app.use("/api/students", router);
}