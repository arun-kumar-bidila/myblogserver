import jwt from 'jsonwebtoken'



const authMiddleware=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message:"Unauthorized Request"})
        }

        const token=authHeader.split(" ")[1];

        const decoded= jwt.verify(token,process.env.SECRET);

        req.userId=decoded.id;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Invalid Token"});
        
    }
}


export default authMiddleware;