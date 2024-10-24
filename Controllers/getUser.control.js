import User from "../models/User.models.js";


const getUser= async (req,res) =>{ 
    try{ 
        const user=await User.find()
        console.log(user);
        return res.status(200).json(user);
    }
    
    catch (err){ 
         res.status(500).json(
        {message:"Server Error"}
    )
    return
}
}



export { getUser};