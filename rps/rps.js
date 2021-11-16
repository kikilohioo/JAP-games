let randomAction;
document.addEventListener("DOMContentLoaded", function (e) {
    let opciones = ["roca", "papel", "tijera"];
    randomAction = opciones[Math.floor(Math.random() * 3)];
    document.getElementById(randomAction).style.display = "block";

    if (window.localStorage.getItem("puntuaciones") != undefined) {
        let puntuaciones = JSON.parse(window.localStorage.getItem("puntuaciones"));
        let puntExist = { exist: false, index: 0 };
        for (let puntuacion of puntuaciones) {
            if (puntuacion.user == window.localStorage.getItem("session_init")) {
                puntExist.exist = true;
                puntExist.index = puntuaciones.indexOf(puntuacion);
            }
        }
        if (puntExist) {
            document.getElementById("puntuacion").innerHTML = puntuaciones[puntExist.index].juegos.rps;
        } else {
            document.getElementById("puntuacion").innerHTML = "0";
        }
    }
});

function backCountAndFlip(result) {
    let cardtext = document.getElementById("card-text");
    let card = document.getElementById("card-js");
    let actions = document.getElementsByName("action");

    cardtext.innerHTML = "3";
    setTimeout(function () {
        cardtext.innerHTML = "2";
        setTimeout(function () {
            cardtext.innerHTML = "1";
            setTimeout(function () {
                card.classList.add("flip-card-js-inner");
                if (result == "ganar") {
                    for (let action of actions) {
                        action.disabled = true;
                    }
                    ganar();
                } else if (result == "empate") {
                    for (let action of actions) {
                        action.disabled = true;
                    }
                    document.getElementById("btnjugar").disabled = true;

                    document.getElementById("alert-container").innerHTML =
                        `<div class="alert alert-success fade show" role="alert">
                            <strong>¡Casi!</strong> has empatado.
                        </div>
                        <button class="btn btn-success" onclick="location.reload()">Jugar Otra Partida</button>`;
                } else if (result == "perder") {
                    for (let action of actions) {
                        action.disabled = true;
                    }
                    document.getElementById("btnjugar").disabled = true;
                    document.getElementById("alert-container").innerHTML =
                        `<div class="alert alert-danger fade show" role="alert">
                        <strong>¡Casi!</strong> pero has perdido la partida.
                    </div>
                    <button class="btn btn-danger" onclick="location.reload()">Jugar Otra Partida</button>`;
                }
            }, 1000);
        }, 1000);
    }, 1000);
}

function selectAction() {
    let actions = document.getElementsByName("action");
    for (let action of actions) {
        if (action.checked) {
            action.labels[0].style.border = "2px solid rgb(111, 144, 255)";
        } else {
            action.labels[0].style.border = "none";
        }
    }
}

function ganar() {
    let btnjugar = document.getElementById("btnjugar");
    if (window.localStorage.getItem("puntuaciones") != undefined) {
        let puntuaciones = JSON.parse(window.localStorage.getItem("puntuaciones"));
        let puntExist = false;
        for (let puntuacion of puntuaciones) {
            if (puntuacion.user == window.localStorage.getItem("session_init")) {
                puntExist = true;
                puntuacion.juegos.rps += 1;
                document.getElementById("puntuacion").innerHTML = puntuacion.juegos.rps;
                window.localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones));
            }
        }
        if (puntExist == false) {
            let newPuntuacion =
            {
                user: `${window.localStorage.getItem("session_init")}`,
                juegos: {
                    ahorcado: 0,
                    findnum: 0,
                    rps: 1
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
                        findnum: 0,
                        rps: 1
                    }
                }
            ];
        window.localStorage.setItem("puntuaciones", JSON.stringify(puntuaciones));
    }

    btnjugar.disabled = true;
    document.getElementById("alert-container").innerHTML =
        `<div class="alert alert-success fade show" role="alert">
            <strong>¡Felicitaciones!</strong> has ganado la partida.
        </div>
        <button class="btn btn-success" onclick="location.reload()">Jugar Otra Partida</button>`;
}

function jugarRps() {
    let actions = document.getElementsByName("action");
    let selected = false;
    let selectedOption;
    for (let action of actions) {
        if (action.checked) {
            selectedOption = action.id;
            selected = true;
        }
    }
    if (selected) {
        if ((selectedOption == "inproca" && randomAction == "roca") || (selectedOption == "inppapel" && randomAction == "papel") || (selectedOption == "inptijera" && randomAction == "tijera")) {
            backCountAndFlip("empate");
        } else if ((selectedOption == "inproca" && randomAction == "tijera") || (selectedOption == "inppapel" && randomAction == "roca") || (selectedOption == "inptijera" && randomAction == "papel")) {
            backCountAndFlip("ganar");
        } else if ((selectedOption == "inproca" && randomAction == "papel") || (selectedOption == "inppapel" && randomAction == "tijer") || (selectedOption == "inptijera" && randomAction == "roca")) {
            backCountAndFlip("perder");
        }
    } else {
        document.getElementById("alert-container").innerHTML =
            `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>¡Atención!</strong> primero selecciona una opción.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        setTimeout(function () {
            document.getElementById("alert-container").innerHTML = "";
        }, 3000);
    }
}
