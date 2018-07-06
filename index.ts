import request from "request";

interface AffiliateDetails {
  trackingId: string;
  token: string;
  format: string;
}

export class CreateAffiliateClient {
  constructor(private authDetails: AffiliateDetails) {}
  getProductsFeedListing() {
    let url =
      this.authDetails.format == "json"
        ? "https://affiliate-api.flipkart.net/affiliate/api/" +
          this.authDetails.trackingId +
          ".json"
        : "https://affiliate-api.flipkart.net/affiliate/api/" +
          this.authDetails.trackingId +
          ".xml";
    return getData(this.authDetails, url);
  }

  getProductsFeed(CategoryUrl: string) {
    return getData(this.authDetails, CategoryUrl);
  }

  getBooksCategoryFeed() {
    let url =
      this.authDetails.format == "json"
        ? "https://affiliate-api.flipkart.net/affiliate/1.0/booksApi/" +
          this.authDetails.trackingId +
          ".json"
        : "https://affiliate-api.flipkart.net/affiliate/1.0/booksApi/" +
          this.authDetails.trackingId +
          ".xml";

    return getData(this.authDetails, url);
  }
  getTopSellingBooks(booksCategoryUrl: string) {
    return getData(this.authDetails, booksCategoryUrl);
  }
  doKeywordSearch(keyword: string, limit: number = 5) {
    let url =
      this.authDetails.format == "json"
        ? "https://affiliate-api.flipkart.net/affiliate/1.0/search.json?query=" +
          keyword +
          "&resultCount=" +
          limit
        : "https://affiliate-api.flipkart.net/affiliate/1.0/search.xml?query=" +
          keyword +
          "&resultCount=" +
          limit;
    return getData(this.authDetails, url);
  }
  doIdSearch(id: string) {
    let url =
      this.authDetails.format == "json"
        ? "https://affiliate-api.flipkart.net/affiliate/1.0/product.json?id=" +
          id
        : "https://affiliate-api.flipkart.net/affiliate/1.0/product.xml?id=" +
          id;
    return getData(this.authDetails, url);
  }
  getAllOffers() {
    let url =
      this.authDetails.format == "json"
        ? "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json"
        : "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/xml";
    return getData(this.authDetails, url);
  }
  getDealsOfTheDay() {
    let url =
      this.authDetails.format == "json"
        ? "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json"
        : "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/xml";
    return getData(this.authDetails, url);
  }
  getOrdersReport(info: any) {
    let url =
      this.authDetails.format == "json"
        ? "https://affiliate-api.flipkart.net/affiliate/report/orders/detail/json?startDate=" +
          info.startDate +
          "&endDate=" +
          info.endDate +
          "&status=" +
          info.status +
          "&offset=" +
          info.offset
        : "https://affiliate-api.flipkart.net/affiliate/report/orders/detail/xml?startDate=" +
          info.startDate +
          "&endDate=" +
          info.endDate +
          "&status=" +
          info.status +
          "&offset=" +
          info.offset;

    return getData(this.authDetails, url);
  }

  getAppInstallReport(info: any) {
    let url =
      this.authDetails.format == "json"
        ? "https://affiliate-api.flipkart.net/affiliate/v1/appInstall/json?startDate=" +
          info.startDate +
          "&endDate=" +
          info.endDate +
          "&status=" +
          info.status
        : "https://affiliate-api.flipkart.net/affiliate/v1/appInstall/xml?startDate=" +
          info.startDate +
          "&endDate=" +
          info.endDate +
          "&status=" +
          info.status;
    return getData(this.authDetails, url);
  }
}

/**
 * function accepts AuthDetails and URL
 */
let getData = function(details: AffiliateDetails, url: string) {
  let headers = {
    "Fk-Affiliate-Id": details.trackingId,
    "Fk-Affiliate-Token": details.token
  };

  return new Promise((resolve: any, reject: any) => {
    request(
      {
        url: url,
        headers: headers
      },
      function(error: any, response: any, body: any) {
        if (error) reject(error);
        else {
          resolve({
            status: response.statusCode,
            error: getStatusError(response.statusCode),
            body: body
          });
        }
      }
    );
  });
};

/**
 * FUnction Returning the Error Status
 */

let getStatusError = function(statusCode: Number) {
  if (statusCode == 400) return "Bad request";
  else if (statusCode == 401)
    return "Unauthorized. Affiliate Id or Token InCorrect";
  else if (statusCode == 403) return "Forbidden";
  else if (statusCode == 404) return "Error: Not Found";
  else if (statusCode == 500) return "Internal Server Error";
  else if (statusCode == 503) return "Service unavailable";
  else if (statusCode == 599) return "Connection timed out";
  else if (statusCode == 410)
    return "Resource requested is no longer available";
  else if (statusCode == 200) return null;
  else return "Unknown Error Occured";
};
