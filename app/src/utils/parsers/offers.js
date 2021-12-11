import { pipe, sortByDate } from "../commons";

function parseOffers(params) {
  const paramsCopy = { ...params };
  return pipe(
    sortAndFormatDate,
    getGraphOptions,
    populatePricesByDate
  )(paramsCopy);
}

function sortAndFormatDate(params) {
  params.data = sortByDate(
    params.data.map((offer) => {
      offer.fetch_datetime = offer.fetch_datetime.slice(0, 10);
      return offer;
    })
  );
  return params;
}

function getGraphOptions(params) {
  let retailerNames = [];
  let products = [];
  let dates = [];

  params.data.forEach((offer) => {
    addElementToArrayIfNotExist(retailerNames, offer.retailer_name);
    addElementToArrayIfNotExist(products, offer.product_name);
    addElementToArrayIfNotExist(dates, offer.fetch_datetime);
  });

  return { ...params, retailerNames, products, dates };
}

function populatePricesByDate(params) {
  const dates = [];
  const prices = [];
  
  params.dates.forEach((date) => {
    const price = (
      params.data.find(
        (data) =>
          data.fetch_datetime.includes(date) &&
          data.product_name === params.selectedProduct &&
          data.retailer_name === params.selectedRetailer
      ) || {}
    ).total_price;

    if (price) {
      prices.push(price * 10);
      dates.push(date);
    }
  });

  delete params.data;

  params.prices = prices;
  params.dates = dates;
  return params;
}

function addElementToArrayIfNotExist(array, element) {
  if (!array.includes(element)) {
    array.push(element);
  }
}

export default parseOffers;
