import express from 'express';
import connect from './Db/Connect.js';
import dotenv from 'dotenv';
import cors from 'cors';

import getUserRoute from './Routes/User.route.js';
import postUserRoute from './Routes/User.route.js';
import deleteUserRoute from './Routes/User.route.js';
import updateUserRoute from './Routes/User.route.js';
import loginUserRoute from './Routes/User.route.js';
import logoutUserRoute from './Routes/User.route.js';
import changePassUserRoute from './Routes/User.route.js';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
dotenv.config({ path: '.env' });    

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser({
      httpOnly:true
}))

app.use(bodyParser.urlencoded({
      limit:'50mb',
      extended:true
}))


app.use('/',getUserRoute)
app.use('/add',postUserRoute)
app.use('/delete/:id',deleteUserRoute)
app.use('/update/:id',updateUserRoute)
app.use('/login',loginUserRoute)
app.use('/logout',logoutUserRoute)
app.use('/changePass',changePassUserRoute)


connect()
      .then(()=>{ 
            app.listen(process.env.PORT,()=>{ 
                console.log(`Server is running on port ${process.env.PORT}`)
            })
      })
      .catch(err=> console.log(`Error:${err.message}`))