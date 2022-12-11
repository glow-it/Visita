const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
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