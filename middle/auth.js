const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Task'

const auth = (req,res,next)=>{

    try{

        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.userId = user.id;
            // ................................
            // let category = jwt.verify(token,SECRET_KEY);
            // req.catId = category.id
        }   
        else{
            res.status(401).json({ message: "unauthorizede user" })
        }
        next();


    }catch(err){
        res.status(401).json({ message: "unauthorizede user" })

    }
}

module.exports = auth;