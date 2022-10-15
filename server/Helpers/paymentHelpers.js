const { razorpay } = require("../Common/strings")
let Razorpay = require('razorpay');
const crypto = require('crypto')

var instance = new Razorpay({ key_id: razorpay.key_id, key_secret: razorpay.key_secret })


module.exports = {
    createSubscription: ()=> {
        return new Promise(async(resolve,reject)=> {
            const params = {
                plan_id: razorpay.plan_id,
                customer_notify: 1,
                quantity: 1,
                total_count: 10,
            }
            
            const response = await instance.subscriptions.create(params)

            resolve(response)
              
        })
    },
    verifyPayment: (res_datas)=> {
        console.log(res_datas);
        return new Promise((resolve,reject)=> {
            const crypt = crypto.createHmac('sha256', razorpay.key_secret)
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
    }



}