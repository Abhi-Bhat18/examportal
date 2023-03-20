import { google } from 'googleapis'
import {auth} from 'google-auth-library'
import dotenv from 'dotenv'
dotenv.config()

const gmail = google.gmail('v1');


const oAuth2Client = new auth.OAuth2(process.env.OAUTH_CLIENTID,process.env.OAUTH_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
oAuth2Client.setCredentials({ access_token: 'fojimwbphejvevji' });

const message = {
  to: 'recipient_email@example.com',
  subject: 'Test Email',
  body: 'This is a test email sent with the Gmail API',
  from: 'your_email@gmail.com'
};

gmail.users.messages.send({
  auth: oAuth2Client,
  userId: 'me',
  resource: {
    raw: Buffer.from(
      `From: ${message.from}\n` +
      `To: ${message.to}\n` +
      `Subject: ${message.subject}\n\n` +
      `${message.body}`
    ).toString('base64')
  }
}, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Email sent: ${res.data}`);
});