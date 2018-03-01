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
          <title>Email from Djoa App</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">
            <tr>
              <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" bgcolor="#ffffff" height="50">
                      <img
                        src="http://${req.headers.host}/assets/images/small-logo-djoa.png"
                        alt="Invitation from Djoa App" width="auto" height="35" style="display: block; color: #4a148c;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 15px 0 30px 0; font-size: 16px; font-family: 'Montserrat';">
                      Some documents need your attention in the Djoa App:
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 15px 0 30px 0; font-size: 16px; font-family: 'Montserrat';">
                      THE TABLE TAG BELOW IS THE TAG WE WANT TO DUPLICATE DEPENDING ON THE NUMBER OF DOCUMENTS
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                       <tr>
                        <td font-family: 'Montserrat';">
                          [NAME OF DOCUMENT HERE]
                        </td>
                        <td align="center" style="background-color: #4a148c; padding: 15px 15px 15px 15px; font-size: 10px; font-family: 'Montserrat';">
                          [WHEN DOCUMENT IS ASSIGNED TO CREW OR WHEN REVIEWER SELECTS "REQUEST CHANGES": WORK ASSIGNED]
                          [WHEN CREW SELECTS "SEND FOR REVIEW": REVIEW]
                        </td>
                       </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background-color: #4a148c; padding: 10px 15px; cursor: pointer;">
                      <a
                        href="http://${req.headers.host}/ [<<THIS NEEDS TO BE CHANGED TO OPEN THE NOTIFICATION SIDEBAR"
                        style="color: #ffffff; text-decoration: none;  font-size: 16px; font-family: 'Montserrat';"
                      >
                        See All Notifications
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ede7f6">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                       <tr>
                        <td align="center" style="padding: 15px 15px 15px 15px; font-size: 10px; font-family: 'Montserrat';">
                          <a href="UPDATE URL HERE TO OPEN SETTINGS UNDER PROFILE IF POSSIBLE" style="text-decoration: none;">EMAIL PREFERENCES</a>
                        </td>
                        <td align="center" style="padding: 15px 15px 15px 15px; font-size: 10px; font-family: 'Montserrat';">
                          <a href="mailto:info@djoa.co?Subject=Djoa%20App%20Invitation%20Email" style="text-decoration: none;">CONTACT US</a>
                        </td>
                       </tr>
                      </table>
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
