/*LOOP*/ 
var time = new Date();
var deltaTime = 0;

if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init,1)
}else{
    document.addEventListener("DOMContentLoaded", Init);
}

function Init() {
    time = new Date();
    Start();
    Loop();
}

function Loop(){
    deltaTime = (new Date() - time) / 1000;
    time = newDate();
    PaymentRequestUpdateEvent()
    requestAnimationFrame(Loop);
};

/*GAME*/

var sueloY=22;
var velY=0;
var impulso=900;
var gravedad=2500;

var dinoPosX = 42;
var dinoPosY= sueloY;

var sueloX= 0;
var velEscenario= 1280/3;
var gameVel = 1;
var score= 0;

var parado = false;
var saltando = false;

var tiempoHastaObstaculo= 2;
var tiempoObstaculoMin= 0.7;
var tiempoobstaculoMax= 1.8;
var osbtaculoPosY=16 ;
var obstaculos = [];

var contenedor;
var dino;
var textoScore;
var suelo ;
var gameOver;

    function Start(){
        gameOver= document.querySelector(".game-over");
        suelo = document.querySelector(".suelo");
        contenedor = document.querySelector(".contenedor");
        textoScore = document.querySelector(".score");
        dino = document.querySelector(".dino")
        document.addEventListener("keydown", HandleKeyDown);
    }

    function HandleKeyDown(){
        if (ev.KEYcODE == 32){
            saltar();
        }
    }

    function saltar(){
        if(dinoPosY === sueloY){
            saltando = true;
            velY = inpulso;
            dino.classList.remove("dino-corriendo");
        }
    }

   function Update(){

        if(parado) return;


        MoverDinosaurio();
        MoverSuelo();
        DecidirCrearObstaculos();
        DetectarColision();


        velY -= gravedad * deltaTime;

   }

   function MoverSuelo(){
     sueloX += CalcularDesplazamiento();
     suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
   }

   function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
   }

   function MoverDinosaurio(){
    dinoPosY += velY * deltaTime;
    if(dinoPosY < sueloY){
        TocarSuelo();
    }
    dino.style.bottom = dinoPosY + "px"; 
   }

   function TocarSuelo (){
    dinoPosY = sueloY;
    velY= 0;
    if(saltando){
        dino.classList.add("dino-corriendo");
    }
    saltando = false;
   };

   function DecidirCrearObstaculos(){
        tiempoHastaObstaculo -= deltaTime;
        if(tiempoHastaObstaculo <= 0){
            CrearObstaculos();
        }
   }

   function CrearObstaculos(){
        var obstaculo =document.createElement("div");
        contenedor.appendChild(obstaculo);
        obstaculo.classList.add("cactus");
        obstaculo.posX = contenedor.clientWidth;
        obstaculo.style.left = contenedor.clientWidth+"px";

        obstaculo.push(obstaculo);
        tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoobstaculoMax-tiempoObstaculoMin) /gameVel;
   }

   function MoverObstaculo(){
    for(var 1 = obstaculos.length - 1; i >= 0; i--) {
        if(obstaculos[i].posX < -obstaculos[i].clientWidth){
            obstaculos[i].parentMode.removeChild{obstaculos[i]};
            obstaculos.splice(i, 1);
            GanarPuntos();
        }else{
            obstaculos[i] .posx -= CalcularDesplazamiento();
            obstaculos[i].style.left = obstaculos[i].posX+"px";
     }
    }
   }

   function GanarPuntos(){
        score++;
        textoScore.innerText = score;
 }

    function DetectarColision(){
        for(var i = 0; i < obstaculos.length; i++){
            if(obstaculos[i].posX > dinoPosX + dino.clientWidth){
                //evade
                break;
            }else{
                if(IsCollision()){
                    GameOver();
                }
            }
        }
    }

    function IsCollision (a, b, paddingRight, paddingBotton, paddingLeft){
        
        var aRect = a.getBoundingClientRect();
        var bRect = b.getBoundingClientRect();

        return !(
            ((aRect.top + aRect.height - paddingBotton) < (bRect.top))||
            (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
            ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
            (aRect.left + paddingLeft > (bRect + bRect.width))
        );
    };

    function GameOver() {
        Estrellarse();
        gameOver.style.display = "block";
    }

    function Estrellarse(){
        dino.classList.remove("dino-corriendo");
        dino.classList.add("dino-corriendo")
        parado = true;
    }

