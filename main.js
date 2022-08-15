const input = document.querySelector("input");
const button = document.querySelector("button");

const place = document.querySelector("#place");
const degress = document.querySelector("#degress");
const wind = document.querySelector("#wind");   
const image = document.querySelector(".Clima");
const content = document.querySelector(".content");

button.addEventListener("click", () => {
    if (!input.value) return;

    getDataApi();
});

async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}
    &units=metric&appid=ddcdc8d8e7263b51028ba3bae0ea5dd5&lang=pt_br`;

    try {
        await fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data?.cod && data.cod === "404") {
                return alert("Local não encontrado");
            }

            loadData(data);
        });
    } catch(e) {
        alert(e)
    }
}

function loadData(data) {
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    degress.innerHTML = `Temperatura:, ${Math.floor(data.main.temp)}° C`;
    image.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
    content.style.display = 'flex';
}