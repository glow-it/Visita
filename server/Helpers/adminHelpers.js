const { admin_collections } = require("../Common/Collections");

module.exports = {
    getBgImages: (admin_db)=> {
        return new Promise(async(resolve,reject)=> {
            let response = await admin_db.collection(admin_collections.bg_images).find()
            resolve(response.toArray())
        })
    },

    updateCreatedCard: (admin_db,comp_name,phone_no,franchisee_email)=> {
        return new Promise((resolve,reject)=> {
            let obj = {
                comp_name: comp_name,
                created_at: Date.now(),
                created_date: new Date(),
                phone_no,
                franchisee_email
            }
            admin_db.collection(admin_collections.created_cards).insertOne(obj).then(()=> {
                resolve()
            }).catch((err)=> {
                reject(err)
            })
        })
    },

    getAllCreatedDatas:(admin_db)=> {
        return new Promise(async(resolve,reject)=> {
            let response = await admin_db.collection(admin_collections.created_cards).find()
            if(response){
                resolve(response.toArray())
            }
        })
    },

    

}