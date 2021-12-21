"use strict";
require('dotenv').config()
const {google} = require('googleapis')
const nodemailer = require('nodemailer')
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

// async..await is not allowed in global scope, must use a wrapper
const mail = async (mailfrom,mailto,subject,messagetxt,messagehtml) => {
  console.log(mailfrom,mailto,subject,messagetxt,messagehtml)
  try{
    const accessToken =  await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'damienfahey@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Fred Armisen 👻" <${mailfrom}>`, // sender address
      to: mailto, // list of receivers
      subject: `${subject}✔`, // Subject line
      text: messagetxt, // plain text body
      html: messagehtml, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch(error) {
      console.error(error);
    }
}

module.exports={ mail }
