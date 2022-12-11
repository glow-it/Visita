const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "",
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