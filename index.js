const express = require('express');
const app = express();
const PORT = 3200;
const cors = require('cors')
const fs = require('fs');
const { db } = require('./config/db');
app.use(express.json());
const userRouter = require('./router/userRouter')
app.use(cors())
app.use('/user', userRouter)
app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`)
})
db.getConnection((err, connection) => {
    if(err){
        console.log('Error: ',err.sqlMessage)
    }
    console.log('Database is running', connection.threadId)
})