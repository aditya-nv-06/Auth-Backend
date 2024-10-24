import User from '../models/User.models.js';


const  changePass= async (req,res)=>{ 
     const {password,newPassword} =req.body;

     const user =await User.findById(req.user._id);

     if(!user.comparePassword(password)){ 
         return res.status(400).send("Password is incorrect");
     }
       
        
        user.password=newPassword;
        await user.save();
        res.status(200).send("Password changed successfully");
}

export {changePass}