import User from "../models/User.models.js";


const updateUser= async (req,res)=>{
    const { id } =req.params;
    const {name,email,password}=req.body;
    
     console.log(req.params);
     console.log(req.body);

    try{ 
        const user=await User.findByIdAndUpdate(id,{name,email,password});

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        await user.save();
        return res.status(200).json({
            message:"User updated successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            message:"Server Error"
        });
    }

}


export {updateUser}