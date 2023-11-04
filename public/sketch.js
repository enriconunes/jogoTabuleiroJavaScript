//Definicao de variaveis globais
let logoImg;
let imagemDadoUm;
let imagemDadoDois;
let imagemDadoTres;
let imagemDadoQuatro;
let imagemDadoCinco;
let imagemDadoSeis;
let imagemDadoGirar;
let retornoGirardado;
let definicoesImg;
let casa = [];
let jogador = [];
let coresJogadores = [];
let turnoJogador = 1;
let desafioAberto = false;
let ativarDadoDesafio;
let dueloAberto = false;
let ativarDadoDuelo;
let jogadorCasaOcupada;
let jogadorDesafiador;
let valoresDadoDuelo = [];
let qtdGirosDado = 0;
let paginaAtual = 0;
let respostaServidorUser;
let idUserLogin;
let nomeUserLogin;
let idSalaAtual;
let qtdJogadores;
let dadosCarregados = false;
let numeroJogadorLogado;
let jogoTerminou = false;
let listaRanking = []

function preload() {

  //Upload de imagens
  logoImg = loadImage("./imagens/logo.png")
  imagemDadoUm = loadImage("./imagens/dado1.png")
  imagemDadoDois = loadImage("./imagens/dado2.png")
  imagemDadoTres = loadImage("./imagens/dado3.png")
  imagemDadoQuatro = loadImage("./imagens/dado4.png")
  imagemDadoCinco = loadImage("./imagens/dado5.png")
  imagemDadoSeis = loadImage("./imagens/dado6.png")
  imagemDadoGirar = loadImage("./imagens/dadoGirar.png")
  definicoesImg = loadImage("./imagens/definicoes.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Instanciar objetos
  instanciarObjetos()

  //Configuracoes das casas do tabuleiro
  configurarCasas()
}

function draw() {

  cursor(ARROW)
  background("#5858e0");

  //Desenhar Borda
  createScreenBorder();

  //Gerir a exibição de paginas
  if (paginaAtual == 0) {
    exibirPaginaZero()
  }
  else if (paginaAtual == 1) {
    exibirPaginaUm()
  }
  else if (paginaAtual == 2) {
    exibirPaginaDois()
  }
  else if (paginaAtual == 3) {
    exibirPaginaTres()
  }

  logo.desenhar_logo(tabuleiro);
}

function mousePressed() {

  //Acoes do dado
  dadoPress()

  //Acoes paginas iniciais
  //Botao criar conta
  botaoCriarContaPress()

  //Botao entrar na conta
  botaoEntrarContaPress()

  //Botao criar sala
  botaoCriarSalaPress()

  //Botao entrar sala
  botaoEntrarSalaPress()

  //Botao retomar sala
  botaoRetomarSalaPress()

  //Botao iniciar partida
  botaoEntrarPartidaPress()

  //Botao voltar
  botaoVoltarPress()

  //Botao voltar ao inicio
  botaoVoltarInicioPress()

}