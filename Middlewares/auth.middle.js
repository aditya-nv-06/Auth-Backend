import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';    

dotenv.config({ 
    path: '.env'
});

const auth = async (req, res, next) => {
    const token = req.cookies.authToken || req.headers['auth-token'] || req.body.token || req.query.token;
    console.log('Token:', token);

    if (!token) {
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    try {
        if (typeof token !== 'string') {
            throw new Error("Invalid Token");
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log('Error verifying token:', error);
        return res.status(401).json({
            message: "Invalid Token"
        });
    }

}


export {auth} 