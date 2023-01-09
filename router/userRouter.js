const { getData, getStudentData, getStudentAttendance, addStundent, getAttendance, postAttendance, checkOutAttendance, updatePassword, editProfile, sortStudentAttendance } = require("../controller/userController");

const route = require("express").Router();

route.get(`/`, getData);
route.get(`/`, getData);
route.get(`/students`, getStudentData);
route.get(`/students-attendance/:id`, getAttendance);
route.get(`/students-attendance`, getStudentAttendance);
route.get(`/sort`, sortStudentAttendance);
route.post('/students', addStundent);
route.post('/students-attendance/:id', postAttendance);
route.patch('/students-attendance/:id', checkOutAttendance);
route.patch('/:id', updatePassword);
route.patch('/profile/:id', editProfile);

module.exports = route