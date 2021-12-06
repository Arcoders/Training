const TABLE_OPTIONS = {
    columns: ["Product", "Retailer", "Stock", "Price", "Date"],
    rowKeys: ['product_name', 'retailer_name', 'stock_info', 'total_price', 'fetch_datetime'],
    currentPage: 1,
    itemsPerPage: 8,
    paginationPagesPerSide: 3
  }

const CHART_PLOT_OPTIONS = {
    max: 10,
    min: 0,
    steps: 5,
    columnSize: 50,
    rowSize: 80,
    margin: 20,
    priceMargin: 30,
    skip: 4
}

const RETAILER = "Amazon Fresh ES";
const PRODUCT = "Maestros de Hojiblanca El Nuestro 1L"

export {
    TABLE_OPTIONS,
    CHART_PLOT_OPTIONS,
    RETAILER,
    PRODUCT
}