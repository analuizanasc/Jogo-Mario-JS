const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameBoard = document.querySelector('.game-board')



const jump = () => {
    mario.classList.add('jump'); //Add classe jump, pois é assim que ele vai pular - config da classe no css 
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500); //espera um tempo e depois executa uma funçao - tempo 500 definido na animaçao do jump no css
}

document.addEventListener('keydown', jump); /* Quando qualquer tecla for pressionada, será chamada a função jump*/

/*Para acabar o jogo, deve-se definir em um periodo de tempo  o que deve acontecer - setIternal(funcao, tempo) 
 */
const loop = setInterval(() => {

    //pegar distancias dos elementos na animaçao
    const pipePosition = pipe.offsetLeft; //pegar a posição offset 
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px',''); // não tem forma mias simples de pegar altura do mario durante o pulo - não existe offsetBottom. (deveria existir! kkkk) O replace é para retirar o px do retorno e o + para converter a srting em um número
    const cloudsPosition = clouds.offsetLeft;

    //condicao para acabar o jogo:
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
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

         // apesar de aparentar aparado, ainda  continua rodando o loop, então é preciso pará-lo. então:
        clearInterval(loop)
    }
}, 10)