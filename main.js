let btn = document.querySelector(".fa-magnifying-glass");
let continer = document.querySelector(".continer");
let imgs = document.querySelector(".imgs");
let main = document.querySelector("main");
let mineTemp = document.querySelector(".mine-temp");
let pr = document.querySelector(".pr");
let km = document.querySelector(".km");
let search = document.querySelector("#search");
let resolte = document.getElementById("resolte");


let APIKey = "5f7582e62964f7faf4f40838ddd79a32";

btn.addEventListener("click",()=> {
    getCity(search.value)
});


function getCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        if (json.cod == "404" || city == "") {
            resolte.innerHTML = `
            <div class="imgs">
                <img src="./images/404.png" id="img">
                <p>Oops! Invalid location :/</p>
            </div>
            `;
        } else {

            switch (json.weather[0].main) {
                case 'Clear':
                    photo = 'images/clear.png';
                    break;

                case 'Rain':
                    photo = 'images/rain.png';
                    break;

                case 'Snow':
                    photo = 'images/snow.png';
                    break;

                case 'Clouds':
                    photo = 'images/cloud.png';
                    break;

                case 'Haze':
                    photo = 'images/mist.png';
                    break;

                default:
                    photo = '';
            }
            resolte.innerHTML = `
                <div class="imgs">
                <img src="${photo}" id="img">
                <p></p>
            </div>
            <main>
                <div class="head">
                    <div class="info">
                        <span class="mine-temp">
                            ${json.main.temp}<sup>c</sup>
                        </span>
                        <span class="disc">${json.weather[0].description}</span>
                    </div>
                </div>
                <div class="foter">
                    <div class="foter-mine">
                        <i class="fa-solid fa-wind"></i>
                        <div class="info">
                            <span class="pr">${json.main.humidity}%</span>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="foter-mine">
                        <i class="fa-solid fa-water"></i>
                        <div class="info">
                            <span class="km">${parseInt(json.wind.speed)}km/h</span>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
        </main>
            `;
        }
    })
}



document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};
