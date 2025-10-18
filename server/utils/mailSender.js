// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })

//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Babbar',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }

// module.exports = mailSender;

const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();
console.log("key", process.env.SENDGRID_API_KEY);
// Set the API key for SendGrid
// This should be done once in your application startup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const mailSender = async (email, title, body) => {
  try {
    // Create the message object
    const msg = {
      to: email,
      // ⚠️ CRITICAL: Replace this with the email you verified in your SendGrid account
      from: {
        name: "studyNotion || CodeHelp - by Babbar",
        email: "priyaasharmaaa831@gmail.com",
      },
      subject: title,
      html: body,
    };

    // Send the email using the SendGrid API
    const info = await sgMail.send(msg);

    console.log("Email sent successfully:", info);
    return info; // Return the response from SendGrid
  } catch (error) {
    // Log the detailed error from SendGrid if available
    if (error.response) {
      console.error("Error sending emails:", error.response.body.errors);
    } else {
      console.error("Error sending email:", error.message);
    }
  }
};

module.exports = mailSender;
