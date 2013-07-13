var request 		= require( 'request' ),
		csv 				= require( 'csv' ),
		querystring = require( 'querystring' );

// builds the url to get a csv from Yahoo iCharts
var buildIChartUrl = function( params ) {
	var baseUrl 	= 'http://ichart.yahoo.com/table.csv',
			// default endDate to today
			endDate		= params.endDate ? new Date( params.endDate ) : new Date(),
      // default interval to days
			interval	= params.interval ? params.interval : 'd';
	var startDate = params.startDate;
	if ( startDate )
		startDate = new Date( startDate );
	else {
		// default start date to this day last year
		var startDate = new Date();
		startDate.setFullYear( startDate.getFullYear() - 1 );
	}

	// set params to query object to be stringified
	var queryObj = {
		s: params.symbol,
		a: startDate.getMonth().toString(),
		b: startDate.getDate().toString(),
		c: startDate.getFullYear().toString(),
		d: endDate.getMonth().toString(),
		e: endDate.getDate().toString(),
		f: endDate.getFullYear().toString(),
		g: interval,
		ignore: '.csv'
	};
	return baseUrl + '?' + querystring.stringify( queryObj );
};

// reverses array order, converts objects to arrays, and gets converted number of Close and Timestamp
var cleanMarketData = function( quotes ) {
	var length = quotes.length,
			quote  = {},
			chartData	=	[];
	for ( var i = length - 1; i >= 0; i-- ) {
		quote = quotes[i];
		var point	 = [
			new Date( quote.Date ).getTime(),
			parseFloat( quote.Close )
		];
		chartData.push( point );
	}
	return chartData;
};

// gets market data csv given a set of params and displays it as json
var getMarketDataCSV = function( response, params ) {
	// build the url to get the csv from
	var csvUrl = buildIChartUrl( params );
	console.log( 'About to request .csv from: ' + csvUrl );
  request.get( csvUrl, function ( error, csvResponse, body ) {
    if ( ! error && csvResponse.statusCode == 200 ) {

      var callback = params.callback ? params.callback : 'callback';
      // convert csv response into json object
      csv()
        .from( body, { columns: true } )
        .to.array( function( data ) {
        	var cleanData = cleanMarketData( data );
          response.writeHead( 200, { 'Content-Type': 'application/json' } );
          response.end( callback + '({data:' + JSON.stringify( cleanData ) + '})' );
      } );
    }
  } );
};

// handles the request for market data json
exports.getMarketDataJson = function( query, response ) {
  console.log( 'Request handler "getMarketDataJson" was called.' );
  var params = querystring.parse( query );
  if ( params && params.symbol ) {
	  getMarketDataCSV( response, params );
  } else {
  	response.writeHead( 200, { 'Content-Type': 'application/json' } );
    response.end( '{error: "Please specify market data symbol, e.g. GOOG."}' );
  }
};