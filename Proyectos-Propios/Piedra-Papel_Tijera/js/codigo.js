/* function aleatorio(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function mensajeEleccion(jugada) {
    if (jugada == 1) { 
        return "Piedra 🪨";
    } 
    if (jugada == 2) { 
        return "Papel 📃";
    } 
    if (jugada == 3) { 
        return "Tijera ✂️";
    } 

    return "MAL ELEGIDO";
}
function combate(jugador, pc){
    if (pc == jugador) { 
        alert("EMPATE");
        return 0;
    }
    if ((jugador == 1 && pc == 3) || (jugador == 2 && pc == 1) || (jugador == 3 && pc == 2)) {
        alert("GANASTE");
        return 10;
    }
    
    alert("PERDISTE");
    return 1;
}

function iniciarJuego(){
    let jugador = 0;
    let pc = 0;
    let triunfos = 0;
    let ronda = 1;

    while ((triunfos / 10 < 3) && (triunfos % 10 < 3)) {
        pc = aleatorio(1, 3);
        jugador = prompt("Ingrese: 1=Piedra, 2=Papel o 3=Tijera");

        triunfos += combate(jugador, pc);

        alert(ronda + "ª RONDA\n" + "🙋:- " + mensajeEleccion(jugador) + " -|⚔️|- " + mensajeEleccion(pc) + " -:🤖 \n" + 
        "PUNTUACIÓN\n" + "🙋:- " + Math.floor(triunfos / 10) + " -|👑🏆👑|- " + triunfos % 10 + " -:🤖");

        ronda++;
    }

    if (triunfos / 10 > triunfos % 10){
        alert("¡¡¡ Felicidades !!!");
    }else{
        alert("Lástima, será la próxima.");
    }
} */

//sección para iniciar el juego
const sectionInicio = document.getElementById("inicio");
const botonIniciar = document.getElementById("boton-iniciar");
const inputJugador = document.getElementById("input-jugador");
const inputEnemigo = document.getElementById("input-enemigo");
const inputEsComputadora = document.getElementById("es-computadora");
const inputCantidad = document.getElementById("cantidad");
const inputMayoria = document.getElementById("mayoria");
const inputDiferencia = document.getElementById("diferencia");
const inputRondas = document.getElementById("rondas");
//sección de combate
const sectionCombate = document.getElementById("combate");
const pNombreJugador = document.getElementById("nombre-jugador");
const pNombreEnemigo = document.getElementById("nombre-enemigo");
//sección final
const sectionFin = document.getElementById("fin");

let nombreEnemigo, nombreJugador, objetivoVictoria;
let inicioValido = true;

sectionCombate.style.display = "none";
sectionFin.style.display = "none";

botonIniciar.addEventListener("click", iniciarJuego);
inputEsComputadora.addEventListener("change", esComputadora);

function esComputadora(){
    if(inputEsComputadora.checked == false){
        inputEnemigo.disabled = false;
        inputEnemigo.value = ""
    }else{
        inputEnemigo.disabled = true;
        inputEnemigo.value = "COMPUTADORA";
    }
}

function tipoJuego(){
    if (inputCantidad.checked || inputDiferencia) {
        objetivoVictoria = inputRondas.value;
    }else if (inputMayoria.checked) {
        objetivoVictoria = Math.ceil(inputRondas.value / 2);
    } else{
        inicioValido = false;
        alert("No se ha elegido un tipo de juego.");
    }
}

function iniciarJuego(){
    if(inputJugador.value == ""){
        alert("Ingrese nombre del Jugador 1 para continuar.");
        inicioValido = false;
    }
    if(inputEnemigo.value == "" && !inputEsComputadora.checked){
        alert("Ingrese nombre del Jugador 2 para continuar.");
        inicioValido = false;
    }

    if(inicioValido){
        nombreJugador = inputJugador.value;
        nombreEnemigo = inputEnemigo.value;
        
        pNombreEnemigo.innerHTML = nombreEnemigo;
        pNombreJugador.innerHTML = nombreJugador;

        sectionInicio.style.display = "none";
        sectionCombate.style.display = "flex";
    }
}