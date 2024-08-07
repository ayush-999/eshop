const nodemailer = require("nodemailer");

const sendMailForActivationUrl = async ({
  email,
  subject,
  activationUrl,
  userName,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: `
            <!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Activate Your Account</title> <style> body { font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px; } .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); } h2 { color: #333333; font-weight: 600; } .message { margin-bottom: 20px; color: #666666; } .btn { display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; border-radius: 5px; margin-right: 10px; margin-bottom: 10px; cursor: pointer; } .btn-copy { background-color: #008CBA; padding: 15px 20px; border: transparent; } .btn-wrapper { display: flex; align-items: center; } </style></head><body> <div class="container"> <h2>Activate Your Account</h2> <p class="message">Hello ${userName},</p> <p class="message">Click the button below to activate your account:</p> <div class="btn-wrapper"> <a href="${activationUrl} " target="_blank" class="btn" style="color: #FFF; font-size: 15px; display: block;">Activate Now</a> <button class="btn btn-copy" onclick="copyActivationLink()">Copy Activation Link</button> <script> function copyActivationLink() { const activationLink = '${activationUrl}'; navigator.clipboard.writeText(activationLink) .then(() => { alert('Activation link copied to clipboard!'); }) .catch(err => { console.error('Failed to copy activation link: ', err); }); } </script> </div> <p class="message">If clicking the button above doesn't work, you can paste the following URL into your browser: </p> <p class="message">${activationUrl}</p> <p class="message">Thank you!</p> </div></body></html>
         `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email} with activation link.`);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send activation email.");
  }
};

module.exports = sendMailForActivationUrl;
