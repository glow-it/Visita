let express = require("express")
let app = express()
const cors=require("cors");


const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=> {
    res.send("Connected To React")
})



let PORT = process.env.PORT || 3005
app.listen(PORT,()=> console.log(`Server Started At Port : ${PORT}`))