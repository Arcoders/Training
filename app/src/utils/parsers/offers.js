function addElementToArray(array, element) {
  if (!array.includes(element)) {
    array.push(element);
  }
  return array;
}

function sortByDate(array) {
  let getTimestamp = (str) => +new Date(str);
  return array.sort(
    (a, b) => getTimestamp(a.fetch_datetime) - getTimestamp(b.fetch_datetime)
  );
}

function getGraphOptions(data) {
  let retailerNames = [];
  let products = [];
  let dates = [];

  data.forEach((offer) => {
    addElementToArray(retailerNames, offer.retailer_name);
    addElementToArray(products, offer.product_name);
    addElementToArray(dates, offer.fetch_datetime);
  });

  return { retailerNames, products, dates };
}

function sortAndGetInStockOffers(data) {
  return sortByDate(
    data.map((offer) => {
      const offerCopy = { ...offer };
      offerCopy.fetch_datetime = offer.fetch_datetime.slice(0, 10);
      return offerCopy;
    })
  );
}

function populateOffersByDate({
  dates,
  selectedProduct,
  selectedRetailer,
  offers,
}) {
  return dates.map((currentDate) =>
    offers.filter(
      (offer) =>
        offer.fetch_datetime.includes(currentDate) &&
        offer.product_name === selectedProduct &&
        offer.retailer_name === selectedRetailer
    )
  );
}

function getAxisData(dates, offers) {
  let xAxis = [];
  const yAxis = offers
    .map((offer, index) => {
      if (!!offer.length) {
        xAxis.push(dates[index]);
        return offer;
      }
      return null;
    })
    .filter(Boolean);

  return { xAxis, yAxis };
}

function parseOffers(data, selectedRetailer, selectedProduct) {
  const formatedProducts = sortAndGetInStockOffers(data);
  const { retailerNames, products, dates } = getGraphOptions(formatedProducts);

  const populatedOffersBydate = populateOffersByDate({
    dates,
    selectedProduct,
    selectedRetailer,
    offers: data,
  });

  const { xAxis, yAxis } = getAxisData(dates, populatedOffersBydate);
  return { xAxis, yAxis, products, retailerNames };
}

export default parseOffers;
