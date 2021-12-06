const URL = "https://orders-api.qa.shalion.com/v1/orders";

const API = {
    getOffers() {
        return fetch(URL)
            .then(res => res.json())
            .then(({ data }) => data)
    }
}

export default API