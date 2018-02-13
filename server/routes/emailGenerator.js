var express     = require('express'),
    // router      = express.Router(),
    // crypto      = require("crypto"),
    nodemailer  = require('nodemailer'),
    // async       = require('async'),
    // Quote = require('../models/quote.model'),
    // passwordHash = require('password-hash'),
    // sgTransport = require('nodemailer-sendgrid-transport'),
    config      = require('../config/config');




module.exports = {
  sendEmailBatchDocuments (user) {
    var html = `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Email</title>
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">
                <tr>
                  <td align="center" bgcolor="#ff4351" height="150">
                    <img
                      src="http://mirabelle.io/wp-content/uploads/2018/01/Logo-mail.png"
                      alt="Email de la part de Mirabelle" style="display: block; color: #ffffff;"
                    />
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                          Bonjour ${user.profile.name}!
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0 30px 0;">

                              Bienvenue sur Mirabelle.io. Votre inscription s'est déroulée avec succès. Vous pouvez désormais accéder aux fonctionnalités de Mirabelle.io.
                              Votre email de connexion est <b>${user.email}</b>, vous êtes le seul à connaître votre mot de passe.
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="background-color: #fff; padding: 10px 15px;">
                          <a
                            href="https://app.mirabelle.io"
                            style="background-color: #ff4351; padding: 10px 15px; border: none; outline: none; color: #ffffff; text-decoration: none;"
                          >
                            Se connecter
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                          L'équipe Mirabelle vous remercie de votre confiance.

                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                           Mirabelle, Faites vos devis chez vos clients!
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ff4351">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td style="padding: 15px 15px 15px 15px;">
                        <a href="https://www.mirabelle.io/" style="text-decoration: none;">Site Web Mirabelle</a>
                      </td>
                      <td style="padding: 15px 15px 15px 15px;">
                        <a href="mailto:hello@mirabelle.io?Subject=false%reset" style="text-decoration: none;">Nous contacter</a>
                      </td>
                     </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>


    `
    var mailer = nodemailer.createTransport({
        service: "Gmail",
        // host: 'smtp.gmail.com',
        // port: 587,
        // secure: true, // upgrade later with STARTTLS
        auth: {
            user: config.userGmail,
            pass: config.passGmail
        }
    })

    var mailOptions = {
      to: user.email,
      from: config.userGmail,
      subject: 'Bienvenue sur Mirabelle!',
      html: html
    };
    mailer.sendMail(mailOptions, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('info', 'Un message a été envoyé à ' + user.email + ' avec de plus amples informations.');
      }
      // return res.status(200).json({
      //   message: 'Succès'
      // })
    });


  }


}
