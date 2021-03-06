var express = require('express'),
    router  = express.Router(),
    fs      = require('fs'),
    multer  = require('multer'),
    mime    = require('mime'),
    path    = require('path'),
    crypto  = require("crypto"),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Form    = require('../models/form.model'),
    gm      = require('gm').subClass({imageMagick: true}),
    jwt     = require('jsonwebtoken');

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});

// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Authentication failed',
        message: 'Authentication failed',
        error: err
      })
    }
    if (!decoded) {
      return res.status(403).json({
        title: 'Authentication failed',
        error: {message: 'Authentication failed'}
      });
    }
    if (decoded) {
      User.findById(decoded.user._id, function (err, doc) {
        if (err) {
          return res.status(500).json({
            title: 'Fetching user failed',
            message: 'Fetching user failed',
            err: err
          });
        }
        if (!doc) {
          return res.status(404).json({
            title: 'The user was not found',
            error: {message: 'The user was not found'}
          })
        }
        if (doc) {
          req.user = doc;
          next();
        }
      })
    }
  })
});

// setting up multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dest = path.join(__dirname, '../..', 'server/uploads/forms/' + req.user._id)
    console.log(dest)
    var stat = null;
    try {
      stat = fs.statSync(dest);
      console.log(dest);
    }
    catch (err) {
      fs.mkdirSync(dest);
    }
    if (stat && !stat.isDirectory()) {
      throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
    }
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    //if you want even more random characters prefixing the filename then change the value '2' below as you wish, right now, 4 charaters are being prefixed
    crypto.pseudoRandomBytes(2, function (err, raw) {
      cb(null, raw.toString('hex') + '.' + file.originalname.toLowerCase().split(' ').join('_'));
    });
  }
});

// telling multer what storage we want and filefiltering to check if file is an image, the 'parts' property declares how many fields we are expecting from front end
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 10MB filesize limit
    parts: 3
  },
  fileFilter: function (req, file, cb) {
    var filetypes = /jpe?g|png|pdf|csv|doc|docx|xls|xlsx|ppt|pptx|rtf|ai|indd|psd|eps|ips|tiff|gif|pot|potm|ppsx|postscript/
    var mimetype = false
    console.log('file.mimetype:')
    console.log(file.mimetype)

    if (

      file.mimetype.match('image/*') ||

      file.mimetype.match('application/pdf') ||

      file.mimetype.match('application/msword') ||
      file.mimetype.match('application/vnd.ms-word') ||
      file.mimetype.match('application/vnd.ms-word.document.macroEnabled.12') ||
      file.mimetype.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
      file.mimetype.match('application/rtf') ||

      file.mimetype.match('text/csv') ||
      file.mimetype.match('application/vnd.ms-excel') ||
      file.mimetype.match('application/vnd.ms-excel.sheet.macroEnabled.12') ||
      file.mimetype.match('application/vnd.ms-excel.addin.macroEnabled.12') ||
      file.mimetype.match('application/vnd.ms-excel.template.macroEnabled.12') ||
      file.mimetype.match('application/vnd.ms-excel.sheet.binary.macroEnabled.12') ||
      file.mimetype.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
      file.mimetype.match('application/vnd.openxmlformats-officedocument.spreadsheetml.template') ||
      file.mimetype.match('application/vnd.oasis.opendocument.spreadsheet') ||

      file.mimetype.match('application/vnd.ms-powerpoint') ||
      file.mimetype.match('application/vnd.ms-powerpoint.template.macroEnabled.12') ||
      file.mimetype.match('application/vnd.ms-powerpoint.addin.macroEnabled.12') ||
      file.mimetype.match('application/vnd.ms-powerpoint.presentation.macroEnabled.12') ||
      file.mimetype.match('application/vnd.ms-powerpoint.slideshow.macroEnabled.12') ||
      file.mimetype.match('application/vnd.openxmlformats-officedocument.presentationml.template') ||
      file.mimetype.match('application/vnd.openxmlformats-officedocument.presentationml.presentation') ||
      file.mimetype.match('application/vnd.openxmlformats-officedocument.presentationml.slideshow') ||

      file.mimetype.match('application/x-adobe-indesign') ||
      file.mimetype.match('application/x-indesign') ||
      file.mimetype.match('application/illustrator') ||
      file.mimetype.match('application/postscript') ||
      file.mimetype.match('application-eps') ||
      file.mimetype.match('application_x-eps') ||
      file.mimetype.match('application/octet-stream') ||
      file.mimetype.match('image/vnd.adobe.photoshop') ||
      file.mimetype.match('application/x-photoshop') ||
      file.mimetype.match('application/photoshop') ||
      file.mimetype.match('application/x-photoshop') ||
      file.mimetype.match('application/psd') ||
      file.mimetype.match('image/psd') ||
      file.mimetype.match('image_x-eps') ||
      file.mimetype.match('image_eps') ||
      file.mimetype.match('image/vnd.adobe.photoshop') ||

      file.mimetype.match('application/x-zip-compressed') ||
      file.mimetype.match('application/x-rar-compressed')
    ) {
      mimetype = true
    }



    // var mimetype = filetypes.test(file.mimetype)

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    // console.log('file.originalname', file.originalname)
    // console.log('extname', extname)
    // console.log('mimetype', mimetype)
    // console.log('file.mimetype', file.mimetype)
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes)
  }
});

// posting the form with the image to server, CAUTION: the 'fileUp' MUST match the name in our file input 'name' attribute ex. name="fileUp"
router.post('/', upload.single('fileUp'), function (req, res, err) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(500).json({
      message: 'There was an error',
      error: err
    });
  }

  // finding the user who initialized the upload from front end
  User.findById(req.user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        err: err
      });
    }
    // setting our new form to be saved in database, we fetch the data from the front end,
    // req.file.path is coming from multer, we need that value to store the path to database
    // at the end we assinging the owner of the form by passing the user _id to the form
    // in the backend we are referencing each form to the user who uploaded it
    // so later on we can display the data in the front end
    // console.log(req.file);
    // resize middleware, just change 400 to whatever you like, the null parameter maintains aspect ratio, if you want exact dimensions replace null with a height number as you wish

//Gooplus
    // gm(req.file.path)
    //   .resize(400, null)
    //   .noProfile()
    //   .write(req.file.path, function (err) {
    //     if (err) {
    //       console.log(err);
    //       fs.unlink(req.file.path);
    //       // });// this will result a 404 when frontend tries to access the image, I ll provide a fix soon
    //     }
    //   });


//Gooplus
    let filename = req.file.filename.split(' ').join('_');
    let nbChar = filename.split('.').shift().length + 1
    //console.log(req.file.filename.substring(nbChar))

    var form = new Form({
    //  textInputOne: req.body.textInput1,
    //  textInputTwo: req.body.textInput2,
      title: filename.substring(nbChar),
      imagePath: filename,
      //type: req.file.filename.slice(-3),
      type: filename.split('.').pop(),
      owner: user._id,
      ownerCompanies: req.user.companies
    });

    if(!req.user.ownerCompanies.length) {
      return res.status(404).json({
        message: 'You must belong to a companie',
        err: ''
      })
    }

    form.save(function (err, result) {
      if (err) {
        return res.status(404).json({
          message: 'There was an error, please try again2',
          err: err
        });
      }
      // user.forms.push(result);
      // user.save();
      res.status(201).json({
        message: 'Form Saved Successfully',
        obj: result
      });
    });
  })
});

// updating the form with new text fields values and image from front end
router.patch('/edit/:id', upload.single('fileUp'), function (req, res, err) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(500).json({
      status: 'There was an error, file size too big',
      error: err
    });
  }
  // check if the user has uploaded a new file, if he has, continue to image resize
  if (req.file != undefined) {
    gm(req.file.path)
      .resize(400, null)
      .autoOrient()
      .noProfile()
      .write(req.file.path, function (err) {
        if (err) {
          fs.unlink(req.file.path);  // this will result a 404 when frontend tries to access the image, I ll provide a fix soon
          console.log(err)
        }
      });
  }

  Form.findById((req.params.id), function (err, form) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!form) {
      return res.status(404).json({
        title: 'No form found',
        error: {message: 'Form not found!'}
      });
    }
    if (form.owner != req.user._id.toString()) {
      return res.status(401).json({
        title: 'Not your form!',
        error: {message: 'Users do not match, not your form'}
      });
    }
    // check if user has uploaded a new file, if he has, delete the old file
    if (req.file !== undefined) {
      fs.unlink('server/uploads/forms/' + form.owner + '/' + form.imagePath);
    }
  //  form.textInputOne = req.body.textInput1;
  //  form.textInputTwo = req.body.textInput2;
    // check if the user has uploaded a new file, if he has, then store the image path to Mongo and replace the old one
    if (req.file !== undefined) {
      form.imagePath = filename;
    }

    form.save(function (err, result) {
      if (err) {
        return res.status(404).json({
          message: 'There was an error, please try again',
          err: err
        });
      }
      res.status(201).json({
        message: 'Form Edited Successfully',
        obj: result
      });
    });
  });
});

module.exports = router;
