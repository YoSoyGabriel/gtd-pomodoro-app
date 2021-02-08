var MINUTOS = 25;
var SEGUNDOS = 0;


// llamar componentes del DOM 
let display = document.getElementById("display");
let iniciar_btn = document.getElementById("iniciar");
let pausar_btn = document.getElementById("puasar")
let descanzoMode = document.getElementById("restMode");

// mostrar el tiempo por defecto.
display.innerHTML = `${MINUTOS}:${SEGUNDOS}`;

// start los 5 minutos de descanzo 
// load play audio modo descanzo
let audio = new Audio('./audio/restMode.mp3');

// estado del temporizador 
let isTemporizadorRunning = false;

let timer = setInterval(runningCountDown, 10);


// cada 1 segundo llamar esta funcion...
function runningCountDown() {
    if (isTemporizadorRunning) {
        if (SEGUNDOS == 0 & MINUTOS > 0) {
            MINUTOS--;
            SEGUNDOS = 60;
        } else if (MINUTOS + SEGUNDOS == 0) {
            descanzoMode.hidden = false;
            fiveMinutesRest();
            isTemporizadorRunning = false;
        } else {
            SEGUNDOS = SEGUNDOS - 1;
            display.innerHTML = `${MINUTOS}:${SEGUNDOS}`;
        }

    }
}

// inicia el temporizador 
function startRunningTemporizador() {
    isTemporizadorRunning = true;
    iniciar_btn.hidden = true;
    pausar_btn.hidden = false;
}

// pausa el estado del temporizador 
function stopRunningTemporizador() {
    isTemporizadorRunning = false;
    iniciar_btn.hidden = false;
    pausar_btn.hidden = true;
}

// reestablece los valores del temporizador.
function reSetTemporizador() {
    MINUTOS = 25;
    SEGUNDOS = 0;
    display.innerHTML = `${MINUTOS}:${SEGUNDOS}`;
    stopRunningTemporizador();
}


function fiveMinutesRest() {
    let min = 5;
    let sec = 0;

    let timer = setInterval(FiveMinutCountDown, 1000);
    // comenzar con la cuesta regresiva de 5 minutos
    // descanzar por 5 minutos.
    function FiveMinutCountDown() {
        if (min + sec == 0) {
            // quitar la pantalla de descanzo
            restModeHide();
            //pausar el audio de descanzo
            audio.pause();
            //limpiar intervalo timer'
            clearInterval(timer);

        } else if (sec == 0) {
            min--;
            sec = 60;
        }

        sec--;
        document.getElementById("descanzoTime").innerHTML = `${min}:${sec}`;
    }
}

function salirRestMode() {
    restModeHide();
    audio.pause();
    audio.currentTime = 10000;
}