exports.route = function( handle, pathname, query, response ) {
  console.log( 'About to route a request for ' + pathname );
  if ( typeof handle[ pathname ] === 'function' ) {
    handle[ pathname ]( query, response );
  } else {
    console.log( 'No request handler found for ' + pathname );
    response.writeHead( 404 );
    response.end();
  }
};