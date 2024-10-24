import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryt from "bcrypt";

dotenv.config({ 
    path:'./.env'
})
const userSchema = new mongoose.Schema({

    name:{ 
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    password:{ 
        type:String,
        required:true,
        min:6,
        max:10,
    },
    refreshToken:{ 
        type:String
    }
},{timestamps:true});


userSchema.pre('save',function(next){ 
    this.password = bcryt.hashSync(this.password,10);
    next();
})

userSchema.methods.comparePassword = function(plainPassword){   
    return bcryt.compareSync(plainPassword,this.password);
}
userSchema.methods.generateJWT= function(){ 
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },process.env.TOKEN_SECRET,{expiresIn:'1h'});
}





export default mongoose.model('User',userSchema);