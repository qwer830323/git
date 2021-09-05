const dropList = document.querySelectorAll('.drop-list select');
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelectorAll(".to select");
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
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        console.log(exchangeRate);
    })
}
