/* eslint-disable no-undef */
/* eslint-disable no-console*/
const mongoose = require('mongoose');
const { parse } = require('url');

// Redacting the uri (aka url) takes the username and password out of the uri
function redact(uri) {
  const parsedUri = parse(uri);
  const authPart = parsedUri.auth ? '****:****@' : '';
  return `${parsedUri.protocol}://${authPart}${parsedUri.host}:${parsedUri.port}${parsedUri.path}`; 
}

// log function logs the console so that you don't have to repeat - don't forget to include the redact function for the dbUri
function log(event, dbUri) {
  return function() {
    console.log(`Connection ${event} on ${redact(dbUri)}`);
  };
}

// Export connection events 'on', 'open' and 'close' pass log function as second param to log event and redacted uri
module.exports = (dbUri = process.env.MONGODB_URI) => {
  mongoose.connect(dbUri, { useNewUrlParser: true });
    
  mongoose.connection.on('open', log('open', dbUri));

  mongoose.connection.on('error', log('error', dbUri));

  mongoose.connection.on('close', log('close', dbUri));
};
