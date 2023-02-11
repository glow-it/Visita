const {
  admin_collections,
  franchisee_collections,
} = require("../Common/collections");

module.exports = {
  getBgImages: (admin_db) => {
    return new Promise(async (resolve, reject) => {
      let response = await admin_db
        .collection(admin_collections.bg_images)
        .find();
      resolve(response.toArray());
    });
  },

  updateCreatedCard: async (admin_db, comp_name, phone_no, franchisee_email, isPremium, franchisee_db) => {
    try {
      let obj = {
        comp_name: comp_name,
        created_at: Date.now(),
        isPremium,
        phone_no,
        franchisee_email,
      };
      await admin_db.collection(admin_collections.created_cards).insertOne(obj);

      if(franchisee_email != "no franchisee"){
        await franchisee_db.collection(franchisee_collections.franchisees).updateOne(
          { email: franchisee_email },
          { $inc: { created_cards_thismonth: 1, created_cards_total: 1 } }
        );
    
        await franchisee_db.collection(franchisee_collections.franchisees).updateOne(
          { email: franchisee_email },
          { $set: { isFranchiseeFirstCardCreated: "true" } }
        );
      }

    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getAllCreatedDatas: (admin_db) => {
    return new Promise(async (resolve, reject) => {
      let response = await admin_db
        .collection(admin_collections.created_cards)
        .find();
      if (response) {
        resolve(response.toArray());
      }
    });
  },

  salaryPayed: (franchisee_db, franchisee_email) => {
    return new Promise((resolve, reject) => {
      franchisee_db
        .collection(franchisee_collections.franchisees)
        .updateOne(
          { email: franchisee_email },
          { $set: { created_cards_thismonth: 0 } }
        )
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
