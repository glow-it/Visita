const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY } = require("../Common/strings");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);




module.exports = {
   
generateCompletion : (prompt,temperature)=> {
    return new Promise((resolve,reject)=> {

        openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature,
          }).then((response)=> {
            resolve(response)
          }).catch((err)=> {
            reject(err)
          })
    
         
    })
}

}