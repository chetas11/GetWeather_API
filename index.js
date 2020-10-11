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

const Card = document.createElement("div");
Card.classList.add("card", "text-center", "mt-5")
Col1.append(Card)

const CardBody = document.createElement("div");
CardBody.classList.add("card-body")
Card.append(CardBody)

const CardTitle = document.createElement("h5");
CardTitle.innerText = "Card title"
CardTitle.classList.add("card-body")
CardBody.append(CardTitle)

const CardImg = document.createElement("img");
CardImg.src = ""
CardImg.classList.add("card-body")
CardBody.append(CardImg)

const Capital = document.createElement("p");
Capital.innerText = "Some"
Capital.classList.add("card-text")
CardBody.append(Capital)

const Region = document.createElement("p");
Region.innerText = "Some"
Region.classList.add("card-text")
CardBody.append(Region)

const CountryCode = document.createElement("p");
CountryCode.innerText = "Some"
CountryCode.classList.add("card-text")
CardBody.append(CountryCode)

const LatLan = document.createElement("p");
LatLan.innerText = "Some"
LatLan.classList.add("card-text")
CardBody.append(LatLan)

const Weather = document.createElement("p");
Weather.innerText = ""
Weather.classList.add("card-text", "weather")
CardBody.append(Weather)

const WeatherBtn = document.createElement("button");
WeatherBtn.innerText = "Click for weather"
WeatherBtn.classList.add("btn", "btn-primary")
CardBody.append(WeatherBtn)




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

    CardTitle.innerText = data[randomNum].name
    Capital.innerText = "Capital:"+data[randomNum].capital
    Region.innerText = "Region:"+data[randomNum].region
    CountryCode.innerText = "Country Code:"+data[randomNum].cioc
    LatLan.innerText = "Latitude and Langitude: "+data[randomNum].latlng[0]+", "+data[randomNum].latlng[1]
    CardImg.src =  data[randomNum].flag

    WeatherBtn.addEventListener("click",function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+data[randomNum].latlng[0]+"&lon="+data[randomNum].latlng[1]+"&appid=apikey").then(res => {
     return res.json();
}).then(function(res) {
    Weather.innerText = (res.weather[0].description.toUpperCase());
});
})
})






