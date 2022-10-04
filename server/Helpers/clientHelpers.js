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
    return new Promise((resolve, reject) => {
      client_db
        .collection(client_collections.visiting_card_datas)
        .findOne({ company_name: { $regex: new RegExp(company_name, "i") } })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
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
        payment_qrcodes: {
          googlepay_qrcode: data.googlepay_qrcode,
          paytm_qrcode: data.paytm_qrcode,
          phonepe_qrcode: data.phonepe_qrcode,
        },
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
        logo: data.logo,
        paytm_number: data.paytm_number,
        phone_no: data.phone_no,
        phonepe: data.phonepe,
        pinterest_link: data.pinterest_link,
        position: data.position,

        products: [
          {
            product_image_1: data.product_image_1,
            product_1_name: data.product_1_name,
            product_1_offerprice: data.product_1_offerprice,
            product_1_orgprice: data.product_1_orgprice,
          },

          {
            product_image_2: data.product_image_2,
            product_2_name: data.product_2_name,
            product_2_offerprice: data.product_2_offerprice,
            product_2_orgprice: data.product_2_orgprice,
          },

          {
            product_image_3: data.product_image_3,
            product_3_name: data.product_3_name,
            product_3_offerprice: data.product_3_offerprice,
            product_3_orgprice: data.product_3_orgprice,
          },

          {
            product_image_4: data.product_image_4,
            product_4_name: data.product_4_name,
            product_4_offerprice: data.product_4_offerprice,
            product_4_orgprice: data.product_4_orgprice,
          },

          {
            product_image_5: data.product_image_5,
            product_5_name: data.product_5_name,
            product_5_offerprice: data.product_5_offerprice,
            product_5_orgprice: data.product_5_orgprice,
          },

          {
            product_image_6: data.product_image_6,
            product_6_name: data.product_6_name,
            product_6_offerprice: data.product_6_offerprice,
            product_6_orgprice: data.product_6_orgprice,
          },

          {
            product_image_7: data.product_image_7,
            product_7_name: data.product_7_name,
            product_7_offerprice: data.product_7_offerprice,
            product_7_orgprice: data.product_7_orgprice,
          },

          {
            product_image_8: data.product_image_8,
            product_8_name: data.product_8_name,
            product_8_offerprice: data.product_8_offerprice,
            product_8_orgprice: data.product_8_orgprice,
          },

          {
            product_image_9: data.product_image_9,
            product_9_name: data.product_9_name,
            product_9_offerprice: data.product_9_offerprice,
            product_9_orgprice: data.product_9_orgprice,
          },

          {
            pproduct_image_10: data.pproduct_image_10,
            product_10_name: data.product_10_name,
            product_10_offerprice: data.product_10_offerprice,
            product_10_orgprice: data.product_10_orgprice,
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
        activated: false,
        views: 1,
        feedbacks: [
          {}
        ]
      };

      resolve(obj);
    });
  },
};
