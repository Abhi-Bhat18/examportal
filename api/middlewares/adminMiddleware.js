import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const adminAuth = (req,res,next)=>{
    const token = req.headers['x-auth-token']
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        if(decoded){      
            req.userId = decoded.id
            req.isAdminn = decoded.admin
            if(decoded.admin) next()
            else throw new Error('Invalid Token')
        }else{
            throw new Error('Token Expired');
        }
    }
    catch(error){
        console.log(error)
        return res.json({status:'error','user':false}) 
    }
}

export default adminAuth

