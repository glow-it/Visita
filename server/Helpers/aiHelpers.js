const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


module.exports = {
   
generateCompletion : (prompt,temperature)=> {
    return new Promise((resolve,reject)=> {

        openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature,
            n:1,
            stop:false,
            max_tokens:250
            
          }).then((response)=> {
            resolve(response)
          }).catch((err)=> {
            reject(err)
          })
    
         
    })
}

}