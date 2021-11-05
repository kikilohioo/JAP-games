let itemsahorcado = ["Buscando a Nemo", "Hipnotico", "Shrek", "Juego de gemelas", "Harry Potter", "Spiderman", "Advengers","Hitman","Halloween","Rapido y Furioso"];
let containerpalabra = document.getElementById("palabra-ahorcado");
let filmtoarray = Array.from(itemsahorcado[Math.floor(Math.random() * 9)].toLowerCase());

document.addEventListener('DOMContentLoaded', function(e){
    for(let i = 0; i < filmtoarray.length ; i++){
        if(filmtoarray[i] != " "){
            containerpalabra.innerHTML += 
            `<input type="password" name="char" class="inpchar" id="char${i}" value="${filmtoarray[i]}">`;
        }else{
            containerpalabra.innerHTML += `<br><br>`
        }
    }
});

let inputmatch = document.getElementById("chartomatch");

inputmatch.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btnmatch").click();
  }
});

function comprobarLetra(){
    let chartomatch = document.getElementById("chartomatch").value.toLowerCase();
    let failcontainer = document.getElementById("fail-container");
    let inputschars = document.getElementsByClassName("inpchar");
    let imgahorcado = document.getElementById("imgahorcado").dataset.ahorcadoImg;
    let inputscharsshowed = 0;

    if(chartomatch != ""){
        if(filmtoarray.indexOf(chartomatch) != -1){
            for(let charinput of inputschars){
                if(chartomatch == charinput.value){
                    charinput.type = "text";
                    inputmatch.value = "";
                }
            }
            for(let input of inputschars){
                if(input.type == "text"){
                    inputscharsshowed++;
                }
            }
            if(inputschars.length == inputscharsshowed){
                document.getElementById("btnmatch").disabled = true;
                inputmatch.disabled = true;
                for(let charinput of inputschars){
                    charinput.style.backgroundColor = "rgb(153, 233, 151)";
                }
                document.getElementById("alert-container").innerHTML =
                `<div class="alert alert-success d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                    ¡Felicitaciones has ganado la partida!
                    </div>
                </div>
                <button class="btn btn-success" onclick="location.reload()">Jugar Otra Partida</button>`;
            }
        }else{
            failcontainer.innerHTML += `<span class="mx-2">${chartomatch}</span>`
            imgahorcado++;
            document.getElementById("img-container").innerHTML =
            `<img src="media/ahorcado/img${imgahorcado}.jpg" data-ahorcado-img="${imgahorcado}" id="imgahorcado" width="150" alt="ahorcado1">`;
            if(imgahorcado == 6){
                document.getElementById("btnmatch").disabled = true;
                inputmatch.disabled = true;
                for(let charinput of inputschars){
                    charinput.type = "text";
                    charinput.style.backgroundColor = "rgb(255, 153, 153)";
                }
                document.getElementById("alert-container").innerHTML =
                `<div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                    Fin del Juego, te colgaste!
                    </div>
                </div>
                <button class="btn btn-success" onclick="location.reload()">Volver a Intentarlo</button>`;
            }
        }
    }else{
        document.getElementById("alert-container").innerHTML =
        `<div class="alert alert-warning d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
            Primero debes ingresar un caracter
            </div>
        </div>`;
        setTimeout(function(){
            document.getElementById("alert-container").innerHTML = ``;
        },3000);
    }
}