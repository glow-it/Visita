const { razorpay } = require("../Common/strings")
let Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv')


dotenv.config()
var instance = new Razorpay({ key_id: process.env.razorpay_key_id, key_secret: process.env.razorpay_key_secret })


module.exports = {
    createSubscription: ()=> {
        return new Promise(async(resolve,reject)=> {
            const params = {
                plan_id: process.env.razorpay_plan_id,
                customer_notify: 1,
                quantity: 1,
                total_count: 10,
            }
            
             let response = await  instance.subscriptions.create(params)
                    resolve(response)
              
        })
    },
    verifyPayment: (res_datas)=> {
       
        return new Promise((resolve,reject)=> {
            const crypt = crypto.createHmac('sha256', process.env.razorpay_key_secret)
            crypt.update(res_datas.payment_id+'|'+res_datas.subscription_id)
            const digest = crypt.digest('hex');
            if(digest === res_datas.signature){
               resolve()
            }else{
               reject()
            }
        })
    },

    cancelSubscription: (data)=> {
        return new Promise(async(resolve,reject)=> {
            let response = await  instance.subscriptions.cancel(data.sub_id)
        if(response){
            resolve()
        }else{
            reject()
        }
        })
    },

    franchiseeCreatePayment:()=> {
       return new Promise(async(resolve,reject)=> {
        let response = await  instance.orders.create({
            amount: 99900,
            currency: "INR",
            receipt: new Date().getTime(),
          })
          resolve(response)
       })
    }



}