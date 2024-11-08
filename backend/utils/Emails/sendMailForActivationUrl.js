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
            <!doctype html><html dir=ltr lang=en><link as=image href=https://res.cloudinary.com/ayush999/image/upload/v1730966875/logos/eshop/favicon_uuibcx.png rel=preload><meta content="text/html; charset=UTF-8"http-equiv=Content-Type><meta name=x-apple-disable-message-reformatting><body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif"><table align=center border=0 cellpadding=0 cellspacing=0 role=presentation style="max-width:37.5em;margin:0 auto;padding:20px 0 48px"width=100%><tr style=width:100%><td><img alt=Koala height=60 src=https://res.cloudinary.com/ayush999/image/upload/v1730966883/logos/eshop/logo-black_ifxupj.png style="display:block;outline:0;border:none;text-decoration:none;margin:0 auto"width=170><p style="font-size:16px;line-height:26px;margin:16px 0">Hello ${userName},<p style="font-size:16px;line-height:26px;margin:16px 0">Click the button below to activate your account<table align=center border=0 cellpadding=0 cellspacing=0 role=presentation style=text-align:center width=100%><tr><td><a href=${activationUrl} style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0;background-color:#6778ed;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 12px 12px 12px"target=_blank><span></span><span style=max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0;mso-text-raise:9px>Activate Now</span><span></span></a></table><p style="font-size:16px;line-height:26px;margin:16px 0">Best Regards,<br>eshop team<p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">If clicking the button above doesn't work, you can paste the following URL into your browser:<p class=message>${activationUrl}<hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#ccc;margin:20px 0"><p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">Bengaluru Karnataka India</table>
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
