import User from "../models/User.models.js";


const logoutUser= async (req,res)=>{ 
    try{ 
        if(!req.user){
            return res.status(401).json({message:"User not found"});
        }
        
        const user = await User.findById(req.user._id);
        user.refreshToken = undefined;
        await user.save({validateBeforeSave:false});



        res.clearCookie('auth-token');
        return res.status(200).json({message:"User logged out successfully"});
    }
    catch(err){ 
        console.error(err);

        return res.status(500).json({message:"Server Error"});
    }
}


export {logoutUser};
