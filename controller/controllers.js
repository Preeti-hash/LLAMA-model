const Chat = require("../schemas/chat.js");
const axios = require("axios");
const utils = require("../middleware/utils.js");
const OpenAIApi = require('openai');
// const apikey = "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"
// const openai = new OpenAIApi({ apiKey: apikey });
const ProWritingAidApi = require('pro_writing_aid_api');
const cheerio = require('cheerio');
// Your Diffbot API token
const apiKey = '8e77655f13259bdddcb44bc477cfb990';

const { spawn } = require("child_process");
exports.addUser = async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.json({ code: 200, data: result });
  } catch (err) {
    console.log(err);
    await utils.errorHandle(res, err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await User.find();
    res.json({ code: 200, data: result });
  } catch (err) {
    console.log(err);
    await utils.errorHandle(res, err);
  }
};

exports.Login = async (req, res) => {
  try {
    console.log("Request--->", req.body);
    const data = req.body;
    const result = await User.findOne({
      userName: data.userName,
      password: data.password,
    });
    if (result) {
      console.log("response--->", result);
      res.json({ code: 200, data: "Login Successfully" });
    } else {
      throw utils.buildErrObject(res, 422, "Please Enter correct Credentials");
    }
  } catch (err) {
    console.log(err);
    await utils.errorHandle(res, err);
  }
};

exports.chatGPT = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    // Spawn a child process to run the Python script
    const childProcess = spawn('python', ['python1.py']);
    // Send the prompt to the Python script
    childProcess.stdin.write(prompt);
    childProcess.stdin.end();

    // Collect the generated text from the child process
    let generatedText = '';

    childProcess.stdout.on('data', (data) => {
      console.log("data---------------->", data);
      generatedText += data.toString();
    });

    // Handle the child process exit event
    childProcess.on('exit', (code) => {
      console.log(code);
      if (code === 0) {
        console.log(generatedText);
        Chat.create({ message: generatedText, message_type: "response" })
        res.json({ generatedText });
      } else {
        console.log();
        res.status(500).json({ error: 'Text generation failed' });
      }
    });
  } catch (err) {
    console.log(err);
    await utils.errorHandle(res, err);
  }
};

exports.textModification = async (req, res) => {
  try {
    const text = "i am going to chandigarh"
    const resp = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: 'Shorten the following text: "preeti will go  to chandigarh."',
      max_tokens: 7,
      temperature: 0,
    });
    res.json({ code: 200, data: resp })
  } catch (err) {
    console.log(err);
    await utils.errorHandle(res, err);
  }
};

exports.htmlExtract = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    // Spawn a child process to run the Python script
    const childProcess = spawn('python', ['htmlExtract.py']);
    // Send the prompt to the Python script
    childProcess.stdin.write(prompt);
    childProcess.stdin.end();

    // Collect the generated text from the child process
    let generatedText = '';

    childProcess.stdout.on('data', (data) => {
      console.log("data---------------->", data);
      generatedText += data.toString();
    });

    // Handle the child process exit event
    childProcess.on('exit', (code) => {
      console.log(code);
      if (code === 0) {
        console.log(generatedText);
        Chat.create({ message: generatedText, message_type: "response" })
        res.render(generatedText);
      } else {
        console.log();
        res.status(500).json({ error: 'Text generation failed' });
      }
    });
  } catch (err) {
    console.log(err);
    await utils.errorHandle(res, err);
  }
};