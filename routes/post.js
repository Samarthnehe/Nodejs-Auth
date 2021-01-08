const router = require('express').Router();
const verify= require('./verifytoken');

router.get('/',verify,(req,res)=>{
    res.json({post:{
        title:"heya",
        description:"heya i m mad"
    }})
}
)

module.exports=router;