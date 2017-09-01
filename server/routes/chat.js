var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Chat    = require('../models/chat.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken')



      // SOCKET.io
      var app = express()
      const http = require('http').Server(app);
      const io = require('socket.io')(http);
      io.on('connection', (socket) => {

          console.log('user connected');
          // getChat()
          io.emit('message', { type: 'new-message', text: 'alan' });
          // io.emit('message', { type: 'new-message', text: 'alan' });
          // io.emit('message', { type: 'new-message', text: 'alan' });
          // io.emit('message', { type: 'new-message', text: 'alan' });
          // io.emit('message', { type: 'new-message', text: 'alan' });


          socket.on('disconnect', function() {
              console.log('user disconnected');
          });

          socket.on('add-message', (message) => {
              io.emit('message', { type: 'new-message', text: message });
              // Function above that stores the message in the database
              // databaseStore(message)
              // console.log('here you must save' + message)
              saveChat(message)
          });
      });
      http.listen(5000, () => {
          console.log('Server SOCKET.io started on port 5000');
      });
      // SOCKET.io






      function getChat(){
        var itemsPerPage = 6
        var currentPage = 1
        var pageNumber = currentPage - 1
        var skip = (itemsPerPage * pageNumber)

        let searchQuery = {}
        // searchQuery['ownerCompanies'] = req.user.ownerCompanies


        // if(req.query.search)
        //   searchQuery['details.name'] = new RegExp(req.query.search, 'i')
        //
        //
        // if(req.query.idQuote)
        //   searchQuery['quotes'] = mongoose.Types.ObjectId(req.query.idQuote)


        Chat
        .find(searchQuery)
        .sort('-createdAt')
        // .populate({path: 'quotes', model: 'Quote'})
        .limit(itemsPerPage)
        .skip(skip)
        .exec(function (err, item) {
          if (err) {
            return res.status(404).json({
              message: 'No results',
              err: err
            })
          } else {
            // return item
            item.forEach(chat=> {
              io.emit('message', chat);
            })

          }
        })
      }



      function saveChat(text){
          var chat = new Chat()
          chat.text = text
          chat.save(function (err, result) {
            if (err) {
              console.log(err)
            }
            console.log(result)
          })
      }



      module.exports = router
