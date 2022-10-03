let express = require("express")
let app = express()
const cors=require("cors");
const { client_database_name, admin_database_name, mongo_url } = require("./Common/strings");
const { client_collections } = require("./Common/Collections");
const clientHelpers = require("./Helpers/clientHelpers");
const adminHelpers = require("./Helpers//adminHelpers");
const MongoClient = require("mongodb").MongoClient;


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


// Replace the uri string with your connection string.
const uri = mongo_url

const client = new MongoClient(uri);

async function run() {
  try {
    const client_db = client.db(client_database_name);
    const admin_db = client.db(admin_database_name);


    // Database Codes

    app.post('/createcard',(req,res)=> {
        clientHelpers
        clientHelpers.createCard(req.body,client_db).then((response,card_data)=> {
            res.redirect(`create/preview/${req.body.company_name.replace(/[ ]/g,'-')}`)
            res.end()
        }).catch((err)=> {
            console.log(err);
            res.end()
        })
     })

     app.get(`/card/:company_name`,(req,res)=> {
     let comp_name = (req.params.company_name.replace(/[-]/g,' '))
        clientHelpers.getCardData(comp_name,client_db).then((response)=> {
            res.json(response)
            res.end()
        }).catch((err)=> {
            console.log(err);
        })
    })




    // Database Codes End



  } finally {
   
  }
}
run().catch(console.dir);


let PORT = process.env.PORT || 3005
app.listen(PORT,()=> console.log(`Server Started At Port : ${PORT}`))