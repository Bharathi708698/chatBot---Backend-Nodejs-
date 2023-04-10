const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser')
const {Configuration, OpenAIApi} = require("openai"); 

const app = express();

app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.CHATBOT_KEY
});

const openai = new OpenAIApi(configuration);

app.post('/chat',async (req, res) => {
    const { message } = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message}],
        max_tokens: 4000,
    });
    
    res.send(completion.data.choices[0].message.content)
});

app.listen(5000, () => {
    console.log("server is running")
})
