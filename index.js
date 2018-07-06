"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
class CreateAffiliateClient {
    constructor(authDetails) {
        this.authDetails = authDetails;
    }
    getProductsFeedListing() {
        let url = this.authDetails.format == "json"
            ? "https://affiliate-api.flipkart.net/affiliate/api/" +
                this.authDetails.trackingId +
                ".json"
            : "https://affiliate-api.flipkart.net/affiliate/api/" +
                this.authDetails.trackingId +
                ".xml";
        return getData(this.authDetails, url);
    }
    getProductsFeed(CategoryUrl) {
        return getData(this.authDetails, CategoryUrl);
    }
    getBooksCategoryFeed() {
        let url = this.authDetails.format == "json"
            ? "https://affiliate-api.flipkart.net/affiliate/1.0/booksApi/" +
                this.authDetails.trackingId +
                ".json"
            : "https://affiliate-api.flipkart.net/affiliate/1.0/booksApi/" +
                this.authDetails.trackingId +
                ".xml";
        return getData(this.authDetails, url);
    }
    getTopSellingBooks(booksCategoryUrl) {
        return getData(this.authDetails, booksCategoryUrl);
    }
    doKeywordSearch(keyword, limit = 5) {
        let url = this.authDetails.format == "json"
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
    doIdSearch(id) {
        let url = this.authDetails.format == "json"
            ? "https://affiliate-api.flipkart.net/affiliate/1.0/product.json?id=" +
                id
            : "https://affiliate-api.flipkart.net/affiliate/1.0/product.xml?id=" +
                id;
        return getData(this.authDetails, url);
    }
    getAllOffers() {
        let url = this.authDetails.format == "json"
            ? "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json"
            : "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/xml";
        return getData(this.authDetails, url);
    }
    getDealsOfTheDay() {
        let url = this.authDetails.format == "json"
            ? "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json"
            : "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/xml";
        return getData(this.authDetails, url);
    }
    getOrdersReport(info) {
        let url = this.authDetails.format == "json"
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
    getAppInstallReport(info) {
        let url = this.authDetails.format == "json"
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
exports.CreateAffiliateClient = CreateAffiliateClient;
/**
 * function accepts AuthDetails and URL
 */
let getData = function (details, url) {
    let headers = {
        "Fk-Affiliate-Id": details.trackingId,
        "Fk-Affiliate-Token": details.token
    };
    return new Promise((resolve, reject) => {
        request_1.default({
            url: url,
            headers: headers
        }, function (error, response, body) {
            if (error)
                reject(error);
            else {
                resolve({
                    status: response.statusCode,
                    error: getStatusError(response.statusCode),
                    body: body
                });
            }
        });
    });
};
/**
 * FUnction Returning the Error Status
 */
let getStatusError = function (statusCode) {
    if (statusCode == 400)
        return "Bad request";
    else if (statusCode == 401)
        return "Unauthorized. Affiliate Id or Token InCorrect";
    else if (statusCode == 403)
        return "Forbidden";
    else if (statusCode == 404)
        return "Error: Not Found";
    else if (statusCode == 500)
        return "Internal Server Error";
    else if (statusCode == 503)
        return "Service unavailable";
    else if (statusCode == 599)
        return "Connection timed out";
    else if (statusCode == 410)
        return "Resource requested is no longer available";
    else if (statusCode == 200)
        return null;
    else
        return "Unknown Error Occured";
};
