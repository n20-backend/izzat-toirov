
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    console.log(req.headers["Authorization"]);
    
    const token = req.headers["Authorization"]?.split(" ")[1];

    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        let data = jwt.verify(token, 'maxfiy');
        req.user = data;
        res.status(200).json({ message: 'Token is valid' });
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
        
    }
};