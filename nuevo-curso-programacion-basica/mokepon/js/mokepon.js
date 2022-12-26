//Código principal
//["Hipodoge","Ratigueya","Capipepo","Langostelvis","Tucapalma","Pydos"];

const sectionMascota = document.getElementById("elegir-mascota");
const sectionVerMapa = document.getElementById("ver-mapa");
const sectionAtaque = document.getElementById("elegir-ataque");
const divContenedorTarjetas = document.getElementById("contenedor-tarjetas");
const buttonMascota = document.getElementById("boton-mascota");
const canvasMapa = document.getElementById("mapa");
const divContenedorAtaques = document.getElementById("contenedor-ataques");
const buttonReiniciar = document.getElementById("boton-reiniciar");
const pResultado = document.getElementById("resultado");
const spanVidaJugador = document.getElementById("vida-jugador");
const spanVidaEnemiga = document.getElementById("vida-enemiga");
const pMascotaJugador = document.getElementById("mascota-jugador");
const pMascotaEnemiga = document.getElementById("mascota-enemiga");
const pAtaqueJugador = document.getElementById("ataque-jugador");
const pAtaqueEnemigo = document.getElementById("ataque-enemigo");
const anchoMaximoMapa = 350;

let inputHipodoge, inputRatigueya, inputCapipepo, buttonFuego, buttonAgua, buttonTierra;
let botones = [], secuenciaAtaquesJugador = [], secuenciaAtaquesEnemigo = [];
let ataquesJugador, ataquesEnemigo, mascotaJugador, mascotaEnemiga, opcionDeMokepones, mascotaJugadorObjeto, alturaDeseada;
let victoriasJugador = 0, victoriasEnemigo = 0;
let vidaJugador = 3, vidaEnemiga = 3;
let lienzo = canvasMapa.getContext("2d");
let mapaBackground = new Image();
let anchoMapa = window.innerWidth - 20;
let intervalo;

if(anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa - 20;
}
alturaDeseada = anchoMapa * 600/800;
canvasMapa.width = anchoMapa;
canvasMapa.height = alturaDeseada;

mapaBackground.src = "./assets/img/mokemap.png";
sectionVerMapa.style.display = "none";
sectionAtaque.style.display = "none";
buttonReiniciar.style.display = "none";

buttonMascota.addEventListener("click", elegirMascotas);
buttonReiniciar.addEventListener("click", reiniciarJuego);

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre;
        this.foto = foto;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = numeroAleatorio(0, canvasMapa.width - this.ancho);
        this.y = numeroAleatorio(0, canvasMapa.height - this.alto);
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    
    pintarMokepon(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    );
    }
}

let mokepones = [];

let hipodoge = new Mokepon("Hipodoge", "./assets/img/mokepon_hipodoge.png", 5, "./assets/img/mapa_hipodoge.png");
let ratigueya = new Mokepon("Ratigueya", "./assets/img/mokepon_ratigueya.png", 5, "./assets/img/mapa_ratigueya.png");
let capipepo = new Mokepon("Capipepo", "./assets/img/mokepon_capipepo.png", 5, "./assets/img/mapa_capipepo.png");
let hipodogeEnemigo = new Mokepon("Hipodoge", "./assets/img/mokepon_hipodoge.png", 5, "./assets/img/mapa_hipodoge.png");
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/img/mokepon_ratigueya.png", 5, "./assets/img/mapa_ratigueya.png");
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/img/mokepon_capipepo.png", 5, "./assets/img/mapa_capipepo.png");

hipodoge.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"}
);

ratigueya.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"}
);

capipepo.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"}
);

hipodogeEnemigo.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"}
);

ratigueyaEnemigo.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"}
);

capipepoEnemigo.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"}
);

mokepones.push(hipodoge, ratigueya, capipepo);

mokepones.forEach((mokepon) =>{
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre} />
            </label>
    `;
    divContenedorTarjetas.innerHTML += opcionDeMokepones;
    
    inputHipodoge = document.getElementById("Hipodoge");
    inputRatigueya = document.getElementById("Ratigueya");
    inputCapipepo = document.getElementById("Capipepo");
});

//Funciones
function elegirMascotas(){
    let num = mascotaElegida();
    mascotaJugador = mokepones[num].nombre;
    pMascotaJugador.innerHTML = mascotaJugador;
    ataquesJugador = mokepones[num].ataques;
    
    iniciarMapa();
    mostrarAtaques(ataquesJugador);
}

function mascotaElegida(){
    sectionMascota.style.display = "none";
    sectionVerMapa.style.display = "flex";
    
    if(inputHipodoge.checked){
        return 0;
    }
    if(inputRatigueya.checked){
        return 1;
    }
    if(inputCapipepo.checked){
        return 2;
    }
    
    sectionVerMapa.style.display = "none";
    sectionMascota.style.display = "flex";
    alert("Debes elegir una mascota para continuar.");
    return -1;
}

function iniciarMapa(){
    canvasMapa.width = 320;
    canvasMapa.height = 240;
    
    mascotaJugadorObjeto = obtenerObjetoMascota();
    intervalo = setInterval(pintarCanvas, 50);
    
    window.addEventListener("keydown", sePresionoUnaTecla);
    window.addEventListener("keyup", detenerMovimiento);
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0,0,canvasMapa.width,canvasMapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,0,
        canvasMapa.width,
        canvasMapa.height
    );
    
    mascotaJugadorObjeto.pintarMokepon();
    
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();
    
    if(mascotaJugadorObjeto.velocidadX != 0 || mascotaJugadorObjeto.velocidadY != 0) {
        revisarColision(hipodogeEnemigo);
        revisarColision(capipepoEnemigo);
        revisarColision(ratigueyaEnemigo);
    }
}

function obtenerObjetoMascota(){
    let objetoMokepon;
    
    mokepones.forEach((mokepon) =>{
        if(mokepon.nombre == mascotaJugador){
            objetoMokepon = mokepon;
        }
    });
    
    return objetoMokepon;
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5;
    pintarCanvas();
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5;
    pintarCanvas();
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5;
    pintarCanvas();
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5;
    pintarCanvas();
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case "ArrowUp":
            moverArriba();
            break;
        case "ArrowLeft":
            moverIzquierda();
            break;
        case "ArrowRight":
            moverDerecha();
            break;
        case "ArrowDown":
            moverAbajo();
            break;
        default:
            break;
    }
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
    pintarCanvas();
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;
    
    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;
    
    if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return;
    }
    
    detenerMovimiento();
    clearInterval(intervalo);
    console.log("colision detectada");
    sectionAtaque.style.display = "flex";
    sectionVerMapa.style.display = "none";
    
    mascotaEnemiga = enemigo.nombre;
    pMascotaEnemiga.innerHTML = mascotaEnemiga;
    ataquesEnemigo = enemigo.ataques;
    sequenciaAtaque();
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
        `;
        divContenedorAtaques.innerHTML += ataquesMokepon;
    });
    
    botones = document.querySelectorAll(".boton-de-ataque");
}

function sequenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e) =>{
            if(e.target.textContent == "🔥") {
                secuenciaAtaquesJugador.push("Fuego");
            }else if(e.target.textContent == "💧") {
                secuenciaAtaquesJugador.push("Agua");
            }else {
                secuenciaAtaquesJugador.push("Tierra");
            }
            
            boton.style.background = "#112f58";
            boton.disabled = true;
            
            ataqueAleatorio();
            
            if(secuenciaAtaquesJugador.length == 5) {
                resultadoCombate();
                pResultado.innerHTML = crearMensajeFinal();
            }
        });
    });
}

function ataque(){
    ataqueJugador = this.innerHTML;
    ataqueEnemigo = ataqueAleatorio();
    crearMensaje();
    if (vidaJugador <= 0){
        crearMensajeFinal("Jugador perdió");
    }
    if (vidaEnemiga <= 0){
        crearMensajeFinal("Jugador ganó");
    }
}

function ataqueAleatorio(){
    let num = numeroAleatorio(0, ataquesEnemigo.length - 1);
    
    if(ataquesEnemigo[num].nombre == "🔥") {
        secuenciaAtaquesEnemigo.push("Fuego");
    }else if(ataquesEnemigo[num].nombre == "💧") {
        secuenciaAtaquesEnemigo.push("Agua");
    }else {
        secuenciaAtaquesEnemigo.push("Tierra");
    }
}

function crearMensaje(ataqueJugador, ataqueEnemigo, ganoJugador, ganoEnemigo){
    pAtaqueJugador.innerHTML += ataqueJugador;
    
    pAtaqueEnemigo.innerHTML += ataqueEnemigo;
    
    if(ganoJugador && ganoEnemigo){
        pAtaqueJugador.innerHTML += "-E-"+`<br>`;
        pAtaqueEnemigo.innerHTML += "-E-"+`<br>`;
    }else if(ganoJugador){
        pAtaqueJugador.innerHTML += "-V-"+`<br>`;
        pAtaqueEnemigo.innerHTML += "-D-"+`<br>`;
    }else {
        pAtaqueJugador.innerHTML += "-D-"+`<br>`;
        pAtaqueEnemigo.innerHTML += "-V-"+`<br>`;
    }
}

function resultadoCombate(){
    for(let i = 0; i < secuenciaAtaquesJugador.length; i++){
        let ataqueJugador = secuenciaAtaquesJugador[i];
        let ataqueEnemigo = secuenciaAtaquesEnemigo[i];
        if (ataqueJugador == ataqueEnemigo){
             crearMensaje(ataqueJugador, ataqueEnemigo, true, true);
        }else if ( (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") || (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") || (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua") ){
            spanVidaJugador.innerHTML = ++victoriasJugador;
            crearMensaje(ataqueJugador, ataqueEnemigo, true, false);
        }else {
            spanVidaEnemiga.innerHTML = ++victoriasEnemigo;
            crearMensaje(ataqueJugador, ataqueEnemigo, false, true);
        }
    }
    
    
}

function crearMensajeFinal(){
    if(victoriasJugador == victoriasEnemigo) {
        return "El combate finalizó en un empate.";
    }else if(victoriasJugador > victoriasEnemigo) {
        return "Felicidades jugador ha ganado.";
    }else {
        return "Perdiste el combate, suerte la próxima.";
    }
    
    buttonReiniciar.style.display = "block";
}

function reiniciarJuego(){
    location.reload();
}

function numeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
