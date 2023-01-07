let express = require("express");
let app = express();
const cors = require("cors");
const {
  client_database_name,
  admin_database_name,
  mongo_uri,
  franchisee_database_name,
} = require("./Common/strings");
const { client_collections } = require("./Common/collections");
const clientHelpers = require("./Helpers/clientHelpers");
const adminHelpers = require("./Helpers//adminHelpers");
const paymentHelpers = require("./Helpers/paymentHelpers");
const MongoClient = require("mongodb").MongoClient;
const { createFranchisee } = require("./Helpers/FranchiseeHelpers");
const session = require('express-session');
const FranchiseeHelpers = require("./Helpers/FranchiseeHelpers");
const cookieParser = require('cookie-parser');
const path = require('path');
const aiHelpers = require("./Helpers/aiHelpers");
const dotenv = require('dotenv')

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
    

dotenv.config()
app.use(cors(corsOptions));





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret:'qdwefwejfnHGCCfschGSVvTDSXSCStcvtctbctsctctthfTAgf7hthfg7FSTf6tF^SRHfh6f^SF6rf6CNSrc6rsbcb6rSc',
  resave: false,
  saveUninitialized: false,
  cookie: {
 
    // Session expires after 1 day of inactivity.
    expires: 86400000
}


   

}))
// cookieParser middleware
app.use(cookieParser());

app.get('/', function (req, res) {
  res.status(200).send({text:"Hello from visita server..."})
});

// Replace the uri string with your connection string.
const uri = process.env.mongo_uri;

const client = new MongoClient(uri); 

async function run() {
  try {
    const client_db = client.db(process.env.client_database_name);
    const admin_db = client.db(process.env.admin_database_name);
    const franchisee_db = client.db(process.env.franchisee_database_name);

    // Database Codes

    app.post("/createcard", (req, res, next) => {
      clientHelpers.cleanCardDatas(req.body).then((data) => {
        clientHelpers
          .createCard(data, client_db)
          .then((response, card_data) => {
            res.status(200).send({redirect_url:`/create/preview/${req.body.company_name.replace(/[ ]/g, "-")}`})
            res.end();
          })
          .catch((err) => {
            console.log(err);
            res.end();
            res.status(404).send({redirect_url:`/create/preview/${req.body.company_name.replace(/[ ]/g, "-")}`})
          });
      });
    });

    app.get(`/card/:company_name`, (req, res, next) => {
      let comp_name = req.params.company_name.replace(/[-]/g, " ");
      clientHelpers
        .getCardData(comp_name, client_db)
        .then((response) => {
          res.json(response)
          res.end();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    app.post('/update/feedback/:name',(req,res,next)=> {



      let obj = {
        name : req.body.name,
        feedback: req.body.feedback,
        date: new Date().getTime()
      }

      clientHelpers.updateFeedback(obj,client_db,req.params.name).then((response)=> {
        res.end()
      }).catch((err)=> {
        console.log(err);
        res.end()
      })

    }) 

    app.post('/submit/customer-details/:name',(req,res,next)=> {

      let obj = {
        name : req.body.name,
        phone_no: req.body.phone_no,
        date: new Date().getTime()
      }

      clientHelpers.updateCustomerDetails(obj,client_db,req.params.name).then((response)=> {
        let redirect_url = req.params.name.replace(/[ ]/g,'-')
        res.end()
      }).catch((err)=> {
        console.log(err);
        res.end()
      })

    })

    app.post('/update/view/:comp_name',(req,res,next)=> {
      clientHelpers.updateViews(req.params.comp_name,client_db).then((response)=> {
        res.end()
      }).catch((err)=> {
        console.log(err);
      })
    })

    app.post('/complete-purchase',(req,res,next)=> {

 


      // Check Is This First Card
      if(req.body.length == 0){

      
        paymentHelpers.createSubscription().then((response)=> {
          res.json({sub_data:response,isFirst: false})
        }).catch((err)=> {
          console.log(err);
          res.json({message: 'Payment Failed',err: err.message})
        })
        
       
      }else{





        if(req.body.isFranchiseeFirstCardCreated == "false"){
         
          res.json({isFirst: true})
        }else{
         
          paymentHelpers.createSubscription().then((response)=> {
            res.json({sub_data:response,isFirst: false})
          }).catch((err)=> {
            console.log(err);
            res.json({message: 'Payment Failed',err: err.message})
          })
        }


        
      }

    
    })

    app.post('/verify-payment',(req,res,next)=> {
      paymentHelpers.verifyPayment(req.body).then(()=> {
        res.json({status: true})
      }).catch(()=> {
        res.json({status: false}) 
      })
    })

    app.post('/payment-successfull/:comp_name',(req,res,next)=> {
      clientHelpers.afterPaymentCompleteProcessess(req.body,client_db).then(()=> {
        adminHelpers.updateCreatedCard(admin_db,req.params.comp_name,req.body.phone_no,req.body.franchisee_email).then(()=> {

          if(req.body.franchisee_email != "no franchisee"){
            FranchiseeHelpers.updateCreatedCards(req.body.franchisee_email,franchisee_db).then(()=> {
              res.json({status: true,req_datas: req.body})
            }).catch((err)=> {
              res.json({status: false,err: err.message})
            })
          }else{
            res.json({status: true,req_datas: req.body})
          }

          
        }).catch((err)=> {
          res.json({status: false,err: err.message})
        })


        
      }).catch((err)=> {
        console.log(err.message);
        res.json({status: false,err: err.message})
      })
    })

    app.get('/bg-images',(req,res,next)=> {
      adminHelpers.getBgImages(admin_db).then((response)=> {
       
        res.json(response)
      })
    })

    app.post('/create/cancel-purchase/:comp_name',(req,res,next)=> {
      clientHelpers.cancelPurchase(client_db,req.params.comp_name).then(()=> {
          res.json({status: true})
      }).catch((err)=> { 
        res.json({status: false})
      })
    })

    app.post('/updatecard/:comp_name',(req,res,next)=> {
      clientHelpers.updateCleanCardDatas(req.body).then((response)=> {
       
        clientHelpers.updateCard(response,client_db,req.params.comp_name).then((response)=> {
          let new_comp_name = req.body.company_name.replace(/[ ]/g,'-')
          res.status(200).send({redirect_url:'/create/successfull/' + new_comp_name})
          res.end()
        }).catch((err)=> { 
          res.status(404).send({redirect_url:'/create/successfull/' + new_comp_name})
          console.log(err.message);
          res.end()
        })
      })
    })

    app.post('/manage/card/close-card',(req,res,next)=> {
      paymentHelpers.cancelSubscription(req.body).then(()=> {
        clientHelpers.deleteCard(req.body,client_db).then(()=> {
          res.json({status: true})
        }).catch((err)=> { 
          res.json({status: false})
        })
      }).catch((err)=> {
        res.json({status: false})
      })
    })


    app.post('/create-franchisee-payment',(req,res,next)=> {
      paymentHelpers.franchiseeCreatePayment().then((response)=> {
        let payment_data = response
        res.json({status: true,payment_data: payment_data})
      }).catch((err)=> {
        res.json({status: false})
      })
    }) 


    app.post('/franchisee/register',(req,res,next)=> {
     createFranchisee(franchisee_db,req.body).then(()=> {
        res.cookie('isFranchiseeLogined',true)
        res.cookie('franchiseeEmail',req.body.email)
        res.status(200).send({redirect_url:'/manage/franchisee'})
        res.end()
     }).catch((err)=> {
      res.cookie('isFranchiseeLogined',false)
      res.status(404).send({redirect_url:'/manage/franchisee'})
      res.end()
     })
    })

    app.post('/franchisee/login',(req,res,next)=> {
      FranchiseeHelpers.loginFranchisee(req.body,franchisee_db).then(()=> {
        res.cookie('franchiseeEmail',req.body.email)
        res.cookie('isFranchiseeLogined',true)
        res.send({status: true})
        
      }).catch((err)=> {
        res.cookie('isFranchiseeLogined',false)
        console.log('Login Failed',err);
        res.send({status: false,err})
        res.end()
      })
    })

    app.get('/get-franchisee-datas',(req,res,next)=> {



        FranchiseeHelpers.getFranchisee(req.body,franchisee_db).then((response)=> {
          res.json({franchisee_data:response})
        }).catch((err)=> {
          console.log(err.message);
          res.json({status: false,err:err.message})
        })
      
      
    

    })

    app.get('/get-franchisee-datas/:franchisee_email',(req,res,next)=> {


        FranchiseeHelpers.getFranchisee(req.params.franchisee_email,franchisee_db).then((response)=> {
          res.json({franchisee_data:response})
        }).catch((err)=> {
          console.log(err);
          res.json({status: false,err:err.message})
        })
      
      
    

    })

    app.get('/get-all-created-cards',(req,res,next)=> {
      adminHelpers.getAllCreatedDatas(admin_db).then((response)=> {
        res.json(response)
      })
    })

    app.get('/get-all-franchisees',(req,res,next)=> {
      FranchiseeHelpers.getAllFranchisees(franchisee_db).then((response)=> {
        res.json(response)
      })
    })

    app.post('/salary-payed/:franchisee_email',(req,res,next)=> {
      adminHelpers.salaryPayed(franchisee_db,req.params.franchisee_email).then(()=> {

        res.json({status:true})
      }).catch((err)=> {
        console.log("err",err);
        res.json({status:false})
        res.json({err: err.message})

      })
    })


    app.post('/generate-completion',(req,res,next)=> {
      aiHelpers.generateCompletion(req.body.prompt,req.body.temperature).then((response)=> {
        res.json({status:true,response:response.data.choices[0].text})
      }).catch((err)=> {
        console.log(err);
        res.json({status:false})

      })
    })

    


    // Database Codes End
  } finally {
  }
}
run().catch(console.dir);

let PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server Started At Port : ${PORT}`));
