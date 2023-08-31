const jwt = require('jsonwebtoken');

const secret = "hfg23j4234gf23uy42345g3yh4rf2355cvhb32";


const verifyToken = async (req,res, next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization;
        if (token) {
            try {
                const payload = await jwt.verify(token, secret);
                next();
            }
            catch (err) { 
            return res.status(401).send({message:"invalid token",sucsess:false});

            }
        }
        else{
            return res.status(401).send({message:"authorization error",sucsess:false});
        }
    }
    else{
        return res.status(401).send({message:"authorization error",sucsess:false});
    }
}
module.exports = {secret, verifyToken,jwt}