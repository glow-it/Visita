const { franchisee_collections } = require("../Common/collections");

module.exports = {
  createFranchisee: (franchisee_db, franchisee_data) => {
    return new Promise((resolve, reject) => {
      let franchisee = franchisee_data;
      franchisee.franchisee_id = new Date().getTime();
      franchisee.created_cards_thismonth = 0;
      franchisee.created_cards_total = 0;
      franchisee.payed_at = new Date().getTime();

      franchisee_db
        .collection(franchisee_collections.franchisees)
        .insertOne(franchisee)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  loginFranchisee: (data, franchisee_db) => {
    return new Promise((resolve, reject) => {
      franchisee_db
        .collection(franchisee_collections.franchisees)
        .findOne({ email: data.email })
        .then((response) => {
          if (response.password == data.password) {
            resolve();
          } else {
            reject("Invalid Password");
          }
        })
        .catch((err) => {
          reject("Franchisee Not Found");
        });
    });
  },

  getFranchisee: (franchisee_email, franchisee_db) => {
    return new Promise((resolve, reject) => {
      franchisee_db
        .collection(franchisee_collections.franchisees)
        .findOne({ email: franchisee_email })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateCreatedCards: (franchisee_email, franchisee_db) => {
    return new Promise((resolve, reject) => {
      franchisee_db
        .collection(franchisee_collections.franchisees)
        .updateOne(
          { email: franchisee_email },
          { $inc: { created_cards_thismonth: 1, created_cards_total: 1 } }
        )
        .then(() => {
          franchisee_db
            .collection(franchisee_collections.franchisees)
            .updateOne(
              { email: franchisee_email },
              { $set: { isFranchiseeFirstCardCreated: "true" } }
            )
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getAllFranchisees: (franchisee_db) => {
    return new Promise(async (resolve, reject) => {
      let response = await franchisee_db
        .collection(franchisee_collections.franchisees)
        .find();
      if (response) {
        resolve(response.toArray());
      }
    });
  },
};
