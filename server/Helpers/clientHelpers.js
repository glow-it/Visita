const { ObjectId, Db } = require("mongodb");
const { client_collections } = require("../Common/Collections");

module.exports = {
  createCard: (data, client_db) => {
    return new Promise((resolve, reject) => {
      client_db
        .collection(client_collections.visiting_card_datas)
        .insertOne(data)
        .then((response) => {
          resolve(response, data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getCardData: (company_name, client_db) => {
    return new Promise(async(resolve, reject) => {
      if(company_name == 'all') {
        let response = await client_db
        .collection(client_collections.visiting_card_datas).find().toArray()
        resolve(response)
      }else{
        client_db
        .collection(client_collections.visiting_card_datas)
        .findOne({ company_name: { $regex: new RegExp(company_name, "i") } })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
      }
     
    });
  },

  updateCleanCardDatas: (data) => {
    return new Promise((resolve, reject) => {

      let products = [
        {
          product_image: data.product_image_1,
          product_name: data.product_1_name,
          product_offerprice: data.product_1_offerprice,
          product_orgprice: data.product_1_orgprice,
          product_link: data.product_1_link,
        },

        {
          product_image: data.product_image_2,
          product_name: data.product_2_name,
          product_offerprice: data.product_2_offerprice,
          product_orgprice: data.product_2_orgprice,
          product_link: data.product_2_link,
        },

        {
          product_image: data.product_image_3,
          product_name: data.product_3_name,
          product_offerprice: data.product_3_offerprice,
          product_orgprice: data.product_3_orgprice,
          product_link: data.product_3_link,
        },

        {
          product_image: data.product_image_4,
          product_name: data.product_4_name,
          product_offerprice: data.product_4_offerprice,
          product_orgprice: data.product_4_orgprice,
          product_link: data.product_4_link,
        },

        {
          product_image: data.product_image_5,
          product_name: data.product_5_name,
          product_offerprice: data.product_5_offerprice,
          product_orgprice: data.product_5_orgprice,
          product_link: data.product_5_link,
        },

        {
          product_image: data.product_image_6,
          product_name: data.product_6_name,
          product_offerprice: data.product_6_offerprice,
          product_orgprice: data.product_6_orgprice,
        },

        {
          product_image: data.product_image_7,
          product_name: data.product_7_name,
          product_offerprice: data.product_7_offerprice,
          product_orgprice: data.product_7_orgprice,
          product_link: data.product_7_link,
        },

        {
          product_image: data.product_image_8,
          product_name: data.product_8_name,
          product_offerprice: data.product_8_offerprice,
          product_orgprice: data.product_8_orgprice,
          product_link: data.product_8_link,
        },

        {
          product_image: data.product_image_9,
          product_name: data.product_9_name,
          product_offerprice: data.product_9_offerprice,
          product_orgprice: data.product_9_orgprice,
          product_link: data.product_9_link,
        },

        {
          pproduct_image: data.pproduct_image_10,
          product_name: data.product_10_name,
          product_offerprice: data.product_10_offerprice,
          product_orgprice: data.product_10_orgprice,
          product_link: data.product_10_link,
        },
      ]

      let image_gallery = [
        data.image_1,
        data.image_2,
        data.image_3,
        data.image_4,
        data.image_5,
        data.image_6,
        data.image_7,
        data.image_8,
        data.image_9,
        data.image_10,
      ]

      let yt_videos = [
        data.ytvideo_1_link,
        data.ytvideo_2_link,
        data.ytvideo_3_link,
        data.ytvideo_4_link,
        data.ytvideo_5_link,
      ]

      let obj = {
        about: data.about,
        account_holder_name: data.account_holder_name,
        address: data.address,
        alt_phone_no: data.alt_phone_no,
        bank_account_number: data.bank_account_number,
        bank_ifsc_code: data.bank_ifsc_code,
        bank_name: data.bank_name,
        city: data.city,
        company_category: data.company_category,
        company_name: data.company_name,
        email_id: data.email_id,
        facebook_link: data.facebook_link,
        first_name: data.first_name,
        googlepay_number: data.googlepay_number,
        googlepay_qrcode: data.googlepay_qrcode,
        paytm_qrcode: data.paytm_qrcode,
        phonepe_qrcode: data.phonepe_qrcode,
        gst: data.gst,
        instagram_link: data.instagram_link,
        last_name: data.last_name,
        linkedin_link: data.linkedin_link,
        location: data.location,
        gmap_location: data.gmap_location,
        logo: data.logo,
        paytm_number: data.paytm_number,
        phone_no: data.phone_no,
        phonepe: data.phonepe,
        pinterest_link: data.pinterest_link,
        position: data.position,
        since: data.since,
        theme_color: data.theme_color,
        twitter_link: data.twitter_link,
        website: data.website,
        whatsapp_no: data.whatsapp_no,
        youtube_link: data.youtube_link,
      };

      resolve({obj,yt_videos,products,image_gallery});
    });
  },
  cleanCardDatas: (data) => {
    return new Promise((resolve, reject) => {


      let obj = {
        about: data.about,
        account_holder_name: data.account_holder_name,
        address: data.address,
        alt_phone_no: data.alt_phone_no,
        bank_account_number: data.bank_account_number,
        bank_ifsc_code: data.bank_ifsc_code,
        bank_name: data.bank_name,
        city: data.city,
        company_category: data.company_category,
        company_name: data.company_name,
        email_id: data.email_id,
        facebook_link: data.facebook_link,
        first_name: data.first_name,
        googlepay_number: data.googlepay_number,
        googlepay_qrcode: data.googlepay_qrcode,
        paytm_qrcode: data.paytm_qrcode,
        phonepe_qrcode: data.phonepe_qrcode,
        gst: data.gst,
        image_gallery: [
          data.image_1,
          data.image_2,
          data.image_3,
          data.image_4,
          data.image_5,
          data.image_6,
          data.image_7,
          data.image_8,
          data.image_9,
          data.image_10,
        ],
        instagram_link: data.instagram_link,
        last_name: data.last_name,
        linkedin_link: data.linkedin_link,
        location: data.location,
        gmap_location: data.gmap_location,
        logo: data.logo,
        paytm_number: data.paytm_number,
        phone_no: data.phone_no,
        phonepe: data.phonepe,
        pinterest_link: data.pinterest_link,
        position: data.position,

        products: [
          {
            product_image: data.product_image_1,
            product_name: data.product_1_name,
            product_offerprice: data.product_1_offerprice,
            product_orgprice: data.product_1_orgprice,
            product_link: data.product_1_link,
          },

          {
            product_image: data.product_image_2,
            product_name: data.product_2_name,
            product_offerprice: data.product_2_offerprice,
            product_orgprice: data.product_2_orgprice,
            product_link: data.product_2_link,
          },

          {
            product_image: data.product_image_3,
            product_name: data.product_3_name,
            product_offerprice: data.product_3_offerprice,
            product_orgprice: data.product_3_orgprice,
            product_link: data.product_3_link,
          },

          {
            product_image: data.product_image_4,
            product_name: data.product_4_name,
            product_offerprice: data.product_4_offerprice,
            product_orgprice: data.product_4_orgprice,
            product_link: data.product_4_link,
          },

          {
            product_image: data.product_image_5,
            product_name: data.product_5_name,
            product_offerprice: data.product_5_offerprice,
            product_orgprice: data.product_5_orgprice,
            product_link: data.product_5_link,
          },

          {
            product_image: data.product_image_6,
            product_name: data.product_6_name,
            product_offerprice: data.product_6_offerprice,
            product_orgprice: data.product_6_orgprice,
          },

          {
            product_image: data.product_image_7,
            product_name: data.product_7_name,
            product_offerprice: data.product_7_offerprice,
            product_orgprice: data.product_7_orgprice,
            product_link: data.product_7_link,
          },

          {
            product_image: data.product_image_8,
            product_name: data.product_8_name,
            product_offerprice: data.product_8_offerprice,
            product_orgprice: data.product_8_orgprice,
            product_link: data.product_8_link,
          },

          {
            product_image: data.product_image_9,
            product_name: data.product_9_name,
            product_offerprice: data.product_9_offerprice,
            product_orgprice: data.product_9_orgprice,
            product_link: data.product_9_link,
          },

          {
            pproduct_image: data.pproduct_image_10,
            product_name: data.product_10_name,
            product_offerprice: data.product_10_offerprice,
            product_orgprice: data.product_10_orgprice,
            product_link: data.product_10_link,
          },
        ],

        since: data.since,
        theme_color: data.theme_color,
        twitter_link: data.twitter_link,
        website: data.website,
        whatsapp_no: data.whatsapp_no,
        youtube_link: data.youtube_link,
        yt_videos: [
          data.ytvideo_1_link,
          data.ytvideo_2_link,
          data.ytvideo_3_link,
          data.ytvideo_4_link,
          data.ytvideo_5_link,
        ],
        _id: data._id,
        isActivated: false,
        views: 1,
        feedbacks: [],
        specials: data.specials,
        features: data.features,
        created_at: new Date().getTime(),
        franchisee: data.franchisee
      };

      resolve(obj);
    });
  },

  updateFeedback: (data, client_db, card_name) => {
    return new Promise((resolve, reject) => {
      client_db
        .collection(client_collections.visiting_card_datas)
        .updateOne({ company_name: card_name }, { $push: { feedbacks: data } })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateViews: (comp_name, client_db) => {
    return new Promise((resolve, reject) => {
      client_db
        .collection(client_collections.visiting_card_datas)
        .updateOne({ company_name: comp_name }, { $inc: { views: 1 } });
    });
  },

  afterPaymentCompleteProcessess: (activated, client_db) => {
    let company_name = activated.company_name.replace(/[-]/g, " ");

    return new Promise((resolve, reject) => {
      client_db
        .collection(client_collections.visiting_card_datas)
        .updateOne(
          { company_name: company_name },
          { $set: { activated } },
          false,
          true
        )
        .then(() => {
          client_db
            .collection(client_collections.visiting_card_datas)
            .updateOne(
              { company_name: company_name },
              { $set: { isActivated: true } }
            )
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  cancelPurchase: (client_db,comp_name)=> {
    let company_name = comp_name.replace(/[-]/g,' ')
    return new Promise((resolve,reject)=> {
      client_db.collection(client_collections.visiting_card_datas).deleteOne( { company_name: company_name } ).then(()=> {
        resolve()
      }).catch((err)=> {
        reject()
      })
    })
  },

  updateCard: (update_data,client_db,comp_name,yt_videos,products,image_gallery) => {
    return new Promise((resolve,reject)=> {
      let company_name = comp_name.replace(/[-]/g," ")

      let all_data = update_data.obj
      let yt_videos = update_data.yt_videos
      let products = update_data.products
      let image_gallery = update_data.image_gallery

      console.log(
        'In Update Card : ',
        all_data,
        yt_videos,
        products,
        image_gallery
      );

      client_db.collection(client_collections.visiting_card_datas).updateOne( { company_name: company_name },
      {
        $set: {
          

          about: all_data.about,
        account_holder_name: all_data.account_holder_name,
        address: all_data.address,
        alt_phone_no: all_data.alt_phone_no,
        bank_account_number: all_data.bank_account_number,
        bank_ifsc_code: all_data.bank_ifsc_code,
        bank_name: all_data.bank_name,
        city: all_data.city,
        company_category: all_data.company_category,
        company_name: all_data.company_name,
        email_id: all_data.email_id,
        facebook_link: all_data.facebook_link,
        first_name: all_data.first_name,
        googlepay_number: all_data.googlepay_number,
        googlepay_qrcode: all_data.googlepay_qrcode,
        paytm_qrcode: all_data.paytm_qrcode,
        phonepe_qrcode: all_data.phonepe_qrcode,
        gst: all_data.gst,
        instagram_link: all_data.instagram_link,
        last_name: all_data.last_name,
        linkedin_link: all_data.linkedin_link,
        location: all_data.location,
        gmap_location: all_data.gmap_location,
        logo: all_data.logo,
        paytm_number: all_data.paytm_number,
        phone_no: all_data.phone_no,
        phonepe: all_data.phonepe,
        pinterest_link: all_data.pinterest_link,
        position: all_data.position,
        since: all_data.since,
        theme_color: all_data.theme_color,
        twitter_link: all_data.twitter_link,
        website: all_data.website,
        whatsapp_no: all_data.whatsapp_no,
        youtube_link: all_data.youtube_link,
          yt_videos,
          products,
          image_gallery
        }
      }).then(()=> {
        resolve()
      }).catch((err)=> {
        reject(err)
      })

    })
  },

  deleteCard: (data,client_db)=> {
    return new Promise((resolve,reject)=> {
      client_db.collection(client_collections.visiting_card_datas).deleteOne({company_name: data.company_name}).then(()=> {
        resolve()
      }).catch(()=> {
        reject()
      })
    })
  }

};
