historical-quotes
========================

Node.js webservice that gets JSON-formatted historical quotes from Yahoo Finance.

Uses the [yahoo-managed HistCSVDownload](https://code.google.com/p/yahoo-finance-managed/wiki/sampleYahooManagedAPIHistQuotesDownload) webservice, then converts the data to json.

## Getting Started

1. Deploy the source code to a host which supports Node.
2. Run ```node index.js```
3. Call the URL. e.g. ```http://some-host/?symbol=GOOG```
4. Get jsonp response, which is historical quotes sorted by date in descending order

## Example 

### Request

``` 
http://some-host:8888/?symbol=GOOG&startDate=2013-07-09&endDate=2013-07-11&interval=d
```

###Response

```javascript

callback({
    data: [{
        "Date": "2013-07-11",
        "Open": "913.00",
        "High": "920.81",
        "Low": "908.52",
        "Close": "920.24",
        "Volume": "2584200",
        "Adj Close": "920.24"
    }, {
        "Date": "2013-07-10",
        "Open": "903.45",
        "High": "911.14",
        "Low": "900.38",
        "Close": "905.99",
        "Volume": "1708400",
        "Adj Close": "905.99"
    }, {
        "Date": "2013-07-09",
        "Open": "911.00",
        "High": "912.95",
        "Low": "897.98",
        "Close": "905.24",
        "Volume": "1964200",
        "Adj Close": "905.24"
    }]
})

```

## Options
You can specify options via GET parameters in the url. 

The following is a list of parameters:
* **symbol**: *(Mandatory)* Specify the stock to lookup by ticker; any ticker that works on Yahoo Finance should work here. 
  * e.g. ```http://some-host/?symbol=GOOG```
* **endDate**: Specify the end date, inclusive, for historical quotes, in yyyy-mm-dd format. 
  * e.g. ```http://some-host/?symbol=GOOG&endDate=2013-07-11```. 
  * Default: today's date.
* **startDate**: Specify the start date for historical quotes, in yyyy-mm-dd format. 
  * e.g. ```http://some-host/?symbol=GOOG&startDate=2013-05-19```. 
  * Default: endDate minus one year.
* **interval**: Specify the interval of quotes, in days ('d'), weeks ('w') or years ('y'). 
  * e.g. ```http://some-host/?symbol=GOOG&interval=w```. 
  * Default: 'd' (Days).
