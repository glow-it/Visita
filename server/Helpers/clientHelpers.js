const { ObjectId, Db } = require("mongodb");
const { client_collections } = require("../Common/collections");

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
          product_description: data.product_1_description,
          product_offerprice: data.product_1_offerprice,
          product_orgprice: data.product_1_orgprice,
          product_link: data.product_1_link,
        },

        {
          product_image: data.product_image_2,
          product_name: data.product_2_name,
          product_description: data.product_2_description,
          product_offerprice: data.product_2_offerprice,
          product_orgprice: data.product_2_orgprice,
          product_link: data.product_2_link,
        },

        {
          product_image: data.product_image_3,
          product_name: data.product_3_name,
          product_description: data.product_3_description,
          product_offerprice: data.product_3_offerprice,
          product_orgprice: data.product_3_orgprice,
          product_link: data.product_3_link,
        },

        {
          product_image: data.product_image_4,
          product_name: data.product_4_name,
          product_description: data.product_4_description,
          product_offerprice: data.product_4_offerprice,
          product_orgprice: data.product_4_orgprice,
          product_link: data.product_4_link,
        },

        {
          product_image: data.product_image_5,
          product_name: data.product_5_name,
          product_description: data.product_5_description,
          product_offerprice: data.product_5_offerprice,
          product_orgprice: data.product_5_orgprice,
          product_link: data.product_5_link,
        },

        {
          product_image: data.product_image_6,
          product_name: data.product_6_name,
          product_description: data.product_6_description,
          product_offerprice: data.product_6_offerprice,
          product_orgprice: data.product_6_orgprice,
        },

        {
          product_image: data.product_image_7,
          product_name: data.product_7_name,
          product_description: data.product_7_description,
          product_offerprice: data.product_7_offerprice,
          product_orgprice: data.product_7_orgprice,
          product_link: data.product_7_link,
        },

        {
          product_image: data.product_image_8,
          product_name: data.product_8_name,
          product_description: data.product_8_description,
          product_offerprice: data.product_8_offerprice,
          product_orgprice: data.product_8_orgprice,
          product_link: data.product_8_link,
        },

        {
          product_image: data.product_image_9,
          product_name: data.product_9_name,
          product_description: data.product_9_description,
          product_offerprice: data.product_9_offerprice,
          product_orgprice: data.product_9_orgprice,
          product_link: data.product_9_link,
        },

        {
          product_image: data.product_image_10,
          product_name: data.product_10_name,
          product_description: data.product_10_description,
          product_offerprice: data.product_10_offerprice,
          product_orgprice: data.product_10_orgprice,
          product_link: data.product_10_link,
        },

        {
          product_image: data.product_image_11,
          product_name: data.product_11_name,
          product_description: data.product_11_description,
          product_offerprice: data.product_11_offerprice,
          product_orgprice: data.product_11_orgprice,
          product_link: data.product_11_link,
        },

        {
          product_image: data.product_image_12,
          product_name: data.product_12_name,
          product_description: data.product_12_description,
          product_offerprice: data.product_12_offerprice,
          product_orgprice: data.product_12_orgprice,
          product_link: data.product_12_link,
        },

        {
          product_image: data.product_image_13,
          product_name: data.product_13_name,
          product_description: data.product_13_description,
          product_offerprice: data.product_13_offerprice,
          product_orgprice: data.product_13_orgprice,
          product_link: data.product_13_link,
        },

        {
          product_image: data.product_image_14,
          product_name: data.product_14_name,
          product_description: data.product_14_description,
          product_offerprice: data.product_14_offerprice,
          product_orgprice: data.product_14_orgprice,
          product_link: data.product_14_link,
        },

        {
          product_image: data.product_image_15,
          product_name: data.product_15_name,
          product_description: data.product_15_description,
          product_offerprice: data.product_15_offerprice,
          product_orgprice: data.product_15_orgprice,
          product_link: data.product_15_link,
        },

        {
          product_image: data.product_image_16,
          product_name: data.product_16_name,
          product_description: data.product_16_description,
          product_offerprice: data.product_16_offerprice,
          product_orgprice: data.product_16_orgprice,
          product_link: data.product_16_link,
        },

        {
          product_image: data.product_image_17,
          product_name: data.product_17_name,
          product_description: data.product_17_description,
          product_offerprice: data.product_17_offerprice,
          product_orgprice: data.product_17_orgprice,
          product_link: data.product_17_link,
        },

        {
          product_image: data.product_image_18,
          product_name: data.product_18_name,
          product_description: data.product_18_description,
          product_offerprice: data.product_18_offerprice,
          product_orgprice: data.product_18_orgprice,
          product_link: data.product_18_link,
        },

        {
          product_image: data.product_image_19,
          product_name: data.product_19_name,
          product_description: data.product_19_description,
          product_offerprice: data.product_19_offerprice,
          product_orgprice: data.product_19_orgprice,
          product_link: data.product_19_link,
        },

        {
          product_image: data.product_image_20,
          product_name: data.product_20_name,
          product_description: data.product_20_description,
          product_offerprice: data.product_20_offerprice,
          product_orgprice: data.product_20_orgprice,
          product_link: data.product_20_link,
        },

        {
          product_image: data.product_image_21,
          product_name: data.product_21_name,
          product_description: data.product_21_description,
          product_offerprice: data.product_21_offerprice,
          product_orgprice: data.product_21_orgprice,
          product_link: data.product_21_link,
        },

        {
          product_image: data.product_image_22,
          product_name: data.product_22_name,
          product_description: data.product_22_description,
          product_offerprice: data.product_22_offerprice,
          product_orgprice: data.product_22_orgprice,
          product_link: data.product_22_link,
        },

        {
          product_image: data.product_image_23,
          product_name: data.product_23_name,
          product_description: data.product_23_description,
          product_offerprice: data.product_23_offerprice,
          product_orgprice: data.product_23_orgprice,
          product_link: data.product_23_link,
        },

        {
          product_image: data.product_image_24,
          product_name: data.product_24_name,
          product_description: data.product_24_description,
          product_offerprice: data.product_24_offerprice,
          product_orgprice: data.product_24_orgprice,
          product_link: data.product_24_link,
        },

        {
          product_image: data.product_image_25,
          product_name: data.product_25_name,
          product_description: data.product_25_description,
          product_offerprice: data.product_25_offerprice,
          product_orgprice: data.product_25_orgprice,
          product_link: data.product_25_link,
        },

        {
          product_image: data.product_image_26,
          product_name: data.product_26_name,
          product_description: data.product_26_description,
          product_offerprice: data.product_26_offerprice,
          product_orgprice: data.product_26_orgprice,
          product_link: data.product_26_link,
        },

        {
          product_image: data.product_image_27,
          product_name: data.product_27_name,
          product_description: data.product_27_description,
          product_offerprice: data.product_27_offerprice,
          product_orgprice: data.product_27_orgprice,
          product_link: data.product_27_link,
        },

        {
          product_image: data.product_image_28,
          product_name: data.product_28_name,
          product_description: data.product_28_description,
          product_offerprice: data.product_28_offerprice,
          product_orgprice: data.product_28_orgprice,
          product_link: data.product_28_link,
        },

        {
          product_image: data.product_image_29,
          product_name: data.product_29_name,
          product_description: data.product_29_description,
          product_offerprice: data.product_29_offerprice,
          product_orgprice: data.product_29_orgprice,
          product_link: data.product_29_link,
        },

        {
          product_image: data.product_image_30,
          product_name: data.product_30_name,
          product_description: data.product_30_description,
          product_offerprice: data.product_30_offerprice,
          product_orgprice: data.product_30_orgprice,
          product_link: data.product_30_link,
        },

        {
          product_image: data.product_image_31,
          product_name: data.product_31_name,
          product_description: data.product_31_description,
          product_offerprice: data.product_31_offerprice,
          product_orgprice: data.product_31_orgprice,
          product_link: data.product_31_link,
        },

        {
          product_image: data.product_image_32,
          product_name: data.product_32_name,
          product_description: data.product_32_description,
          product_offerprice: data.product_32_offerprice,
          product_orgprice: data.product_32_orgprice,
          product_link: data.product_32_link,
        },

        {
          product_image: data.product_image_33,
          product_name: data.product_33_name,
          product_description: data.product_33_description,
          product_offerprice: data.product_33_offerprice,
          product_orgprice: data.product_33_orgprice,
          product_link: data.product_33_link,
        },

        {
          product_image: data.product_image_34,
          product_name: data.product_34_name,
          product_description: data.product_34_description,
          product_offerprice: data.product_34_offerprice,
          product_orgprice: data.product_34_orgprice,
          product_link: data.product_34_link,
        },

        {
          product_image: data.product_image_35,
          product_name: data.product_35_name,
          product_description: data.product_35_description,
          product_offerprice: data.product_35_offerprice,
          product_orgprice: data.product_35_orgprice,
          product_link: data.product_35_link,
        },

        {
          product_image: data.product_image_36,
          product_name: data.product_36_name,
          product_description: data.product_36_description,
          product_offerprice: data.product_36_offerprice,
          product_orgprice: data.product_36_orgprice,
          product_link: data.product_36_link,
        },

        {
          product_image: data.product_image_37,
          product_name: data.product_37_name,
          product_description: data.product_37_description,
          product_offerprice: data.product_37_offerprice,
          product_orgprice: data.product_37_orgprice,
          product_link: data.product_37_link,
        },

        {
          product_image: data.product_image_38,
          product_name: data.product_38_name,
          product_description: data.product_38_description,
          product_offerprice: data.product_38_offerprice,
          product_orgprice: data.product_38_orgprice,
          product_link: data.product_38_link,
        },

        {
          product_image: data.product_image_39,
          product_name: data.product_39_name,
          product_description: data.product_39_description,
          product_offerprice: data.product_39_offerprice,
          product_orgprice: data.product_39_orgprice,
          product_link: data.product_39_link,
        },

        {
          product_image: data.product_image_40,
          product_name: data.product_40_name,
          product_description: data.product_40_description,
          product_offerprice: data.product_40_offerprice,
          product_orgprice: data.product_40_orgprice,
          product_link: data.product_40_link,
        },

        {
          product_image: data.product_image_41,
          product_name: data.product_41_name,
          product_description: data.product_41_description,
          product_offerprice: data.product_41_offerprice,
          product_orgprice: data.product_41_orgprice,
          product_link: data.product_41_link,
        },

        {
          product_image: data.product_image_42,
          product_name: data.product_42_name,
          product_description: data.product_42_description,
          product_offerprice: data.product_42_offerprice,
          product_orgprice: data.product_42_orgprice,
          product_link: data.product_42_link,
        },

        {
          product_image: data.product_image_43,
          product_name: data.product_43_name,
          product_description: data.product_43_description,
          product_offerprice: data.product_43_offerprice,
          product_orgprice: data.product_43_orgprice,
          product_link: data.product_43_link,
        },

        {
          product_image: data.product_image_44,
          product_name: data.product_44_name,
          product_description: data.product_44_description,
          product_offerprice: data.product_44_offerprice,
          product_orgprice: data.product_44_orgprice,
          product_link: data.product_44_link,
        },

        {
          product_image: data.product_image_45,
          product_name: data.product_45_name,
          product_description: data.product_45_description,
          product_offerprice: data.product_45_offerprice,
          product_orgprice: data.product_45_orgprice,
          product_link: data.product_45_link,
        },

        {
          product_image: data.product_image_46,
          product_name: data.product_46_name,
          product_description: data.product_46_description,
          product_offerprice: data.product_46_offerprice,
          product_orgprice: data.product_46_orgprice,
          product_link: data.product_46_link,
        },

        {
          product_image: data.product_image_47,
          product_name: data.product_47_name,
          product_description: data.product_47_description,
          product_offerprice: data.product_47_offerprice,
          product_orgprice: data.product_47_orgprice,
          product_link: data.product_47_link,
        },

        {
          product_image: data.product_image_48,
          product_name: data.product_48_name,
          product_description: data.product_48_description,
          product_offerprice: data.product_48_offerprice,
          product_orgprice: data.product_48_orgprice,
          product_link: data.product_48_link,
        },

        {
          product_image: data.product_image_49,
          product_name: data.product_49_name,
          product_description: data.product_49_description,
          product_offerprice: data.product_49_offerprice,
          product_orgprice: data.product_49_orgprice,
          product_link: data.product_49_link,
        },

        {
          product_image: data.product_image_50,
          product_name: data.product_50_name,
          product_description: data.product_50_description,
          product_offerprice: data.product_50_offerprice,
          product_orgprice: data.product_50_orgprice,
          product_link: data.product_50_link,
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
        show_customer_details_popop: data.show_customer_details_popop
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
            product_description: data.product_1_description,
            product_offerprice: data.product_1_offerprice,
            product_orgprice: data.product_1_orgprice,
            product_link: data.product_1_link,
          },

          {
            product_image: data.product_image_2,
            product_name: data.product_2_name,
            product_description: data.product_2_description,
            product_offerprice: data.product_2_offerprice,
            product_orgprice: data.product_2_orgprice,
            product_link: data.product_2_link,
          },

          {
            product_image: data.product_image_3,
            product_name: data.product_3_name,
            product_description: data.product_3_description,
            product_offerprice: data.product_3_offerprice,
            product_orgprice: data.product_3_orgprice,
            product_link: data.product_3_link,
          },

          {
            product_image: data.product_image_4,
            product_name: data.product_4_name,
            product_description: data.product_4_description,
            product_offerprice: data.product_4_offerprice,
            product_orgprice: data.product_4_orgprice,
            product_link: data.product_4_link,
          },

          {
            product_image: data.product_image_5,
            product_name: data.product_5_name,
            product_description: data.product_5_description,
            product_offerprice: data.product_5_offerprice,
            product_orgprice: data.product_5_orgprice,
            product_link: data.product_5_link,
          },

          {
            product_image: data.product_image_6,
            product_name: data.product_6_name,
            product_description: data.product_6_description,
            product_offerprice: data.product_6_offerprice,
            product_orgprice: data.product_6_orgprice,
          },

          {
            product_image: data.product_image_7,
            product_name: data.product_7_name,
            product_description: data.product_7_description,
            product_offerprice: data.product_7_offerprice,
            product_orgprice: data.product_7_orgprice,
            product_link: data.product_7_link,
          },

          {
            product_image: data.product_image_8,
            product_name: data.product_8_name,
            product_description: data.product_8_description,
            product_offerprice: data.product_8_offerprice,
            product_orgprice: data.product_8_orgprice,
            product_link: data.product_8_link,
          },

          {
            product_image: data.product_image_9,
            product_name: data.product_9_name,
            product_description: data.product_9_description,
            product_offerprice: data.product_9_offerprice,
            product_orgprice: data.product_9_orgprice,
            product_link: data.product_9_link,
          },

          {
            product_image: data.product_image_10,
            product_name: data.product_10_name,
            product_description: data.product_10_description,
            product_offerprice: data.product_10_offerprice,
            product_orgprice: data.product_10_orgprice,
            product_link: data.product_10_link,
          },

          {
            product_image: data.product_image_11,
            product_name: data.product_11_name,
            product_description: data.product_11_description,
            product_offerprice: data.product_11_offerprice,
            product_orgprice: data.product_11_orgprice,
            product_link: data.product_11_link,
          },

          {
            product_image: data.product_image_12,
            product_name: data.product_12_name,
            product_description: data.product_12_description,
            product_offerprice: data.product_12_offerprice,
            product_orgprice: data.product_12_orgprice,
            product_link: data.product_12_link,
          },

          {
            product_image: data.product_image_13,
            product_name: data.product_13_name,
            product_description: data.product_13_description,
            product_offerprice: data.product_13_offerprice,
            product_orgprice: data.product_13_orgprice,
            product_link: data.product_13_link,
          },

          {
            product_image: data.product_image_14,
            product_name: data.product_14_name,
            product_description: data.product_14_description,
            product_offerprice: data.product_14_offerprice,
            product_orgprice: data.product_14_orgprice,
            product_link: data.product_14_link,
          },

          {
            product_image: data.product_image_15,
            product_name: data.product_15_name,
            product_description: data.product_15_description,
            product_offerprice: data.product_15_offerprice,
            product_orgprice: data.product_15_orgprice,
            product_link: data.product_15_link,
          },

          {
            product_image: data.product_image_16,
            product_name: data.product_16_name,
            product_description: data.product_16_description,
            product_offerprice: data.product_16_offerprice,
            product_orgprice: data.product_16_orgprice,
            product_link: data.product_16_link,
          },

          {
            product_image: data.product_image_17,
            product_name: data.product_17_name,
            product_description: data.product_17_description,
            product_offerprice: data.product_17_offerprice,
            product_orgprice: data.product_17_orgprice,
            product_link: data.product_17_link,
          },

          {
            product_image: data.product_image_18,
            product_name: data.product_18_name,
            product_description: data.product_18_description,
            product_offerprice: data.product_18_offerprice,
            product_orgprice: data.product_18_orgprice,
            product_link: data.product_18_link,
          },

          {
            product_image: data.product_image_19,
            product_name: data.product_19_name,
            product_description: data.product_19_description,
            product_offerprice: data.product_19_offerprice,
            product_orgprice: data.product_19_orgprice,
            product_link: data.product_19_link,
          },

          {
            product_image: data.product_image_20,
            product_name: data.product_20_name,
            product_description: data.product_20_description,
            product_offerprice: data.product_20_offerprice,
            product_orgprice: data.product_20_orgprice,
            product_link: data.product_20_link,
          },

          {
            product_image: data.product_image_21,
            product_name: data.product_21_name,
            product_description: data.product_21_description,
            product_offerprice: data.product_21_offerprice,
            product_orgprice: data.product_21_orgprice,
            product_link: data.product_21_link,
          },

          {
            product_image: data.product_image_22,
            product_name: data.product_22_name,
            product_description: data.product_22_description,
            product_offerprice: data.product_22_offerprice,
            product_orgprice: data.product_22_orgprice,
            product_link: data.product_22_link,
          },

          {
            product_image: data.product_image_23,
            product_name: data.product_23_name,
            product_description: data.product_23_description,
            product_offerprice: data.product_23_offerprice,
            product_orgprice: data.product_23_orgprice,
            product_link: data.product_23_link,
          },

          {
            product_image: data.product_image_24,
            product_name: data.product_24_name,
            product_description: data.product_24_description,
            product_offerprice: data.product_24_offerprice,
            product_orgprice: data.product_24_orgprice,
            product_link: data.product_24_link,
          },

          {
            product_image: data.product_image_25,
            product_name: data.product_25_name,
            product_description: data.product_25_description,
            product_offerprice: data.product_25_offerprice,
            product_orgprice: data.product_25_orgprice,
            product_link: data.product_25_link,
          },

          {
            product_image: data.product_image_26,
            product_name: data.product_26_name,
            product_description: data.product_26_description,
            product_offerprice: data.product_26_offerprice,
            product_orgprice: data.product_26_orgprice,
            product_link: data.product_26_link,
          },

          {
            product_image: data.product_image_27,
            product_name: data.product_27_name,
            product_description: data.product_27_description,
            product_offerprice: data.product_27_offerprice,
            product_orgprice: data.product_27_orgprice,
            product_link: data.product_27_link,
          },

          {
            product_image: data.product_image_28,
            product_name: data.product_28_name,
            product_description: data.product_28_description,
            product_offerprice: data.product_28_offerprice,
            product_orgprice: data.product_28_orgprice,
            product_link: data.product_28_link,
          },

          {
            product_image: data.product_image_29,
            product_name: data.product_29_name,
            product_description: data.product_29_description,
            product_offerprice: data.product_29_offerprice,
            product_orgprice: data.product_29_orgprice,
            product_link: data.product_29_link,
          },

          {
            product_image: data.product_image_30,
            product_name: data.product_30_name,
            product_description: data.product_30_description,
            product_offerprice: data.product_30_offerprice,
            product_orgprice: data.product_30_orgprice,
            product_link: data.product_30_link,
          },

          {
            product_image: data.product_image_31,
            product_name: data.product_31_name,
            product_description: data.product_31_description,
            product_offerprice: data.product_31_offerprice,
            product_orgprice: data.product_31_orgprice,
            product_link: data.product_31_link,
          },

          {
            product_image: data.product_image_32,
            product_name: data.product_32_name,
            product_description: data.product_32_description,
            product_offerprice: data.product_32_offerprice,
            product_orgprice: data.product_32_orgprice,
            product_link: data.product_32_link,
          },

          {
            product_image: data.product_image_33,
            product_name: data.product_33_name,
            product_description: data.product_33_description,
            product_offerprice: data.product_33_offerprice,
            product_orgprice: data.product_33_orgprice,
            product_link: data.product_33_link,
          },

          {
            product_image: data.product_image_34,
            product_name: data.product_34_name,
            product_description: data.product_34_description,
            product_offerprice: data.product_34_offerprice,
            product_orgprice: data.product_34_orgprice,
            product_link: data.product_34_link,
          },

          {
            product_image: data.product_image_35,
            product_name: data.product_35_name,
            product_description: data.product_35_description,
            product_offerprice: data.product_35_offerprice,
            product_orgprice: data.product_35_orgprice,
            product_link: data.product_35_link,
          },

          {
            product_image: data.product_image_36,
            product_name: data.product_36_name,
            product_description: data.product_36_description,
            product_offerprice: data.product_36_offerprice,
            product_orgprice: data.product_36_orgprice,
            product_link: data.product_36_link,
          },

          {
            product_image: data.product_image_37,
            product_name: data.product_37_name,
            product_description: data.product_37_description,
            product_offerprice: data.product_37_offerprice,
            product_orgprice: data.product_37_orgprice,
            product_link: data.product_37_link,
          },

          {
            product_image: data.product_image_38,
            product_name: data.product_38_name,
            product_description: data.product_38_description,
            product_offerprice: data.product_38_offerprice,
            product_orgprice: data.product_38_orgprice,
            product_link: data.product_38_link,
          },

          {
            product_image: data.product_image_39,
            product_name: data.product_39_name,
            product_description: data.product_39_description,
            product_offerprice: data.product_39_offerprice,
            product_orgprice: data.product_39_orgprice,
            product_link: data.product_39_link,
          },

          {
            product_image: data.product_image_40,
            product_name: data.product_40_name,
            product_description: data.product_40_description,
            product_offerprice: data.product_40_offerprice,
            product_orgprice: data.product_40_orgprice,
            product_link: data.product_40_link,
          },

          {
            product_image: data.product_image_41,
            product_name: data.product_41_name,
            product_description: data.product_41_description,
            product_offerprice: data.product_41_offerprice,
            product_orgprice: data.product_41_orgprice,
            product_link: data.product_41_link,
          },

          {
            product_image: data.product_image_42,
            product_name: data.product_42_name,
            product_description: data.product_42_description,
            product_offerprice: data.product_42_offerprice,
            product_orgprice: data.product_42_orgprice,
            product_link: data.product_42_link,
          },

          {
            product_image: data.product_image_43,
            product_name: data.product_43_name,
            product_description: data.product_43_description,
            product_offerprice: data.product_43_offerprice,
            product_orgprice: data.product_43_orgprice,
            product_link: data.product_43_link,
          },

          {
            product_image: data.product_image_44,
            product_name: data.product_44_name,
            product_description: data.product_44_description,
            product_offerprice: data.product_44_offerprice,
            product_orgprice: data.product_44_orgprice,
            product_link: data.product_44_link,
          },

          {
            product_image: data.product_image_45,
            product_name: data.product_45_name,
            product_description: data.product_45_description,
            product_offerprice: data.product_45_offerprice,
            product_orgprice: data.product_45_orgprice,
            product_link: data.product_45_link,
          },

          {
            product_image: data.product_image_46,
            product_name: data.product_46_name,
            product_description: data.product_46_description,
            product_offerprice: data.product_46_offerprice,
            product_orgprice: data.product_46_orgprice,
            product_link: data.product_46_link,
          },

          {
            product_image: data.product_image_47,
            product_name: data.product_47_name,
            product_description: data.product_47_description,
            product_offerprice: data.product_47_offerprice,
            product_orgprice: data.product_47_orgprice,
            product_link: data.product_47_link,
          },

          {
            product_image: data.product_image_48,
            product_name: data.product_48_name,
            product_description: data.product_48_description,
            product_offerprice: data.product_48_offerprice,
            product_orgprice: data.product_48_orgprice,
            product_link: data.product_48_link,
          },

          {
            product_image: data.product_image_49,
            product_name: data.product_49_name,
            product_description: data.product_49_description,
            product_offerprice: data.product_49_offerprice,
            product_orgprice: data.product_49_orgprice,
            product_link: data.product_49_link,
          },

          {
            product_image: data.product_image_50,
            product_name: data.product_50_name,
            product_description: data.product_50_description,
            product_offerprice: data.product_50_offerprice,
            product_orgprice: data.product_50_orgprice,
            product_link: data.product_50_link,
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
        customer_details : [],
        show_customer_details_popop: data.show_customer_details_popop,
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

  updateCustomerDetails: (data, client_db, card_name) => {
    return new Promise((resolve, reject) => {
      client_db
        .collection(client_collections.visiting_card_datas)
        .updateOne({ company_name: card_name }, { $push: { customer_details: data } })
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
