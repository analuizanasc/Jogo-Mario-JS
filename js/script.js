const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');


//audios do jogo:
const audioPerdeu = new Audio();
audioPerdeu.src = './sounds/smw_game_over.wav'

const audioPula = new Audio();
audioPula.src = './sounds/smw_jump.wav'

const audioFundo = new Audio();
audioFundo.src = './sounds/sm_background music.mp3' 


// configurar pulo:
const jump = () => {
    mario.classList.add('jump'); //Add classe jump, pois é assim que ele vai pular - config da classe no css 
    audioPula.play();
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500); //espera um tempo e depois executa uma funçao - tempo 500 definido na animaçao do jump no css
}

//Quando qualquer tecla for pressionada, será chamada a função jump:
document.addEventListener('keydown', jump); 

//chamar funcao jump ao clicar na tela:
body = document.querySelector("body")
body.addEventListener("click", jump)

/*Para acabar o jogo, deve-se definir em um periodo de tempo  o que deve acontecer - setIternal(funcao, tempo) 
 */
const loop = setInterval(() => {

    //pegar distancias dos elementos na animaçao
    const pipePosition = pipe.offsetLeft; //pegar a posição offset 
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px',''); // não tem forma mias simples de pegar altura do mario durante o pulo - não existe offsetBottom. (deveria existir! kkkk) O replace é para retirar o px do retorno e o + para converter a srting em um número
    const cloudsPosition = clouds.offsetLeft;

    //coloca musica:
    audioFundo.play(); 

    //condicao para acabar o jogo:
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // pausando audio do backgorund:
        audioFundo.pause()
        
        // colocar audio de quando perde:
        audioPerdeu.play()

        //aparecer tela de game over:
        document.querySelector(".tela-game-over").style.display = "block"

        // tempo na tela de game over: 
        document.querySelector(".recorde-segundos").innerHTML = seg
        document.querySelector(".recorde-minutos").innerHTML =  min 

        // parar animaçao do pipe:
        pipe.style.animation = 'none' //volta para a imagem inicial)
        pipe.style.left = `${pipePosition}px`; //está definindo o estilo da classe pipe - left = a posicao que foi pega na animacao

        //parar animacao do mario:
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        //parar animacao das clouds:
        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        // trocar imagem do mario:
        mario.src= './images/game-over.png' // definindo a imagem
        mario.style.width = '75px' // diminuindo a imagem
        mario.style.marginLeft = '50px' // retirando a "borda" de espaço que a imagem tem

        //habilitar click para botao recomecar: 
        buttonRecomecar = document.querySelector("button")//botao da tela gameOver
        buttonRecomecar.addEventListener("click", recomecar)

        //ao pressionar enter , recomeça o jogo
        document.addEventListener("keypress", function(event){
            if (event.key === "Enter") { 
                buttonRecomecar.click();
            }
        })


        function recomecar() {
            location. reload();//recarregar site
        }

         // apesar de aparentar aparado, ainda  continua rodando o loop, então é preciso pará-lo. então:
        clearInterval(loop)
    }
}, 10)


//timer: 
var min = 0;
var seg = 0;


// setInterval chama uma funçao especifica em um tempo determinado. No caso, 1000ms = 1s. Ele continua em looping até que se chame clearInterval()

//determinar o timer... A cada segundo :
const relogio = setInterval(timer,1000)

function timer() {
    seg ++ //incrementa segundo
    min = +min + 0//converte os minutos para inteiro

    //tornar padrao os segundos 00:
    if (seg < 10) {
        seg = "0" + seg
    }

    //quando fechar 60 seg, zera os segundos e incrementa os mins:
    if (seg > 60) {
        seg = 0;
        m++
    }

    //tornar padrao os min 00:
    if (min < 10){ 
        min = "0" + min
    }

    //colocar seg e min da tela
    document.querySelector(".segundo").innerHTML = seg;
    document.querySelector(".minutos").innerHTML = min;

    clearInterval(relogio)

}




