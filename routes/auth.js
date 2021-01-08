const router = require('express').Router();
const User = require('../model/User');
const jwt=require('jsonwebtoken');
const {loginValidation,registerValidation}=require('../validation');
const bcrypt=require('bcryptjs');
const { reset } = require('nodemon');



router.post('/register',async (req,res)=>{

    const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message );
    }
    //check if already exist
    const emailExist= await User.findOne({email:req.body.email});
    if(emailExist){
        return res.status(400).send("Email already exits");
    }


    //hash the password after user checked
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await brcypt.hash(req.body.password,salt);
    //create a user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try{
        const savedUser=await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }
});



router.post('login',async  (res,req)=>{
    const {error} = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message );
    }
 //check if already exist
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send("Email or password is wrong");
    }
    const validPass= await brcypt.compare(req.body.pasword,user.password);
    if(!validPass) return res.status(400).res.send("email or password is wrong");
    const token= jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    res.send("logged in");
})

module.exports=router; 