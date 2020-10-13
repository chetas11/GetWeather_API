
// -----------------------------Functions---------------------------------------------------

//Function to create Row's

function createRow() {
    let Row = document.createElement("div");
    Row.classList.add("row","mt-4")
    return Row
}

//Function to create Column's

function createColumns(){
    let Col = document.createElement("div");
    Col.classList.add("col-lg-4","col-sm-6");
    return Col;
}

//Function to create Modal.

function Modal() {
    let Modal = document.createElement("div");
    Modal.classList.add("modal","fade","bd-example-modal-sm");
    Modal.setAttribute("role","dialog");

    let ModalInner = document.createElement("div");
    ModalInner.classList.add("modal-dialog", "modal-dialog-centered");
    Modal.appendChild(ModalInner);

    let ModalContent = document.createElement("div");
    ModalContent.classList.add("modal-content","text-center")
    ModalInner.appendChild(ModalContent)

    let ModalIcon = document.createElement("img");
    ModalIcon.classList.add("img-fluid", "text-center");
    ModalIcon.src = "";
    ModalContent.appendChild(ModalIcon)

    let ModalHeading = document.createElement("div");
    ModalHeading.classList.add("weather")
    ModalHeading.innerText = ""
    ModalContent.appendChild(ModalHeading)

    return Modal
}

//Function to create Card.

function createCard(){
    let cardName = document.createElement("div");
    cardName.classList.add("card", "text-center")
  

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center")
    cardName.append(cardBody)

    let CardTitle = document.createElement("h5");
    CardTitle.innerText = "Card title"
    CardTitle.classList.add("card-header")
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

    let WeatherBtn = document.createElement("button");
    WeatherBtn.innerText = "Click for weather"
    WeatherBtn.classList.add("btn", "btn-primary")
    WeatherBtn.setAttribute("data-toggle","modal")
    WeatherBtn.setAttribute("data-target",".bd-example-modal-sm")
    cardBody.append(WeatherBtn)
    return cardName
}

//Function to append Element.

function appendElement(parent, cardName){
    parent.appendChild(cardName)
}


// -----------------------------Structure Part----------------------------------------------------

const Container = document.createElement("div");
Container.classList.add("container")
document.body.append(Container)

for(i=0; i<84; i++){                    //for loop to render rows, col and cards
    Row = createRow()
    appendElement(Container,Row)
    Col = createColumns()
    appendElement(Row,Col)
    Card = createCard()
    appendElement(Col,Card)
    Col = createColumns()
    appendElement(Row,Col)
    Card = createCard()
    appendElement(Col,Card)
    Col = createColumns()
    appendElement(Row,Col)
    Card = createCard()
    appendElement(Col,Card)
}

newModal = Modal();
Container.appendChild(newModal)


//-----------------------------Rest Counntry API and OpenWeather API to fetch the Data---------------


const fetchData = (url) => {
    return new Promise((res, rej) => {
        fetch(url).then((res) => res.json())
        .then((data) => res(data))
        .catch((e)=> rej(e));
        
    })
};

fetchData("https://restcountries.eu/rest/v2/all")
.then((data) =>{

     let CardTitle = document.querySelectorAll("h5")
     let Capital = document.querySelectorAll(".capital")
     let Region = document.querySelectorAll(".region")
     let CountryCode = document.querySelectorAll(".code")
     let LatLan = document.querySelectorAll(".latlan")
     let CardImg = document.querySelectorAll("img")
     let WeatherBtn = document.querySelectorAll("button")
     let ModalHeading = document.querySelector(".weather")
     let Icon = document.querySelector(".img-fluid")

    for(i=0; i<data.length; i++){

        CardTitle[i].innerText = data[i].name
        Capital[i].innerText = "Capital: "+data[i].capital
        Region[i].innerText = "Region: "+data[i].region
        CountryCode[i].innerText = "Country Code: "+data[i].cioc
        LatLan[i].innerText = "Latitude and Langitude: "+data[i].latlng[0]+", "+data[i].latlng[1]
        CardImg[i].src =  data[i].flag

        let lat = data[i].latlng[0]
        let long = data[i].latlng[1]
    
 
        WeatherBtn[i].addEventListener("click",function(){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=e075a128a6a8c01f093dbe05e203a7b5").then(res => {
        return res.json();
        }).then(function(res) {

                let temp = (res.main.temp-273.15).toFixed(2)
                ModalHeading.innerText = res.weather[0].description.toUpperCase();
                ModalHeading.innerText = ModalHeading.innerText + " Temp: "+ temp+"°C"
                let iconcode = res.weather[0].icon;
                Icon.src = "http://openweathermap.org/img/wn/"+iconcode+"@2x.png";       

        });
        
    });
}


});















