const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "mail.indragupta@gmail.com",
  from: "mail.indragupta@gmail.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sgMail.send(msg);
      /* .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        }); */
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};

/* import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("mail.indragupta@gmail.com", "Indra Gupta");

const recipients = [new Recipient("mail.indragupta@gmail.com", "Hi Client!")];

const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setReplyTo(sentFrom)
  .setSubject("This is a Subject")
  .setHtml("<strong>This is the HTML content</strong>")
  .setText("This is the text content");

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await mailerSend.email.send(emailParams);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
}; */

/* import { sendEmail } from "../util/sendEmail";
import { EmailParams, Sender, Recipient } from "mailersend";
const fetch = require("node-fetch");

const sentFrom = new Sender(
  "trial-neqvygm7915g0p7w.mlsender.net",
  "Indra Gupta"
);

const recipients = [new Recipient("mail.indragupta@gmail.com", "Hi Client!")];

const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setReplyTo(sentFrom)
  .setSubject("This is a Subject")
  .setHtml("<strong>This is the HTML content</strong>")
  .setText("This is the text content");

export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail(emailParams);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
 */
/**
export const testEmailRoute = {
  path: "/api/test-email",
  method: "post",
  handler: async (req, res) => {
    try {
      await sendEmail({
        to: "mail.indragupta+test1@gmail.com",
        from: "mail.indragupta@gmail.com",
        subject: "Does this work?",
        text: "If you' re reading this... yes!",
      });
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};

 */
