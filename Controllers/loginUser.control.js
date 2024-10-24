import User from '../models/User.models.js';


const generateJwt = async (userId) => { 
    console.log('generateJwt');
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }
       
        const token = user.generateJWT();  // Use generateJWT method from the User model
        console.log(token);
        

        user.refreshToken = token;
        
        await user.save({ validateBeforeSave: false });
        return token;
    } 
    catch (err) {
        console.error(err);
        throw new Error('Error generating JWT');
    }
};
const loginUser = async (req, res) =>{

    console.log('loginUser');
    const {email,password} = req.body;
    console.log(req.body);

    try{ 
        const user = await User.findOne(
          {email}
        );

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        console.log(user);
        if(!user){ 
            return res.status(400).json({message:"User does not exist"});
        }

        if(user.password !== password){ 
            return res.status(400).json({message:"Invalid password"});
        }
        

        const refreshToken = await generateJwt(user._id);

        console.log(refreshToken);

        const options={ 
            httpOnly:true,
            secure:true
        }
        return res.status(200).cookie("refreshToken",refreshToken,options).json({message:"User logged in successfully",data:{refreshToken,loggedInUser}});
    }
    catch(error){ 
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
}

export {loginUser,generateJwt};

