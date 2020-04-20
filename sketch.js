//Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro/2;

//Variaveis da velocidade
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 70; 

//variaveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;

//variaveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false; // Relacionado ao codigo do Git

//placar do jogo 
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo 
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

// Inicio do jogo 
function setup() {
  createCanvas(600, 400);
  //line(300, 0, 0, 400, 300, 0);
  //trilha.loop();
}

function draw() {
  background("DarkBlue"); //Cor da mesa do jogo
  mostraBolinha();
  movimentaBolinha();  
  verificaColisaoBorda();  
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  moverRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
}
function mostraBolinha() {
  stroke(0);
  fill(255); //Cor bolinha
  circle(xBolinha, yBolinha, diametro);
  
}
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function verificaColisaoBorda(){
  /**
  * width é a borda da tela na direita
  * O numero 0 é a borda da tela na esquerda o X
  */
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  /**
  *height é a borda debaixo da tela
  *O numero 0 é a borda de cima a Y 
  */
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x , y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
  fill(139,0,0);
}

function moverRaquete() {
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 5;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 5;
  }
}
function verificaColisaoRaquete(x, y){
  if(xBolinha - raio  < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function verificaColisaoRaquete(x, y) {
  colidiu =
  collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 90;
  yRaqueteOponente += velocidadeYOponente
}
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(18);
 
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170 , 26);
  
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470 , 26);
}

function marcaPonto() {
  if(xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10) {
    pontosOponente += 1; 
    ponto.play(); //Som bolinha
  }
}
