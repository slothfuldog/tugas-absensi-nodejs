const {
    db
} = require('../config/db');
const express = require('express');
const app = express();
app.use(express.json())

module.exports = {
    getData: (req, res) => {
        const nis = req.query.nis;
        const password = req.query.password;
        const query = `select * from user_roles where nis = ${db.escape(nis)} and password = ${db.escape(password)};`;
        db.query(query, (err, result) => {
            if (err) {
                res.status(404).send({
                    success: false,
                    err
                });
            }
            res.status(200).send({
                success: true,
                result
            });
        })
    },
    getStudentData: (req, res) => {
        const query = `select * from user_roles where role != 'admin'`
        db.query(query, (err, result) => {
            if (err) {
                res.status(404).send({
                    success: false,
                    err
                });
            }
            res.status(200).send({
                success: true,
                result
            });
        })
    },
    getDate: (req, res) => {
        const dates = new Date();
        const currentDate = dates.toLocaleDateString();
        const currentTime = dates.toLocaleTimeString();
        const {
            id_user,
            date,
            check_in,
            check_out
        } = req.body;
        const query = `insert into check_in_out (${dataString}) values`
    },
    getStudentAttendance: (req, res) => {
        const query = 'select attendance.date, nis, fullname, nomor_hp, attendance.check_in, attendance.check_out, attendance.status from user_roles inner join attendance on user_roles.id_user = attendance.id_user order by check_in_id desc;'
        db.query(query, (err, result) => {
                if (err) {
                    res.status(404).send({
                        success: false,
                        err
                    });
                }
                res.status(200).send({
                    success: true,
                    result
                });
            }
        )
    },
    addStundent : (req, res) =>{
        const query = `insert into user_roles (nis, password, role, fullname, tempat_lahir, tanggal_lahir, class, gender, address, nomor_hp, email) values (${db.escape(req.body.nis)}, ${db.escape(req.body.password)}, ${db.escape(req.body.role)}, ${db.escape(req.body.fullname)}, ${db.escape(req.body.tempat_lahir)},${db.escape(req.body.tanggal_lahir)}, ${db.escape(req.body.class)}, ${db.escape(req.body.gender)}, ${db.escape(req.body.address)}, ${db.escape(req.body.nomor_hp)}, ${db.escape(req.body.email)});`;
        db.query(query, (err, result) => {
            if(err){
                res.status(404).send('error')
            }
            res.status(200).send(result)
        })
    },
    getAttendance: (req, res) =>{
        const id = req.params.id;
        const query = `select date, check_in, check_out, status from attendance where id_user = ${id};`;
        db.query(query, (err, result) => {
            if(err){
                res.status(404).send(err);
            }
            res.status(200).send(result);
        })
    },
    postAttendance: (req, res) =>{
        const id = req.params.id;
        const query = `insert into attendance (id_user, date, check_in, check_out, status) values (${db.escape(req.params.id)},${db.escape(req.body.date)}, ${db.escape(req.body.check_in)}, ${db.escape(req.body.check_out)}, ${db.escape(req.body.status)});`;
        db.query(query, (err, result) => {
            if(err){
                res.status(404).send(err);
            }
            res.status(200).send({
                success: true,
                result
            })
        })
    },
    checkOutAttendance: (req, res) =>{
        const id= req.params.id;
        const query = `update attendance set check_out = ${db.escape(req.body.check_out)}, status = ${db.escape(req.body.status)} where date = ${db.escape(new Date().toLocaleDateString())} and id_user = ${id};`;
        db.query(query, (err, result) => {
            if(err){
                res.status(404).send(err);
            }
            res.status(200).send({
                success: true,
                result
            })
        })
    },
    updatePassword: (req, res) =>{
        const query = `update user_roles set password = ${db.escape(req.body.password)} where id_user = ${db.escape(req.params.id)}`
        db.query(query, (err, result) => {
            if(err){
                res.status(404).send(err);
            }
            res.status(200).send({
                success: true,
                result
            })
        })
    },
    editProfile: (req, res) =>{
        let props = [];
        for (const prop in req.body) {
            props.push(`${prop} = ${db.escape(req.body[prop])}`)
        } 
        let query = `update user_roles set ${props} where id_user = ${req.params.id}`;
        db.query(query, (err, result) =>{
            if(err){
                res.status(404).send(err);
            }
            res.status(200).send({
                success:true , 
                result
            });
        } )
    },
    getAllData: (req, res) => {
        const query = 'select * from user_roles;'
        db.query(query, (err, result) => {
            if(err){
                res.status(404).send(err);
            }
            res.status(200).send({
                success:true,
                result
            })
        })
    },
    sortStudentAttendance: (req, res) => {
        const query = `select attendance.date, nis, fullname, nomor_hp, attendance.check_in, attendance.check_out, attendance.status from user_roles inner join attendance on user_roles.id_user = attendance.id_user order by ${req.query.row} ${req.query.first};`
        db.query(query, (err, result) => {
                if (err) {
                    res.status(404).send({
                        success: false,
                        err
                    });
                }
                res.status(200).send({
                    success: true,
                    result
                });
            }
        )
    }
}