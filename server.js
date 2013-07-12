var http = require( 'http' );
var url = require( 'url' );

exports.start = function( route, handle ) {
  var onRequest = function( request, response ) {
    var urlParts = url.parse( request.url );
    var pathname = urlParts.pathname;
    var query = urlParts.query;
    console.log( 'Request for ' + pathname + ' received.' );
    route( handle, pathname, query, response );
  };

  http.createServer( onRequest ).listen( 8888 );
  console.log( 'Server has started.' );
};