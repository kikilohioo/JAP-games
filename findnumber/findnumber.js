let numberToMatchContainer = document.getElementById("number-to-find");
let numberToMatch = Math.floor(Math.random() * 101);
let trys = 0;

document.addEventListener("DOMContentLoaded", function (e) {
    numberToMatchContainer.innerHTML = numberToMatch;
    if (window.localStorage.getItem("puntuaciones") != undefined) {
        let puntuaciones = JSON.parse(window.localStorage.getItem("puntuaciones"));
        let puntExist = false;
        for (let puntuacion of puntuaciones) {
            if (puntuacion.user == window.localStorage.getItem("session_init")) {
                document.getElementById("puntuacion").innerHTML = puntuacion.juegos.findnum;
            } else {
                document.getElementById("puntuacion").innerHTML = "0";
            }
        }
    }
});

function rotateCard() {
    let card = document.getElementById("card-js");
    card.classList.add("flip-card-js-inner");
}

function tryMatchNumbers() {
    let input = document.getElementById("nummatch");
    let btnTryMatch = document.getElementById("btn-match");

    if (input.value != "") {
        if (input.value == numberToMatch) {
            if (window.localStorage.getItem("puntuaciones") != undefined) {
                let puntuaciones = JSON.parse(window.localStorage.getItem("puntuaciones"));
                let puntExist = false;
                for (let puntuacion of puntuaciones) {
                    if (puntuacion.user == window.localStorage.getItem("session_init")) {
                        puntExist = true;
                        puntuacion.juegos.findnum += 1;
                        document.getElementById("puntuacion").innerHTML = puntuacion.juegos.findnum;
                        window.localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones));
                    }
                }
                if (puntExist == false) {
                    let newPuntuacion =
                    {
                        user: `${window.localStorage.getItem("session_init")}`,
                        juegos: {
                            ahorcado: 0,
                            findnum: 1,
                            rps: 0
                        }
                    };
                    puntuaciones.push(newPuntuacion);
                    window.localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones));
                }
            } else {
                let puntuaciones =
                    [
                        {
                            user: `${window.localStorage.getItem("session_init")}`,
                            juegos: {
                                ahorcado: 0,
                                findnum: 1,
                                rps: 0
                            }
                        }
                    ];
                window.localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones));
            }

            input.disabled = true;
            btnTryMatch.disabled = true;

            rotateCard();
            document.getElementById("alert-container").innerHTML =
                `<div class="alert alert-success fade show" role="alert">
                <strong>¡Felicitaciones!</strong> has adivinado el número.
            </div>
            <button class="btn btn-success" onclick="location.reload()">Jugar Otra Partida</button>`;
        } else if (input.value < numberToMatch) {
            trys++;
            if (trys < 10) {
                document.getElementById("alert-container").innerHTML =
                    `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>¡La Próxima Será!</strong> el número ingresado es más chico que el número a adivinar. Quedan ${10 - trys} intentos.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            } else {
                input.disabled = true;
                btnTryMatch.disabled = true;
                document.getElementById("leyenda").innerHTML = `¡Estuviste cerca!`;
                document.getElementById("alert-container").innerHTML =
                    `<div class="alert alert-danger fade show" role="alert">
                <strong>¡Ohh!</strong> lo sentimos, te has quedado sin intentos.
            </div>
            <button class="btn btn-danger" onclick="location.reload()">Jugar Otra Partida</button>`;
            document.getElementById("card-back").style.backgroundColor = "rgb(223, 109, 105)";
                rotateCard();
            }
        } else if (input.value > numberToMatch) {
            trys++;
            if (trys < 10) {
                document.getElementById("alert-container").innerHTML =
                    `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>¡La Próxima Será!</strong> el número ingresado es más grande que el número a adivinar. Quedan ${10 - trys} intentos.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            } else {
                input.disabled = true;
                btnTryMatch.disabled = true;
                document.getElementById("leyenda").innerHTML = `¡Estuviste cerca!`;
                document.getElementById("alert-container").innerHTML =
                    `<div class="alert alert-danger fade show" role="alert">
                <strong>¡Ohh!</strong> lo sentimos, te has quedado sin intentos.
            </div>
            <button class="btn btn-danger" onclick="location.reload()">Jugar Otra Partida</button>`;
                document.getElementById("card-back").style.backgroundColor = "rgb(223, 109, 105)";
                rotateCard();
            }
        }
    }else{
        document.getElementById("alert-container").innerHTML =
        `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>¡Atención!</strong> primero debes ingresar un número entre 0 y 100.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    }
}
