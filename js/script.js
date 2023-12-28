const sonic = document.querySelector('.sonic');
const spikes = document.querySelector('.spikes');
const count = document.querySelector('.count'); 

let score = 0;
let collisionDetected = false;

const jump = () => {
  if (!collisionDetected) {
    sonic.classList.add('jump');
    sonic.src = './images/sonic-jump.gif';
    sonic.style.width = '150px';

    setTimeout(() => {
      sonic.classList.remove('jump');
      sonic.src = './images/sonic-run.gif';
      sonic.style.width = '100px';
    }, 500);
  } else {
    // Reseta o jogo depois de bater ao clicar em uma tecla
    resetGame();
  }
};

const loop = setInterval(() => {
  const spikesPosition = spikes.offsetLeft;
  const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px', ''); 
  
  if (spikesPosition <= 120 && spikesPosition > 0 && sonicPosition < 80) {
    if (!collisionDetected) {
      collisionDetected = true;
          // Para a animação do spike quando bater nele
      spikes.style.animation = 'none';
      spikes.style.left = `${spikesPosition}px`;

      // Trava animação do sonic quando bater no cano 
      sonic.style.animation = 'none';
      sonic.style.bottom = `${sonicPosition}px`;

      // Muda a imagem do sonic caso bata no cano 
      sonic.src = './images/sonic-dead.webp';
      sonic.style.width = '120px';
      sonic.style.marginLeft = '25px';
    } 
  } else {
      // Adiciona ao contador enquanto nao bater no spike
      if (!collisionDetected) {
        score++;
        count.textContent = `Pontuação: ${score}`;
      }
    }
  } ,10);

function resetGame() {
  setTimeout(() => {
    window.location.reload();
  }, 100);
} 

document.addEventListener("keydown", jump);