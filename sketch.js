//variáveis da bolinha
let xBolinha;
let yBolinha;
let diametro = 20;
let raio = diametro / 2;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

function setup() {
  createCanvas(600, 400);
  xBolinha = width / 2;
  yBolinha = height / 2;
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
  // limitando movimento da raquete dentro dos limites do canvas
  yRaquete = constrain(yRaquete, 0, height - raqueteAltura);
}

function verificaColisaoRaquete(x, y) {
  if (xBolinha - raio < x + raqueteComprimento &&
    xBolinha + raio > x &&
    yBolinha - raio < y + raqueteAltura &&
    yBolinha + raio > y) {
    velocidadeXBolinha *= -1;
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function incluiPlacar() {
  // Desenho do placar
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(meusPontos, 170, 26);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > width) {
    meusPontos++;
    reset();
  } else if (xBolinha < 0) {
    pontosDoOponente++;
    reset();
  }
}

function reset() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  velocidadeXBolinha *= Math.random() < 0.5 ? -1 : 1;
  velocidadeYBolinha = 6;
}
