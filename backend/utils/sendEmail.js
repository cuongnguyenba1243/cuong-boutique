const SibApiV3Sdk = require("@getbrevo/brevo");
const dotenv = require("dotenv");
dotenv.config();

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const send = async (recipientEmail, costomSubject, customHtmlContent) => {
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = {
    email: process.env.ADMIN_EMAIL_ADDRESS,
    name: process.env.ADMIN_EMAIL_NAME,
  };
  sendSmtpEmail.to = [{ email: recipientEmail }];
  sendSmtpEmail.subject = costomSubject;
  sendSmtpEmail.htmlContent = customHtmlContent;

  return apiInstance.sendTransacEmail(sendSmtpEmail);
};

module.exports = { send };
