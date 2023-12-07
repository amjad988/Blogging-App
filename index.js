const path =require("path")
const mongoose=require('mongoose')
const express =require("express")
const userRoute=require('./routes/user.router')
const blogRoute=require('./routes/blog.router.js')
const morgan=require("morgan")
const Blog=require("./models/blog.model.js")
// const helmet=require("helmet")
const cookieParser=require('cookie-parser')
const { checkAuthticationCookie } = require("./middlewares/authentication.middleware")
const app=express()
const env=require("dotenv")
env.config()

// app.use(helmet());

const PORT=process.env.PORT || 3000
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkAuthticationCookie("token"))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then((e)=>console.log("MongoDB Connected"))

app.set("view engine","ejs")
app.set("views",path.resolve('./views'))


app.use(express.static(path.resolve('./public')))
app.get('/',async(req,res)=>{
    const allBlog=await Blog.find({})
    res.render("home",
 {  user:req.user,blogs:allBlog}
    )
})


app.use('/user',userRoute)
app.use('/blog',blogRoute)

app.listen(PORT,()=>console.log(`Server Listen On :${PORT}`))