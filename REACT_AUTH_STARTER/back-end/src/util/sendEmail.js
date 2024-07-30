/** import sendgrid from "@sendgrid/mail";

//const sendgrid = require("@sendgrid/mail");
//sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = ({ to, from, subject, text, html }) => {
  const message = { to, from, subject, text, html };
  return sendgrid.send(message);
};

*/

import "dotenv/config";
import { MailerSend } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export const sendEmail = (emailParams) => {
  const message = { emailParams };
  return mailerSend.email.send(message);
};
