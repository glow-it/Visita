const { client_collections } = require("../Common/Collections");

module.exports = {

    createCard:(data,client_db)=> {
        return new Promise((resolve,reject)=> {
            client_db.collection(client_collections.visiting_card_datas).insertOne(data).then((response)=> {
                resolve(response,data);
               }).catch((err)=>{
                reject(err);
               })
        })
    },

    getCardData:(company_name,client_db)=> {
        return new Promise((resolve,reject)=> {
            client_db.collection(client_collections.visiting_card_datas).findOne({company_name:{ '$regex' : new RegExp(company_name, "i")}}).then((response)=> {
                resolve(response)
            }).catch((err)=> {
                reject(err)
            })
        })
    }


}