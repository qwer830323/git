// https://www.youtube.com/watch?v=UY7F37KHyI8&t=1063s
const dropList = document.querySelectorAll('.drop-list select');
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let getButton = document.querySelector("form button");
for(let i = 0; i < dropList.length; i++){
    for(currency_code in country_code){
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "NRF" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchabgeRate();
});

function getExchabgeRate(){
    const amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/dfc8d86280b1eae186693a90/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        const exchangeRateTwxt = document.querySelector('.exchange-rate');
        exchangeRateTwxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
}
