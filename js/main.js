const api = {
    key: "c6a2fa3df12690bef70e2a003d45e36f",
    base: "https://api.openweathermap.org/data/2.5/"
}
const container = document.querySelector('.container');
const gridTest = document.querySelector('.grid-test');
const dailyContainer = document.querySelector('.daily-container');
const swiperContainer = document.querySelector('.swiper-container');


    document.addEventListener("mousemove",parallax);
    function parallax(event){
        this.querySelectorAll('.layer-img').forEach(layer => {
            const speed = layer.getAttribute('data-speed');

            const x = (window.innerWidth - event.pageX*speed)/100;
            const y = (window.innerHeight - event.pageY*speed)/100;
            layer.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
    }

    function parallaxMob(event){
        this.querySelectorAll('.layer-img').forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const x = (window.innerWidth - event.changedTouches[0].pageX*speed)/100;
            const y = (window.innerHeight - event.changedTouches[0].pageY*speed)/100;
            layer.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
    }
    
 

document.addEventListener("touchmove",parallaxMob);


const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keyup',setQuery);

const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', clickFunction);

function clickFunction(){
    getResults(searchBox.value);
    
    /*if (flag > 0){

    }*/
    
    
}
//searchBox.addEventListener('click', console.log("cerf"));

function setQuery(event) {
    console.log(event.keyCode);
    if (event.keyCode == "13"){
        console.dir(searchBox);
        console.log(searchBox.value);
        getResults(searchBox.value);
    }
}

function getResults(query){
    let perem = dailyContainer.classList.contains('daily-container--active');
    if(!perem){
        dailyContainer.classList.add('daily-container--active');
        //swiperContainer.classList.add('swiper-сontainer--active');
        //dailyContainer.style.width = '600px';
        //dailyContainer.style.height = '200px';
    }

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
           return weather.json();
        }).then(displayResults);
    
    console.log(query+" это значение query");
    /*fetch(`${api.base}onecall?lat={lat}&lon={lon}&exclude={part}&APPID=${api.key}   weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather2 => {
           return weather2.json();
        }).then(displayResults2);*/
    
  /*  ;*/
}

function displayResults2(weather2) {
    console.log(weather2);
    dailyItem = document.querySelectorAll('.daily-item');
    for (let i = 0; i < dailyItem.length; i++ ){
        if (!dailyItem[i].classList.contains(`daily-item--${i}--active`)){
            dailyItem[i].classList.add(`daily-item--${i}--active`);
        }
        else{
            dailyItem[i].classList.remove(`daily-item--${i}--active`);
            setTimeout(() => {
                dailyItem[i].classList.add(`daily-item--${i}--active`);
            }, 500);
           // dailyItem[i].classList.add(`daily-item--${i}--active`);
        }        
        let dailyItemDate = dailyItem[i].querySelector('.daily-item__date');
       // let newDate = weather2.daily[i].dt;
       // let newDay = newDate.getDate();
        let weekDate = new Date(weather2.daily[i].dt * 1000);
        let months = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
        let month = months[weekDate.getMonth()];
        let date = weekDate.getDate();

        let icon = dailyItem[i].querySelector('.daily-item__img');
        if ((weather2.daily[i].weather[0].icon == "13d")||(weather2.daily[i].weather[0].icon == "13n")){
            icon.src = `./img/weatherIcons/icon-snowflake.svg`;

        }
        else if (weather2.daily[i].weather[0].icon == "01d"){
            icon.src = `./img/weatherIcons/icon-clearSky.svg`;
        }
        else if (weather2.daily[i].weather[0].icon == "01n"){
            icon.src = `./img/weatherIcons/icon-clearSky-night.svg`;
        }
        else if (weather2.daily[i].weather[0].icon == "02d"){
            icon.src = `./img/weatherIcons/icon-fewClouds.svg`;
        }
        else if (weather2.daily[i].weather[0].icon == "02n"){
            icon.src = `./img/weatherIcons/icon-fewClouds-night.svg`;
        }
        else if ((weather2.daily[i].weather[0].icon == "03d")||(weather2.daily[i].weather[0].icon == "03n")){
            icon.src = `./img/weatherIcons/icon-scatteredClouds.svg`;
        }
        else if ((weather2.daily[i].weather[0].icon == "04d")||(weather2.daily[i].weather[0].icon == "04n")){
            icon.src = `./img/weatherIcons/icon-brokenClouds.svg`;
        }
        else if (weather2.daily[i].weather[0].icon == "09d"){
            icon.src = `./img/weatherIcons/icon-rain.svg`;
        }
        else if (weather2.daily[i].weather[0].icon == "09n"){
            icon.src = `./img/weatherIcons/icon-rain-nigth.svg`;
        }
        else if((weather2.daily[i].weather[0].icon == "09d")||(weather2.daily[i].weather[0].icon == "09n")){
            icon.src = `./img/weatherIcons/icon-showerRain.svg`;
        }
        else if(weather2.daily[i].weather[0].icon == "10d"){
            icon.src = `./img/weatherIcons/icon-rain.svg`;
        }
        else if(weather2.daily[i].weather[0].icon == "10n"){
            icon.src = `./img/weatherIcons/icon-rain-nigth.svg`;
        }
        else if((weather2.daily[i].weather[0].icon == "11d")||(weather2.daily[i].weather[0].icon == "11n")){
            icon.src = `./img/weatherIcons/icon-thunderstorm.svg`;
        }
        else if((weather2.daily[i].weather[0].icon == "50d")||(weather2.daily[i].weather[0].icon == "50n")){
            icon.src = `./img/weatherIcons/icon-mist.svg`;
        }
        
       // console.log(dayDate.toString());
        //console.log(dayDate.getDate());
        if (i>0){
            dailyItemDate.innerHTML = `${(date)}&nbsp;${(month)}`;
        }
        else {
            dailyItemDate.innerHTML = `Сегодня`;
        }
        
        //console.log(dailyItemDate);

        let dailyItemTempDay = dailyItem[i].querySelector('.daily-item__temp-day');
        if (i>0){
            dailyItemTempDay.innerText = `${(weather2.daily[i].temp.day).toFixed(1)}°c`;
        }
        else {
            dailyItemTempDay.innerHTML = `днём&nbsp;${(weather2.daily[i].temp.day).toFixed(1)}°c`;
        }

        let dailyItemTempNight = dailyItem[i].querySelector('.daily-item__temp-night');
        if (i>0){
            dailyItemTempNight.innerText = `${(weather2.daily[i].temp.night).toFixed(1)}°c`;
        }
        else {
            dailyItemTempNight.innerHTML = `ночью&nbsp;${(weather2.daily[i].temp.night).toFixed(1)}°c`;
        }

        let dailyItemDescription = dailyItem[i].querySelector('.daily-item__description');
        dailyItemDescription.innerText = `${(weather2.daily[i].weather[0].main)}`;
    }
    
}

function displayResults(weather) {
    console.log(weather);
  //  console.log(weather.coord.lat+" ширина");
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    //let past = new Date("January 4, 1957 19:28:34 GMT"); // создали объект с датой и временем
    //console.log(past);

    let now = new Date(); // создали объект с текущей датой и временем
    let date = document.querySelector('.date');
    
    //let currentDate = now.getMonth();
    //console.log(currentDate);
    date.innerText = dateBuilder(now);

    let temperature = document.querySelector('.temperature');
    temperature.innerHTML = `${(weather.main.temp).toFixed(1)}<span class="celsius">°c</span>`;

    let weatherElement = document.querySelector('.weather');
    weatherElement.innerText = `${weather.weather[0].main}`;

    if (weather.weather[0].main == "Snow") {   // Если погода = дождю, запустить функцию дождя
        makeItSnow(defaultDropNum);
       // makeItRain(0);
    }
    else if (weather.weather[0].main == "Rain"){
       // makeItSnow(0);
        makeItRain(defaultDropNum);
    }
    else {
         makeItSnow(0);
         makeItRain(0);
     }
    //Иконка погоды
    //let icon = document.querySelector('.icon');
    //icon.src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

    let hiLow = document.querySelector('.hi-low');
   // hiLow.innerText = `${Math.floor(weather.main.temp_min)}°c / ${Math.ceil(weather.main.temp_max)}°c`
   // hiLow.innerText = `${(weather.main.temp_min).toFixed(1)}°c / ${(weather.main.temp_max).toFixed(1)}°c`;
    hiLow.innerHTML = `Ощущается как&nbsp;${(weather.main.feels_like).toFixed(1)}°c`;

    fetch(`${api.base}onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&APPID=${api.key}`)
    .then(weather2 => {
       return weather2.json();
    }).then(displayResults2)
   /* let date = document.querySelector('.date');
    let temperature = document.querySelector('.temperature');
    let weather = document.querySelector('.weather');
    let hiLow = document.querySelector('.hi-low');*/
}




function dateBuilder(currentDate){
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    let days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];

    let day = days[currentDate.getDay()];
    let date = currentDate.getDate();
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();

    return `${day}, ${date}, ${month}, ${year}`;

};





/////////////////////Функция Дождя//////////////////////////
const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const defaultDropNum = 100;


function makeItSnow (num) {

	let elements = document.getElementById("drops-section");

	while (elements.hasChildNodes()) {
		elements.removeChild(elements.lastChild);
	}


	for (let i = 0 ; i < num ; i ++) {
		let randomX = Math.floor(Math.random() * (pageWidth));
		let randomY = Math.floor(Math.random() * (pageHeight));
		let dropSpeed = Math.floor(Math.random() * (1)) + 2;
		let dropWidth = Math.floor(Math.random() * (dropSpeed + 7));
		let dropHeight = dropWidth;
		let d = new DropSnow(randomX, randomY, dropSpeed, dropWidth, dropHeight);

		d.showSnow();
		d.fallSnow();

	}

}

function makeItRain (num) {

	let elements = document.getElementById("drops-section");

	while (elements.hasChildNodes()) {
		elements.removeChild(elements.lastChild);
	}


	for (let i = 0 ; i < num ; i ++) {
		let randomX = Math.floor(Math.random() * (pageWidth));
		let randomY = Math.floor(Math.random() * (pageHeight));
		let dropSpeed = Math.floor(Math.random() * (25-5)) + 2;
		let dropWidth = Math.floor(Math.random() * (dropSpeed/10 - 1)) + 1;
		let dropHeight = Math.floor(Math.random() * (dropSpeed*2 - 3)) + 3;
		let d = new DropRain(randomX, randomY, dropSpeed, dropWidth, dropHeight);

		d.showRain();
		d.fallRain();

	}

}


/*
function updateNumberInView (num) {
	let el = document.getElementById("dropsNum").firstChild;
	el.nodeValue = num;
}*/

/*
function changeNumDrops (num) {
	updateNumberInView(num);
	makeItRain(num);
}*/



class DropSnow {
	constructor(xPosition, yPosition, dropSpeed, dropWidth, dropHeight) {
		this.xPosition = xPosition;
		this.yPosition = yPosition;
		this.dropSpeed = dropSpeed;
		this.dropWidth = dropWidth;
		this.dropHeight = dropHeight;
		this.element;
	}

	showSnow() {
		this.element = document.createElement("div");
		this.element.className = "snowDrop";
		this.element.style.top = this.yPosition + "px";
		this.element.style.left = this.xPosition + "px";
		this.element.style.width = this.dropWidth + "px";
		this.element.style.height = this.dropHeight + "px";

		let el = document.getElementById("drops-section");
        el.appendChild(this.element);
        
    }
    clearSnow(){
        console.log("Убрать элемент");
       // this.element = document.remove();
    }

	fallSnow() {
        
        const makeItSnow = () => {

            this.xPosition = this.xPosition + 3;// + Math.random()*(10-0);
            this.element.style.left = this.xPosition + "px";
            this.yPosition = this.yPosition + this.dropSpeed;
            this.element.style.top = this.yPosition + "px";



            if (this.yPosition < window.innerHeight) {
                requestAnimationFrame(makeItSnow);
            } else {
                this.yPosition = -10;
                requestAnimationFrame(makeItSnow);
            }
            if (this.xPosition > window.innerWidth+20) {
                //  this.clearSnow();
                //this.element.parentNode.removeChild(this.element); //вроде удалил
                //this.element.parentNode.removeChild(this.element); //вроде удалил
                this.xPosition = -20;//Math.random()*(10-0);
                this.element.style.left = this.xPosition + "px";
                /*this.element.remove();
                let proverkaItemSnow = this.element.querySelector('.snowDrop');
                
                    if (proverkaItemSnow == null) {
                        console.log("Выполнить функцию переноса снежинки");
                         
                    }
                    else {
                        
                    }*/
                

                //document.removeChild(this.element); 
            
                //  requestAnimationFrame(makeItRain);
                // this.show();
                // this.fall();
                // this.element = document.removeChild;
                // console.log(this);

                // this.show();
                //show();
            }

        }

		requestAnimationFrame(makeItSnow);
    }
    
}



class DropRain {
	constructor(xPosition, yPosition, dropSpeed, dropWidth, dropHeight) {
		this.xPosition = xPosition;
		this.yPosition = yPosition;
		this.dropSpeed = dropSpeed;
		this.dropWidth = dropWidth;
		this.dropHeight = dropHeight;
		this.element;
	}

	showRain() {
		this.element = document.createElement("div");
		this.element.className += "rainDrop";
		this.element.style.top = this.yPosition + "px";
		this.element.style.left = this.xPosition + "px";
		this.element.style.width = this.dropWidth + "px";
		this.element.style.height = this.dropHeight + "px";

		let el = document.getElementById("drops-section");
        el.appendChild(this.element);
        
    }
    clearRain(){
        console.log("Убрать элемент");
       // this.element = document.remove();
    }

	fallRain() {
		const makeItRain = () => {
            
               // this.xPosition = this.xPosition + Math.random()*(10-0);
               // this.element.style.left = this.xPosition + "px";
			    this.yPosition = this.yPosition + this.dropSpeed;
		    	this.element.style.top = this.yPosition +"px";
            
            

			if(this.yPosition < window.innerHeight) {
				requestAnimationFrame(makeItRain);
			} else {
				this.yPosition = -10;
				requestAnimationFrame(makeItRain);
            }
            if (this.xPosition > window.innerWidth){
              //  this.clearSnow();
                
              //  requestAnimationFrame(makeItRain);
		       // this.show();
		       // this.fall();
               // this.element = document.removeChild;
               // console.log(this);

               // this.show();
                //show();
            }

		}

		requestAnimationFrame(makeItRain);
    }
    
}
//gridTest.parentNode.removeChild(gridTest); // удаление работает


var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 15,
    grabCursor: true,
    freeMode: false,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,
    breakpoints: {
        700: {
          slidesPerGroup: 2
        }
    },
   /* pagination: {
        el: '.swiper-pagination',
        clickable: true
    },*/
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
   /* loop: true,
    loopFillGroupWithBlank: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        }
    }
    */
    
  })






////////////////////////Тестовые функции//////////////////////////

let testElement = document.createElement("div");
container.appendChild(testElement);
testElement.className = "grid-test";

testElement.remove();
let result = document.querySelector('.grid-test');
console.log(result);
if (result !== null){
    console.log("testElement существует");
}
else{
    console.log("testElement не существует");
}
//gridTest.remove();
//console.log(gridTest);
//if (!gridTest){
 //   console.log("grid не существует")
//}


//updateNumberInView(defaultDropNum);
