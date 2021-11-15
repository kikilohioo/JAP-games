document.addEventListener("DOMContentLoaded", function(e){
    let opciones = ["roca","papel","tijera"];
    document.getElementById(opciones[Math.floor(Math.random()*3)]).style.display = "block";
});

function backCountAndFlip(){
    let cardtext = document.getElementById("card-text");
    let card = document.getElementById("card-js");

    cardtext.innerHTML = "3";
    setTimeout(function(){
        cardtext.innerHTML = "2";
        setTimeout(function(){
            cardtext.innerHTML = "1";
            setTimeout(function(){
                card.classList.add("flip-card-js-inner");
            },1000);
        },1000);
    },1000);
    
}