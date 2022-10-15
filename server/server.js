let express = require("express");
let app = express();
const cors = require("cors");
const {
  client_database_name,
  admin_database_name,
  mongo_url,
} = require("./Common/strings");
const { client_collections } = require("./Common/Collections");
const clientHelpers = require("./Helpers/clientHelpers");
const adminHelpers = require("./Helpers//adminHelpers");
const paymentHelpers = require("./Helpers/paymentHelpers");
const MongoClient = require("mongodb").MongoClient;
var nodemailer = require('nodemailer');

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Connected To React");
});

// Replace the uri string with your connection string.
const uri = mongo_url;

const client = new MongoClient(uri);

async function run() {
  try {
    const client_db = client.db(client_database_name);
    const admin_db = client.db(admin_database_name);

    // Database Codes

    app.post("/createcard", (req, res) => {
      clientHelpers.cleanCardDatas(req.body).then((data) => {
        clientHelpers
          .createCard(data, client_db)
          .then((response, card_data) => {
            res.redirect(
              `create/preview/${req.body.company_name.replace(/[ ]/g, "-")}`
            );
            res.end();
          })
          .catch((err) => {
            console.log(err);
            res.end();
          });
      });
    });

    app.get(`/card/:company_name`, (req, res) => {
      let comp_name = req.params.company_name.replace(/[-]/g, " ");
      clientHelpers
        .getCardData(comp_name, client_db)
        .then((response) => {
          res.json(response);
          res.end();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    app.post('/update/feedback/:name',(req,res)=> {
      console.log(req.body);
      let obj = {
        name : req.body.name,
        feedback: req.body.feedback,
        date: new Date().getTime()
      }

      clientHelpers.updateFeedback(obj,client_db,req.params.name).then((response)=> {
        let redirect_url = req.params.name.replace(/[ ]/g,'-')
        res.redirect(`/${redirect_url}`)
        window.location.reload()
        res.end()
      }).catch((err)=> {
        console.log(err);
        res.end()
      })

    })

    app.post('/update/view/:comp_name',(req,res)=> {
      clientHelpers.updateViews(req.params.comp_name,client_db).then((response)=> {
        res.end()
      }).catch((err)=> {
        console.log(err);
      })
    })

    app.post('/complete-purchase',(req,res)=> {
      paymentHelpers.createSubscription().then((response)=> {
        console.log(response);
        res.json(response)
      }).catch((err)=> {
        res.json({message: 'Payment Failed',err: err.message})
      })
    })

    app.post('/verify-payment',(req,res)=> {
      paymentHelpers.verifyPayment(req.body).then(()=> {
        res.json({status: true})
      }).catch(()=> {
        res.json({status: false})
      })
    })

    app.post('/payment-successfull/:comp_name',(req,res)=> {
      clientHelpers.afterPaymentCompleteProcessess(req.body,client_db).then(()=> {
        adminHelpers.updateCreatedCard(admin_db,req.params.comp_name).then(()=> {
          res.json({status: true,req_datas: req.body})
        }).catch((err)=> {
          res.json({status: false,err: err.message})
        })
        
      }).catch((err)=> {
        res.json({status: false,err: err.message})
      })
    })

    app.get('/bg-images',(req,res)=> {
      adminHelpers.getBgImages(admin_db).then((response)=> {
        console.log(admin_db);
        res.json(response)
      })
    })

    app.post('/create/cancel-purchase/:comp_name',(req,res)=> {
      clientHelpers.cancelPurchase(client_db,req.params.comp_name).then(()=> {
          res.json({status: true})
      }).catch((err)=> {
        res.json({status: false})
      })
    })

    app.post('/updatecard/:comp_name',(req,res)=> {
      clientHelpers.updateCleanCardDatas(req.body).then((response)=> {
        console.log(
          'Cleaned Datas : ',
         response
        );
        clientHelpers.updateCard(response,client_db,req.params.comp_name).then((response)=> {
          let new_comp_name = req.body.company_name.replace(/[ ]/g,'-')
          res.redirect('/create/successfull/' + new_comp_name)
        }).catch((err)=> { 
          console.log(err.message);
        })
      })
    })

    app.post('/manage/card/close-card',(req,res)=> {
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

    // Database Codes End
  } finally {
  }
}
run().catch(console.dir);

let PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server Started At Port : ${PORT}`));
