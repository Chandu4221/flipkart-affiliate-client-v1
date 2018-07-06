[![Build Status](https://travis-ci.org/Chandu4221/flipkart-affiliate-client-v1.svg?branch=master)](https://travis-ci.org/Chandu4221/flipkart-affiliate-client-v1)

# Flipkart Affiliate Client for API Version 1.0

un-official Node.js client for [Flipkart Affiliates API](https://affiliate.flipkart.com/api-docs/)

### Prerequisites

Requires "request" npm package

## Installation

Install using npm

```
npm i flipkart-affiliate-client-v1
```

## Usage

Require Library

```
var flipkart = require("flipkart-affiliate-client-v1");
```

Create Affiliate Client

```
var client = new flipkart.CreateAffiliateClient({
  trackingId: "<Your Affiliate Tracking Id Here>",
  token: "<Your Affiliate Token>",
  format: "json" (or) "xml"
});
```

## Examples

Usage Examples

### Products Feed Listing

Get the Product Feed of The API

```
client.getProductsFeedListing()
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Product Feed

Get the Product Feed Of The API.

Takes **productFeedUrl** as the parameter url obtained from the Products Feed Listing

```
client.getProductsFeed(productFeedUrl)
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Books Category Feed

Get the Books Category Feed Of The API.

```
client.getBooksCategoryFeed()
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Top Selling Books

Get the Top Selling Books Of The API.

Takes **booksCategoryFeedUrl** as the parameter url obtained from the Books Category Feed

```
client.getTopSellingBooks(booksCategoryFeedUrl)
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Keyword Search

Search based on the Keywords.

doKeywordSearch("category",limit) takes two parameters.

**category** of the product you are searching for and
**limit** (by default the limt is set to 5)

```
client.doKeywordSearch("mobiles", 10)
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Id Search

Search based On the Product Id

doIdSearch(productId) takes **productId** as a parameter.

```
client.doIdSearch("<productId>")
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Get All Offers

Get All Offers

```
client.getAllOffers()
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Get Deals of the Day

Get Deals of the Day

```
client.getDealsOfTheDay()
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Get Orders Report

Get orders report based on start_date , end_date, offset and status

getOrdersReport(obj) takes an **object** as a parameter

object Structure

```
{
	startDate:'2012-03-01',
	endDate:'2018-04-01',
	status:'approved',
	offset:'0'
}
```

```
client.getOrdersReport(obj)
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```

### Get App Install Report

Get App Install Report based on start_date, end_date and status

getAppInstallReport(obj) takes **object** as a parameter

Object Structure

```
{
	startDate:'2012-03-01',
	endDate:'2018-04-01',
	status:'disapproved',
}
```

```
client.getAppInstallReport(obj)
.then(function(value){
	console.log(value); //object with status, error and body
})
.catch(function(err){
	console.log(err);
});
```
