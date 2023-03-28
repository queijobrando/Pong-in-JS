//variáveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2 ;

//velocidade bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//variáveis oponente
let xOponente = 585;
let yOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("sounds/trilha.mp3");
  ponto = loadSound("sounds/ponto.mp3")
  raquetada = loadSound("sounds/raquetada.mp3")
}

// Função Setup
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

// Função draw dos elementos
function draw() {
  background(0);
  mostraBolinha ();
  movimentaBolinha ();
  verificaColisaoBorda ();
  raquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  colisaoMinhaRaqueteBiblioteca (xRaquete, yRaquete);
  raquete(xOponente, yOponente);
  movimentaRaqueteOponente();
  calculaChanceDeErrar();
  colisaoMinhaRaqueteBiblioteca (xOponente, yOponente);
  incluiPlacar();
  marcaPonto();
  
}

// Função da bolinha
function mostraBolinha() {
  circle(xBolinha,yBolinha,diametro);
}

// Função que movimenta a bolinha
function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

// Função que verifica a colisao da bolinha na borda
function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0 ){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0)
    velocidadeYBolinha *= -1;
}

// Função da minha Raquete
function raquete(x,y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

// Função de Movimento da minha Raquete
function movimentaMinhaRaquete () {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}


function colisaoMinhaRaqueteBiblioteca (x, y) {
  colidiu =
    collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}



function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yOponente - comprimentoRaquete /2 -30;
  yOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}



