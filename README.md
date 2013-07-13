yahoo.finance.historical
========================

Node.js webservice that gets JSON-formatted historical quotes from Yahoo Finance.
Uses the [yahoo-managed HistCSVDownload](https://code.google.com/p/yahoo-finance-managed/wiki/sampleYahooManagedAPIHistQuotesDownload) webservice, then converts the data to json.

## Getting Started

1. Deploy the source code to a host which supports Node.
2. Run ```node index.js```
3. Call the URL. e.g. http://some-host/?symbol=GOOG
4. Get jsonp response, which is historical quotes sorted by date in descending order
```javascript
callback(
  {data:
    [
      {"Date":"2013-07-12","Open":"920.00","High":"923.00",
        "Low":"915.24","Close":"923.00","Volume":"2568200","Adj Close":"923.00"},
      ...
    ]
  }
);
```

## Options
You can specify options via GET parameters in the url. 
The following is a list of parameters:
* symbol - *MANDATORY* Specify the stock to lookup by ticker; any ticker that works on Yahoo Finance should work here. e.g. http://some-host/?symbol=GOOG
* endDate - Specify the end date, inclusive, for historical quotes, in yyyy-mm-dd format. e.g. http://localhost:8888/?symbol=GOOG&endDate=2013-07-11. Default: today's date.
* startDate - Specify the start date for historical quotes, in yyyy-mm-dd format. e.g. http://some-host/?symbol=GOOG&startDate=2013-05-19. Defaults: endDate minus one year.
* interval - Specify the interval of quotes, in days ('d'), weeks ('w') or years ('y'). e.g. e.g. http://some-host/?symbol=GOOG&interval=w Default: 'd' (Days).