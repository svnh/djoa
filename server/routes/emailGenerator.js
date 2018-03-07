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
  sendEmailBatchDocuments (req, user, stackDocuments) {
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
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">`
                      // console.log(stackDocuments)
                      stackDocuments.forEach(documenta => {
                        // console.log(documenta.details.name)
                        // html = `${documenta.details.name} alan <br>
                        var linkDocument ='';
                        documenta.strats.forEach(idElem => {
                          linkDocument = `http://${req.headers.host}/#/strat/${idElem}`
                        })
                        documenta.missions.forEach(idElem => {
                          linkDocument = `http://${req.headers.host}/#/mission/${idElem}`
                        })
                        documenta.briefs.forEach(idElem => {
                          linkDocument = `http://${req.headers.host}/#/brief/${idElem}`
                        })

                        html += `
                        <tr>
                          <td width="60%" style="padding: 10px 0;">
                            <a href="${linkDocument}" style="font-family: 'Montserrat'; display: block; padding: 10px 0; text-decoration: none; color: #222 !important; font-weight: 600;">
                              <font color="#222">${documenta.details.name}</font>
                            </a>
                          </td>
                          <td width="40%" align="center" style="padding: 11px; background-color: #4a148c; border-bottom: 3px solid #fff;">
                            <a href="${linkDocument}" style="padding: 11px; font-size: 10px; font-family: 'Montserrat'; color: #ffffff !important; text-decoration: none; width: 90%; display: block;">
                              <font color="#FFFFFF">
                              `
                              if (documenta.status.pendingActionFrom === 'crew') {
                                html += `WORK ASSIGNED`
                              }
                              if (documenta.status.pendingActionFrom === 'client') {
                                html += `REVIEW NEEDED`
                              }
                              html += `
                              </font>
                            </a>
                          </td>
                        </tr>`
                      })
                      html += `
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="background-color: #4a148c; padding: 10px 15px; cursor: pointer;">
                      <a href="http://${req.headers.host}/" style="color: #ffffff; text-decoration: none;  font-size: 16px; font-family: 'Montserrat';">
                        <font color="#FFFFFF">
                          See All Notifications
                        </font>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ede7f6">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                       <tr>
                        <td align="center" style="padding: 15px 15px 15px 15px; font-size: 10px; font-family: 'Montserrat';">
                          <a href="http://${req.headers.host}/#/?type=emailPreferences" style="text-decoration: none;">EMAIL PREFERENCES</a>
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
      subject: 'Some Documents Need Your Input in the Djoa App',
      html: html
    };
    mailer.sendMail(mailOptions, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Mail sent to: ' + user.email );
      }
    });


  }


}
