let totalMinutes;
let nexttime;

function updatetime() {
    let time = document.getElementById("time");
    let now = new Date();
    let options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    time.textContent = now.toLocaleTimeString('en-US', options);
    let hours = now.getHours();
    let minutes = now.getMinutes();
    totalMinutes = hours * 60 + minutes;
}
function updatedate() {
    const now = new Date();
    let date = document.getElementById("date");
    date.textContent = now.toLocaleDateString();
}
updatedate();
setInterval(updatetime, 1000);
updatetime();

let Wilaya = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", 
    "Biskra", "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", 
    "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", 
    "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", 
    "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", 
    "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", 
    "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", 
    "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", 
    "Relizane"
];

let cities = document.getElementById("cities");
let btn = document.querySelector(".btn");
btn.onclick = function () {
    cities.style.visibility = "visible";
    cities.style.opacity = "1";
}
for (let i = 0; i < Wilaya.length; i++) {
    cities.innerHTML += `<li onclick="getid(this.textContent)">${Wilaya[i]}</li>`;
}

function getsalattime(id) {
    axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${id}&country=Algeria&method=19`)

        .then(function (salattime) {
            let time = salattime.data.data.timings;
            document.getElementById("asr").innerHTML = `${time.Asr}`;
            document.getElementById("fajr").innerHTML = `${time.Fajr}`;
            document.getElementById("dohr").innerHTML = `${time.Dhuhr}`;
            document.getElementById("maghreb").innerHTML = `${time.Maghrib}`;
            document.getElementById("isha").innerHTML = `${time.Isha}`;

            let fajr = time.Fajr;
            let asr = time.Asr;
            let dohr = time.Dhuhr;
            let maghreb = time.Maghrib;
            let isha = time.Isha;
            let box = [fajr, dohr, asr, maghreb, isha];

            for (let i = 0; i < (box.length - 1); i++) {
                if (timeminute(box[i]) < totalMinutes) {
                    nexttime = box[i + 1];
                }
                if (timeminute(box[box.length - 1]) < totalMinutes || totalMinutes < timeminute(box[0])) {
                    nexttime = box[0];
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getid(el) {
    document.getElementById("asr").innerHTML = "";
    document.getElementById("fajr").innerHTML = "";
    document.getElementById("dohr").innerHTML = "";
    document.getElementById("maghreb").innerHTML = "";
    document.getElementById("isha").innerHTML = "";
    setTimeout(() => {
        getsalattime(el);
    }, 500);
    document.getElementById("city").innerHTML = `${el}`;
    cities.style.visibility = "hidden";
    cities.style.opacity = "0";
}

getid("Algiers");

setInterval(() => {
    
    document.getElementById("next").innerHTML = calcu(totalMinutes, timeminute(nexttime));
}, 1000);

function calcu(timenow, timenext) {
    console.log(timenow)
    let resttime = (1440 - timenow + timenext) % 1440;
    let hour = Math.floor(resttime / 60);
    let minute = resttime % 60;
    return `Next Pray in ${hour} hours and ${minute} minutes`
   
    }

function timeminute(salat) {
    let parts = salat.split(':');
    return Number(parts[0] * 60) + Number(parts[1]);
}
console.log(calcu(780,970))

