const apiKey = "ecf6c43f8a0f7046b37998d2b1c51ef6";
let city;
let latitude;
let longitude;

//DOM references
const searchBox = document.getElementById("searchbox");
const searchBoxMb = document.getElementById("searchboxmb");
const searchBtnMb = document.getElementById("searchbtn");
const domCity = document.getElementById("city");
const country = document.getElementById("country");
const wetherDescription = document.getElementById("wh-description");
const tempMain = document.getElementById("tempmain");
const feelsLike = document.getElementById("feelslike");
const maxTemp = document.getElementById("maxtemp");
const minTemp = document.getElementById("mintemp");
const dateMain = document.getElementById("datemain");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const rainChance = document.getElementById("rain");
const windSpeed = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");
const day4 = document.getElementById("day4");
const tempTom = document.getElementById("temptom");
const temp1 = document.getElementById("temp1");
const temp2 = document.getElementById("temp2");
const temp3 = document.getElementById("temp3");
const temp4 = document.getElementById("temp4");
const wind1 = document.getElementById("wind1");
const wind2 = document.getElementById("wind2");
const wind3 = document.getElementById("wind3");
const wind4 = document.getElementById("wind4");
const wind5 = document.getElementById("wind5");
const humidity1 = document.getElementById("humidity1");
const humidity2 = document.getElementById("humidity2");
const humidity3 = document.getElementById("humidity3");
const humidity4 = document.getElementById("humidity4");
const humidity5 = document.getElementById("humidity5");
const icon1 = document.getElementById("img1");
const icon2 = document.getElementById("img2");
const icon3 = document.getElementById("img3");
const icon4 = document.getElementById("img4");
const icon5 = document.getElementById("img5");
const cloudBig = document.querySelector(".cloud-big");
const cloudMed = document.querySelector(".cloud-medium");
const cloudSmall = document.querySelector(".cloud-small");
const locationBtn = document.getElementById("gpsbtn");
const mbLocationBtn = document.getElementById("gpsbtn2");
const searchBtn = document.getElementById("search-btn");


//initializing array for recently searched cities

const recentCities = JSON.parse(sessionStorage.getItem("recentCities")) || [];


// event listener to get data after entering the city

searchBox.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    city = this.value;
    getDatabyCityName();   
  }
});

searchBtn.addEventListener("click", function(){
    city = searchBox.value;
    getDatabyCityName();
})

// showing recent cities 
const dropdownUl = document.querySelector(".dropdown");
searchBox.addEventListener("mouseover", function(){
  
      dropdownUl.innerHTML=""
    recentCities.forEach((cityy)=>{
        
        const listElement = document.createElement("li");
        listElement.classList.add("dropdown-item");
        listElement.innerText= cityy;
        listElement.addEventListener("click", function(){city=cityy; getDatabyCityName()})
        dropdownUl.appendChild(listElement);
    })
})




//mobile devices seachbox event listener
searchBtnMb.addEventListener("click", function () {
  city = searchBoxMb.value;
  getDatabyCityName();
});



locationBtn.addEventListener("click", getLocation);
mbLocationBtn.addEventListener("click", getLocation);

// function to fetch data from api and update in the dom

async function getDatabyCityName() {
  try {
    if (!city.trim() == "") {
      domCity.classList.add("loading");
      domCity.classList.add("loading-dots");
      domCity.classList.add("loading-md");
      country.classList.add("loading");
      country.classList.add("loading-dots");
      country.classList.add("loading-md");
      wetherDescription.classList.add("loading");
      wetherDescription.classList.add("loading-lg");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      //updating dom elements with data from api
      if (response.ok) {
        const data = await response.json();
        domCity.innerText = data.city.name;
        country.innerText = data.city.country;
        wetherDescription.innerText = data.list[0].weather[0].description;
        tempMain.innerText = data.list[0].main.temp;
        feelsLike.innerText = data.list[0].main.feels_like;
        maxTemp.innerText = data.list[0].main.temp_max;
        minTemp.innerText = data.list[0].main.temp_min;
        //convert date
        const day = getDayOfWeek(data.list[0].dt);
        dateMain.innerText = day;

        const sunriseTime = getLocalTime(data.city.sunrise, data.city.timezone);
        const sunsetTime = getLocalTime(data.city.sunset, data.city.timezone);
        sunrise.innerText = sunriseTime;
        sunset.innerText = sunsetTime;

        rainChance.innerText = `${data.list[0].pop * 100}%`;
        rainChance.style = `--value:${data.list[0].pop * 100};`;
        windSpeed.innerText = data.list[0].wind.speed;
        humidity.innerText = data.list[0].main.humidity;
        day1.innerText = getDayOfWeek(data.list[17].dt);
        day2.innerText = getDayOfWeek(data.list[25].dt);
        day3.innerText = getDayOfWeek(data.list[33].dt);
        day4.innerText = getDayOfWeek(data.list[39].dt);
        tempTom.innerText = data.list[9].main.temp;
        temp1.innerText = data.list[17].main.temp;
        temp2.innerText = data.list[25].main.temp;
        temp3.innerText = data.list[33].main.temp;
        temp4.innerText = data.list[39].main.temp;
        wind1.innerText = data.list[9].wind.speed;
        wind2.innerText = data.list[17].wind.speed;
        wind3.innerText = data.list[25].wind.speed;
        wind4.innerText = data.list[33].wind.speed;
        wind5.innerText = data.list[39].wind.speed;
        humidity1.innerText = data.list[9].main.humidity;
        humidity2.innerText = data.list[17].main.humidity;
        humidity3.innerText = data.list[25].main.humidity;
        humidity4.innerText = data.list[33].main.humidity;
        humidity5.innerText = data.list[39].main.humidity;
        icon1.src = `https://openweathermap.org/img/wn/${data.list[9].weather[0].icon.replace(
          "n",
          "d"
        )}@2x.png`;
        icon2.src = `https://openweathermap.org/img/wn/${data.list[17].weather[0].icon.replace(
          "n",
          "d"
        )}@2x.png`;
        icon3.src = `https://openweathermap.org/img/wn/${data.list[25].weather[0].icon.replace(
          "n",
          "d"
        )}@2x.png`;
        icon4.src = `https://openweathermap.org/img/wn/${data.list[33].weather[0].icon.replace(
          "n",
          "d"
        )}@2x.png`;
        icon5.src = `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon.replace(
          "n",
          "d"
        )}@2x.png`;
        icon1.classList.add("icon");
        icon2.classList.add("icon");
        icon3.classList.add("icon");
        icon4.classList.add("icon");
        icon5.classList.add("icon");

        const cloudiness = data.list[0].clouds.all;

        switch (true) {
          case cloudiness === 0:
            cloudBig.classList.add("hidden");
            cloudMed.classList.add("hidden");
            cloudSmall.classList.add("hidden");
            break;
          case cloudiness > 0 && cloudiness < 25:
            cloudBig.classList.add("hidden");
            cloudMed.classList.add("hidden");
            cloudSmall.classList.remove("hidden");
            break;
          case cloudiness >= 25 && cloudiness <= 75:
            cloudBig.classList.add("hidden");
            cloudMed.classList.remove("hidden");
            cloudSmall.classList.remove("hidden");
            break;
          case cloudiness > 75:
            cloudBig.classList.remove("hidden");
            cloudMed.classList.remove("hidden");
            cloudSmall.classList.remove("hidden");
            break;
          default:
            cloudBig.classList.add("hidden");
            cloudMed.classList.add("hidden");
            cloudSmall.classList.add("hidden");
        }

        console.log(data);

        //adding the serched city to the session storage
        if (!recentCities.includes(city.toLowerCase())) {
          // If the city is not in the array, push it
          recentCities.push(city.toLowerCase());
          saveCityToSessionStorage();
        }
      } else {
        if(response.status==404){
          throw new Error("City Not found. Try different one.");
        }else if(response.status==401 || response.status== 403){
          throw new Error("API access denied");
        }
        
      }
    } else {
      alert("Please enter city name and try again.")
      return;
    }
  } catch (error) {
    alert(error);
  } finally {
    domCity.classList.remove("loading");
    domCity.classList.remove("loading-dots");
    domCity.classList.remove("loading-md");
    country.classList.remove("loading");
    country.classList.remove("loading-dots");
    country.classList.remove("loading-md");
    wetherDescription.classList.remove("loading");
    wetherDescription.classList.remove("loading-lg");
  }
}

async function getDatabyLocation() {
  try {
    const loading = document.createElement("span");
    loading.classList.add("loading");
    loading.classList.add("loading-dots");
    loading.classList.add("loading-lg");
    locationBtn.innerHTML = "";
    locationBtn.appendChild(loading);
    domCity.classList.add("loading");
    domCity.classList.add("loading-dots");
    domCity.classList.add("loading-md");
    country.classList.add("loading");
    country.classList.add("loading-dots");
    country.classList.add("loading-md");
    wetherDescription.classList.add("loading");
    wetherDescription.classList.add("loading-lg");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    if (response.ok) {
      const data = await response.json();
      domCity.innerText = data.city.name;
      country.innerText = data.city.country;
      wetherDescription.innerText = data.list[0].weather[0].description;
      tempMain.innerText = data.list[0].main.temp;
      feelsLike.innerText = data.list[0].main.feels_like;
      maxTemp.innerText = data.list[0].main.temp_max;
      minTemp.innerText = data.list[0].main.temp_min;
      
      dateMain.innerText = getDayOfWeek(data.list[0].dt);
       

      const sunriseTime = getLocalTime(data.city.sunrise, data.city.timezone);
      const sunsetTime = getLocalTime(data.city.sunset, data.city.timezone);
      sunrise.innerText = sunriseTime;
      sunset.innerText = sunsetTime;

      rainChance.innerText = `${data.list[0].pop * 100}%`;
      rainChance.style = `--value:${data.list[0].pop * 100};`;
      windSpeed.innerText = data.list[0].wind.speed;
      humidity.innerText = data.list[0].main.humidity;
      day1.innerText = getDayOfWeek(data.list[17].dt);
      day2.innerText = getDayOfWeek(data.list[25].dt);
      day3.innerText = getDayOfWeek(data.list[33].dt);
      day4.innerText = getDayOfWeek(data.list[39].dt);
      tempTom.innerText = data.list[9].main.temp;
      temp1.innerText = data.list[17].main.temp;
      temp2.innerText = data.list[25].main.temp;
      temp3.innerText = data.list[33].main.temp;
      temp4.innerText = data.list[39].main.temp;
      wind1.innerText = data.list[9].wind.speed;
      wind2.innerText = data.list[17].wind.speed;
      wind3.innerText = data.list[25].wind.speed;
      wind4.innerText = data.list[33].wind.speed;
      wind5.innerText = data.list[39].wind.speed;
      humidity1.innerText = data.list[9].main.humidity;
      humidity2.innerText = data.list[17].main.humidity;
      humidity3.innerText = data.list[25].main.humidity;
      humidity4.innerText = data.list[33].main.humidity;
      humidity5.innerText = data.list[39].main.humidity;
      icon1.src = `https://openweathermap.org/img/wn/${data.list[9].weather[0].icon.replace(
        "n",
        "d"
      )}.png`;
      icon2.src = `https://openweathermap.org/img/wn/${data.list[17].weather[0].icon.replace(
        "n",
        "d"
      )}.png`;
      icon3.src = `https://openweathermap.org/img/wn/${data.list[25].weather[0].icon.replace(
        "n",
        "d"
      )}.png`;
      icon4.src = `https://openweathermap.org/img/wn/${data.list[33].weather[0].icon.replace(
        "n",
        "d"
      )}.png`;
      icon5.src = `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon.replace(
        "n",
        "d"
      )}.png`;

      const cloudiness = data.list[0].clouds.all;

      switch (true) {
        case cloudiness === 0:
          cloudBig.classList.add("hidden");
          cloudMed.classList.add("hidden");
          cloudSmall.classList.add("hidden");
          break;
        case cloudiness > 0 && cloudiness < 25:
          cloudBig.classList.add("hidden");
          cloudMed.classList.add("hidden");
          cloudSmall.classList.remove("hidden");
          break;
        case cloudiness >= 25 && cloudiness <= 75:
          cloudBig.classList.add("hidden");
          cloudMed.classList.remove("hidden");
          cloudSmall.classList.remove("hidden");
          break;
        case cloudiness > 75:
          cloudBig.classList.remove("hidden");
          cloudMed.classList.remove("hidden");
          cloudSmall.classList.remove("hidden");
          break;
        default:
          cloudBig.classList.add("hidden");
          cloudMed.classList.add("hidden");
          cloudSmall.classList.add("hidden");
      }

      console.log(data);
    } else {
      if(response.status==404){
        throw new Error("City Not found. Check Spelling or Try different one.");
      }else if(response.status==401 || response.status== 403){
        throw new Error("API access denied");
      }
      
    }
  } catch (error) {
    alert(error);
  } finally {
    locationBtn.innerHTML = "Use Location";
    domCity.classList.remove("loading");
    domCity.classList.remove("loading-dots");
    domCity.classList.remove("loading-md");
    country.classList.remove("loading");
    country.classList.remove("loading-dots");
    country.classList.remove("loading-md");
    wetherDescription.classList.remove("loading");
    wetherDescription.classList.remove("loading-lg");
  }
}



function getLocation() {
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000, // maximum time allowed to retrieve the location
      maximumAge: 0, // force the device to get a fresh location
    };

    navigator.geolocation.getCurrentPosition(getPosition, showError, options);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function getPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  console.log("Latitude: " + latitude + ", Longitude: " + longitude);
  getDatabyLocation();
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

// function to get day of the week from unix
function getDayOfWeek(unixTimestamp) {
  let milliseconds = unixTimestamp * 1000;
  let date = new Date(milliseconds);

  let dayOfWeek = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[dayOfWeek];
}

// function to get local time from unixTimestamp

function getLocalTime(unixTimestamp, timezoneShift) {
  let milliseconds = unixTimestamp * 1000;

  let date = new Date(milliseconds);

  date.setTime(date.getTime() + timezoneShift * 1000); // Adjusting for timezone shift

  let localTimeString = date.toLocaleTimeString("en-US", { timeZone: "UTC" }); // this returns the time string in hh:mm:ss AM/PM format.

  return localTimeString;
}

//function to save cities to session storage
function saveCityToSessionStorage(){
  sessionStorage.setItem("recentCities", JSON.stringify(recentCities));
}

// dark light mode functionality

const toggle = document.getElementById("dark-toggle");

toggle.addEventListener("change", function () {
  if (toggle.checked) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  }
});

window.onload = function () {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    toggle.checked = true;
    document.documentElement.classList.add("dark");
  } else {
    toggle.checked = false;
    document.documentElement.classList.remove("dark");
  }
};
