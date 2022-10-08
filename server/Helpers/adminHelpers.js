const { admin_collections } = require("../Common/Collections");

module.exports = {
    getBgImages: (admin_db)=> {
        return new Promise(async(resolve,reject)=> {
            let response = await admin_db.collection(admin_collections.bg_images).find()
            resolve(response.toArray())
        })
    },

    updateCreatedCard: (admin_db,comp_name)=> {
        return new Promise((resolve,reject)=> {
            let obj = {
                comp_name: comp_name,
                created_at: Date.now(),
                active: true,
                created_date: new Date()
            }
            admin_db.collection(admin_collections.created_cards).insertOne(obj).then(()=> {
                resolve()
            }).catch((err)=> {
                reject(err)
            })
        })
    },

}