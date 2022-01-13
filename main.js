const btnTheme = document.querySelector(".button_theme");

const theme = document.querySelector("#theme-link");

const imgTheme = document.querySelector(".moon_image");

//Отслеживаем щелчок по кнопке.
btnTheme.addEventListener("click", function () {

  //Если текущий адрес содержит "light-theme.css".
  if (theme.getAttribute("href") == "light-theme.css") {
    theme.href = "dark-theme.css";
    body.style.backgroundImage = 'var(--bg-color), url("images/darkBg.jpg")';
  } else {
    theme.href = "light-theme.css";
    body.style.backgroundImage = 'var(--bg-color), url("images/bg.png")';
  }

  //Если текущий src картинки равен "images/moon.png".
  if (imgTheme.getAttribute("src") == "images/moon.png") {
    imgTheme.src = "images/sun.png";
  } else {
    imgTheme.src = "images/moon.png";
  }

});

const favoritesBtn = document.querySelector('.favorites_button');

const favoritesImg = document.querySelector('.favorites_img');

const favoritesBlock = document.getElementById('favoritesBlock');

//Добавляем событие наведения курсора мыши на картинку избранного.
favoritesBtn.addEventListener('mouseover', () => {
  favoritesImg.src = "images/heart.gif";
});

//Добавляем событие мыши при уходе курсора с кнопки избранного.
favoritesBtn.addEventListener('mouseout', () => {
  if (favoritesBlock.classList.contains('favorites_block_none')) {
    favoritesImg.src = "images/heartWrapper.png";
  } else {
    favoritesImg.src = "images/heart.png";
  }
});

//Добавляем событие мыши при клике на картинку избранного.
favoritesBtn.addEventListener('click', () => {
  favoritesBlock.classList.toggle('favorites_block_none');
  favoritesImg.src = "images/heart.png";
})

const favoritesAddBtn = document.querySelector('.addFavorit_button');

const favoritesAddImg = document.getElementById('favoritesAddimg');

const cityName = document.querySelector(".title_city");

const forecastName = document.querySelector(".weather_block__today_forecast");

const degreeValue = document.querySelector(".weather_block__today_degree");

const humidityValue = document.querySelector(".weather_block__today_humidity");

const windValue = document.querySelector(".weather_block__today_wind");

const fellsLikeValue = document.querySelector(".weather_block__today_fells");

const countryName = document.querySelector(".title_country");

const imageWeather = document.querySelector(".weather_block__today_image");

//Добавляем событие мыши при уходе курсора с кнопки добавления избранного.
favoritesAddBtn.addEventListener('mouseout', () => {
  favoritesAddImg.src = "images/heartAdd.png";
});

const buttonChangeTheme = document.getElementById('buttonTheme');

const body = document.querySelector('body');

//Массив картинок для светлого фона.
let themes = [
  'images/bg.png',
  'images/bgLight1.jpg',
  'images/bgLight2.jpg'
];

//Массив картинок для темного фона.
let themesDark = [
  'images/darkBg.jpg',
  'images/bgDark1.jpg',
  'images/bgDark2.jpg'
];

//Добавляем событие мыши при клике на кнопку смены фона.
buttonChangeTheme.addEventListener('click', function () {

  let check = true;

  let index;

  let prev;

  while (check) {
    index = Math.floor(Math.random() * themesDark.length);
    if (index !== prev) { check = false; }
  }

  while (check) {
    index = Math.floor(Math.random() * themes.length);
    if (index !== prev) { check = false; }
  }

  if (theme.getAttribute("href") == "light-theme.css") {
    body.style.backgroundImage = 'var(--bg-color), url(' + themes[index] + ')';
  } else {
    body.style.backgroundImage = 'var(--bg-color), url(' + themesDark[index] + ')';
  }

  prev = index;
});

//Создаем объект погоды.
let weather = {
  "apiKey": "37d7407e803931d21a78b0be6f1e8fdb",
  fetchWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;
    cityName.innerText = name;
    forecastName.innerText = description;
    degreeValue.innerText = temp;
    humidityValue.innerText = humidity;
    windValue.innerText = speed;
    fellsLikeValue.innerText = `Feels like: ${feels_like}°`;
    countryName.innerText = country;
    imageWeather.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".weather_block").classList.remove("loading");
    //document.body.style.backgroundImage = ("url('https://source.unsplash.com/1600x900/?" +name+"')");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".input_search").value);
  }
};

//Добавляем событие клика мыши по картинке добавления избранного.
favoritesAddBtn.addEventListener('click', () => {
  favoritesAddImg.src = "images/addFavorit.gif";
  favoritesBlock.insertAdjacentHTML('beforeend', `<div class="favorites_block__item">
    <div class="favorites_block__item-header">  
        <button class="favorites_block__item-button">X</button>        
        <p class="favorites_block__item-degree">${degreeValue.textContent}°</p>
        <img src="${imageWeather.src}" alt="" class="favorites_image">
    </div>
    <h4 class="favorites_block__item-title">${cityName.textContent}</h4>
    <h5 class="favorites_block__item-subtitle">${countryName.textContent}</h5>
    <div class="favorites_block__item-additionally">
        <p><i class="fas fa-tint tint-icon"></i><span>${humidityValue.textContent}%</span></p>
        <p><i class="fas fa-wind wind-icon"></i><span>${windValue.textContent}m/s</span></p>
    </div>
  </div>`);
});

//Добавляем событие мыши при клике на кнопку поиска города.
document.querySelector(".button_search").addEventListener('click', () => {
  weather.search();
});

//Добавляем событие клавиш при нажатие Enter на поле ввода города.
document.querySelector(".input_search").addEventListener('keyup', (event) => {
  if (event.key == "Enter") {
    weather.search();
  }
});

const masMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const masDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const current_datetime = new Date();

function zero_format(value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

document.querySelector(".title_date").innerText = masDay[current_datetime.getDay()] + " " + zero_format(current_datetime.getDate()) + " " + masMonth[current_datetime.getMonth()] + " " + current_datetime.getFullYear();

