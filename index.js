const Container = document.createElement("div");
Container.classList.add("container")
document.body.append(Container)

const Row = document.createElement("div");
Row.classList.add("row")
Container.append(Row)

const Col1 = document.createElement("div");
Col1.classList.add("col-lg-4","col-sm-6")
Row.append(Col1)

const Col2 = document.createElement("div");
Col2.classList.add("col-lg-4","col-sm-6")
Row.append(Col2)

const Col3 = document.createElement("div");
Col3.classList.add("col-lg-4","col-sm-6")
Row.append(Col3)

function createRow() {
    let Row = document.createElement("div");
    Row.classList.add("row")
    return Row
}

function createColumns(){
    let Col = document.createElement("div");
    Col.classList.add("col-lg-4","col-sm-6")
    return Col
}

Row2 = createRow();
appendElement(Container,Row2)
Row2Col1 = createColumns()
appendElement(Row2,Row2Col1)




const fetchData = (url) => {
    return new Promise((res, rej) => {
        fetch(url).then((res) => res.json())
        .then((data) => res(data))
        .catch((e)=> rej(e));
        
    })
};

fetchData("https://restcountries.eu/rest/v2/all")
.then((data) =>{

    let randomNum = Math.floor(Math.random()*250);
    // console.log(randomNum)

     let CardTitle = document.querySelectorAll("h5")
     let Capital = document.querySelectorAll(".capital")
     let Region = document.querySelectorAll(".region")
     let CountryCode = document.querySelectorAll(".code")
     let LatLan = document.querySelectorAll(".latlan")
     let CardImg = document.querySelectorAll("img")
     let WeatherBtn = document.querySelectorAll(".btn")
     let Weather = document.querySelectorAll(".weather")

     console.log(Weather)

    
     
    for(i=0; i<4; i++){
        
    let randomNum = Math.floor(Math.random()*250);

    CardTitle[i].innerText = data[randomNum].name
    Capital[i].innerText = "Capital:"+data[randomNum].capital
    Region[i].innerText = "Region:"+data[randomNum].region
    CountryCode[i].innerText = "Country Code:"+data[randomNum].cioc
    LatLan[i].innerText = "Latitude and Langitude: "+data[randomNum].latlng[0]+", "+data[randomNum].latlng[1]
    CardImg[i].src =  data[randomNum].flag
    
    WeatherBtn[i].addEventListener("click",function(){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+data[randomNum].latlng[0]+"&lon="+data[randomNum].latlng[1]+"&appid=APIKEY").then(res => {
        return res.json();
    }).then(function(res) {
        Weather[i].innerText = (res.weather[0].description);

        console.log(res.weather[0].description);

    });
})

    }
})



function makeCard(){
    let cardName = document.createElement("div");
    cardName.classList.add("card", "text-center")
  

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center")
    cardName.append(cardBody)

    let CardTitle = document.createElement("h5");
    CardTitle.innerText = "Card title"
    cardBody.append(CardTitle)

    let CardImg = document.createElement("img");
    CardImg.src = ""
    CardImg.classList.add("card-body")
    cardBody.append(CardImg)

    let Capital = document.createElement("p");
    Capital.innerText = ""
    Capital.classList.add("card-text","capital")
    cardBody.append(Capital)

    let Region = document.createElement("p");
    Region.innerText = ""
    Region.classList.add("card-text" , "region")
    cardBody.append(Region)

    let CountryCode = document.createElement("p");
    CountryCode.innerText = ""
    CountryCode.classList.add("card-text" , "code")
    cardBody.append(CountryCode)

    let LatLan = document.createElement("p");
    LatLan.innerText = ""
    LatLan.classList.add("card-text","latlan")
    cardBody.append(LatLan)

    let Weather = document.createElement("p");
    Weather.innerText = ""
    Weather.classList.add("card-text", "weather")
    cardBody.append(Weather)

    let WeatherBtn = document.createElement("button");
    WeatherBtn.innerText = "Click for weather"
    WeatherBtn.classList.add("btn", "btn-primary")
    cardBody.append(WeatherBtn)

    return cardName
}

function appendElement(parent, cardName){
    parent.append(cardName)
}

Card1 = makeCard()
appendElement(Col1, Card1);
Card2 = makeCard()
appendElement(Col2, Card2);
Card3 = makeCard()
appendElement(Col3, Card3);
Card4 = makeCard()
appendElement(Row2Col1, Card4);









