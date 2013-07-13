yahoo.finance.historical
========================

Node.js webservice that gets JSON-formatted historical quotes from Yahoo Finance, using the iCharts webservice.

##Getting Started

1. Deploy the source code to a host which supports Node.
2. Run ```node index.js```
3. Call the URL. e.g. http://some-host/?symbol=GOOG
4. Get jsonp response e.g. ```callback({data:[{"Date":"2013-07-12","Open":"920.00","High":"923.00","Low":"915.24","Close":"923.00","Volume":"2568200","Adj Close":"923.00"},...]});```
