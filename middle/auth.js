const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Task'

const auth = (req,res,next)=>{

    try{

        let token = req.headers.authorization;
        if(token){
            if(!token){
                return res.status(401).json({ message: 'No token provided.' });
            }else{

          
            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);

            (err) => {
                if (err) {
                  if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token expired.' });
                  }
                  return res.status(500).json({ message: 'Failed to authenticate token.' });
                }
        
       
           
            }
            req.userId = user.id;
        }   
        next();
    }
       
    }catch(err){
        res.status(401).json({ message: "unauthorizede user" })

    }
}

module.exports = auth;