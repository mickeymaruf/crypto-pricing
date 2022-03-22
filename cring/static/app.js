
const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d";


const getCoinsPricing = () => {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            buildtCoinsPricing(data)
        })
}

const buildtCoinsPricing = (coins) => {
    let cryptoPricingTableWrapper = document.querySelector("#crypto-pricing-table-wrapper")

    for(let i = 0; i < coins.length; i++){
        let coin = coins[i]
        let price_change_percentage_1h = (coin.price_change_percentage_1h_in_currency+"").slice(0,4)
        let price_change_percentage_24h = (coin.price_change_percentage_24h+"").slice(0,4)

        let euroGerman = Intl.NumberFormat("de-DE", {
            currency: "EUR",
           });
           
        let downColor = ""
        if(coin.price_change_percentage_1h_in_currency < 0){
            downColor = "red"
        } else{
            downColor = "green"
        }

        let coinsCard = `
            <tr>
                <td class="text-center" scope="row">${i+1}</td>
                <td>  <img class="crypto-coin-icon me-md-3" src="${coin.image}">   <span class="fw-bold">${coin.name}</span>   <span class="symbol ms-1">${coin.symbol}</span>    </td>
                <td><i class="fas fa-dollar-sign"><span class="text-black ms-1">${euroGerman.format(coin.current_price)}</span></i></td>
                <td style="color:${downColor}">${price_change_percentage_1h} &#37;</td>
                <td style="color:${downColor}">${price_change_percentage_24h}</td>
                <td><i class="fas fa-dollar-sign me-1"></i><span class="text-black">${euroGerman.format(coin.total_volume)}</span></td>
                <td><i class="fas fa-dollar-sign me-1"></i>${euroGerman.format(coin.market_cap)}</td>
                <td class="chart"></td>
            </tr>
        `
        cryptoPricingTableWrapper.innerHTML += coinsCard;
    }
}

getCoinsPricing()