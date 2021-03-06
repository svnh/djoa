#!/usr/bin/env node

/**
 * Module dependencies.
 */

// Redirect from http port 80 to https
  // var http = require('http')
  // http.createServer(function (req, res) {
  //   res.writeHead(301, { 'Location': 'https://' + req.headers.host + req.url })
  //   res.end()
  // }).listen(80)

  // set port 80 to redirect to https
  var express = require('express');
  var app2 = express();
  app2.get('/site',function (req, res) {
    res.status(200).json({
      mesage: 'hello Do!'
    })

  });
  app2.get('*',function (req, res) {
      res.redirect('https://' + req.headers.host + req.url);
  });
  app2.listen(80,  function () {
     console.log('Started port: 80');
  });

// Redirect from http port 80 to https

var app = require('../server/app')
var debug = require('debug')('petlocator_ng2:server')
var https = require('https')
// var http = require('http')
var fs = require('fs');


/**
 * Get port from environment and store in Express.
 */

//console.log(app.get('env'))


var port = normalizePort(process.env.PORT || '443')
// var port = normalizePort(process.env.PORT || '80')


app.set('port', port)

/**
 * Create HTTP server.
 */

 var sslOptions = {
   // cert: fs.readFileSync(__dirname + '/certs/app.mirabelle.io_ssl_certificate.cer', 'utf8'),
   key: fs.readFileSync(__dirname + '/certs/djoa.key', 'utf8'),
   cert: fs.readFileSync(__dirname + '/certs/28b65d120812d3fa.crt', 'utf8'),
   // cert: fs.readFileSync(__dirname + '/certs/djoa.csr', 'utf8'),
   requestCert: false,
   rejectUnauthorized: false
 };
 // console.log(sslOptions)
var server = https.createServer(sslOptions, app)
// var server = http.createServer( app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
 /// debug('Listening on ' + bind)
}
