const {Router}=require("express")
const userModel=require('../models/user.model.js')
const router=Router()


router.get('/signin',(req,res)=>{
    return res.render("signin")
})

router.post('/signin',async(req,res)=>{
    const { email, password } = req.body;
    try { 
        const token = await userModel.matchPasswordAndGenerateToken(email, password);
        return res.cookie('token', token).redirect("/");
    } catch (error) {
        res.render('signin', { error:"Email Or Password Incorrect"
         });
    }  
})

router.get('/signup',(req,res)=>{
    return res.render("signup")
})

router.post('/signup',async(req,res)=>{
    const {fullName,email,password}=req.body

    await userModel.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})





module.exports=router