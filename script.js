
function  updatetime() {
    let time = document.getElementById("time");
    const now = new Date();
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    time.textContent = now.toLocaleTimeString('en-US', options);
    
}
function updatedate(){
    const now = new Date();
    let date = document.getElementById("date");
date.textContent = now.toLocaleDateString() ;
}
updatedate();
setInterval(updatetime,1000);
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
] ;
 
let cities = document.getElementById("cities");
let btn = document.querySelector(".btn");
btn.onclick = function() {
    cities.style.visibility = "visible";
    cities.style.opacity ="1";
}
   for(let i=0 ; i< Wilaya.length ; i++){
     cities.innerHTML += `<li onclick="getid(this.textContent)">${Wilaya[i]}</li>`
   }

   function getsalattime(id){
    
    axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${id}&country=Algeria&method=19`)
   .then(function (salattime) {
      document.getElementById("asr").innerHTML = `${salattime.data.data.timings.Asr}` ;
      document.getElementById("fajr").innerHTML = `${salattime.data.data.timings.Fajr}` ;
      document.getElementById("dohr").innerHTML = `${salattime.data.data.timings.Dhuhr}` ;
      document.getElementById("maghreb").innerHTML = `${salattime.data.data.timings.Maghrib}` ;
      document.getElementById("isha").innerHTML = `${salattime.data.data.timings.Isha}` ;
  })
  .catch(function (error) {
    console.log(error);
  })
   }
   
   function getid(el){
    document.getElementById("asr").innerHTML = ""
    document.getElementById("fajr").innerHTML = ""
    document.getElementById("dohr").innerHTML = ""
    document.getElementById("maghreb").innerHTML =""
    document.getElementById("isha").innerHTML = ""
    setTimeout(() => {
        
     getsalattime(el);
    },500)
    document.getElementById("city").innerHTML = `${el}`;
     cities.style.visibility = "hidden";
    cities.style.opacity ="0";
    
   }
   getid("Algiers");
   
