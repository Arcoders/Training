function formateDate(date) {
    return (date ? date.slice(5) : date || "").replace('-', '/')
}

function removeEmptyPrices(prices) {
    return prices.map(current => {
        const [price] = current.map((current) => current.total_price);
        if (price) {
          return price * 10;
        }
        return undefined;
      }).filter(Boolean);
}

export { formateDate, removeEmptyPrices }