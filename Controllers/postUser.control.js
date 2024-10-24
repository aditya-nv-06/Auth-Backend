
import User from "../models/User.models.js";



const postUser = async (req, res) => { 
    const { name, email, password } = req.body;

    try { 
        let user = await User.findOne({ email });
        if (user) { 
            return res.status(400).json({ 
                message: "User already exists"
            });
        } else {
            user = new User({ 
                name,
                email,
                password
            });
           
            await user.save();
            return res.status(200).json({
                message: "User saved successfully",
                data: { name, email }
            });
        }
    } catch (err) { 
        console.error(err);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export { postUser };
