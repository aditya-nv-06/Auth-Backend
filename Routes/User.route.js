import {Router} from 'express';
import { getUser } from '../Controllers/getUser.control.js';
import {postUser} from '../Controllers/postUser.control.js';
import {deleteUser} from '../Controllers/deleteUser.control.js';
import {updateUser} from '../Controllers/updateUser.control.js';
import {loginUser} from '../Controllers/loginUser.control.js';
import {logoutUser} from '../Controllers/logoutUser.control.js';
import {changePass} from '../Controllers/changePass.control.js';

import {auth} from '../Middlewares/auth.middle.js';
const router =Router();


router.get("/",getUser);
router.post("/add",postUser);
router.post("/login",auth,loginUser);
router.get("/logout",auth,logoutUser);    
router.post("/changePass",auth,changePass);           
router.delete("/delete/:id",deleteUser);
router.put("/update/:id",updateUser);



export default router ;
