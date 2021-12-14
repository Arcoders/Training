import { pipe, sortByDate, formatDate } from "../commons";

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
  const dots = [];

  params.dates.forEach((date, i) => {
    const price = (
      params.data.find(
        (data) =>
          data.fetch_datetime.includes(date) &&
          data.product_name === params.selectedProduct &&
          data.retailer_name === params.selectedRetailer
      ) || {}
    ).total_price;

    if (price) dots.push({ x: formatDate(date), y: price })
  });

  delete params.data;

  params.dots = dots;
  return params;
}

function addElementToArrayIfNotExist(array, element) {
  if (!array.includes(element)) {
    array.push(element);
  }
}

export default parseOffers;
