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
let casa = []
let jogador = []
let coresJogadores = []
let turnoJogador;

function setup() {
  createCanvas(windowWidth, windowHeight);

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

  //Instanciar objetos
  logo = new Logo();
  dado = new Dado(imagemDadoSeis);
  botaoConfig = new Botao(70, 60, 40, 40, "#5858e0");
  tabuleiro = new Tabuleiro();
  jogo = new Jogo();

  //Instanciar 46 objetos do tipo Casa
  for (var i = 0; i < 47; i++) {
    var casaTemp = new Casa(tabuleiro.largura, tabuleiro.altura);
    casaTemp.numero = i
    casa.push(casaTemp);
  }

  //Definir a quantidade de jogadores
  jogo.qtdJogadores = 4

  //Instanciar objetos do tipo jogador
  coresJogadores = ["red", "blue", "purple", "black"]
  for (var i = 0; i < jogo.qtdJogadores; i++) {
    var jogadorTemp = new Jogador();
    jogadorTemp.numero = i + 1
    jogadorTemp.cor = coresJogadores[i]
    jogador.push(jogadorTemp);
  }

  //Configuracoes das casas do tabuleiro
  configurarCasas()

  //Definir turnos - variavel global
  turnoJogador = 1;

}

function draw() {
  cursor(ARROW)
  //Cor de Fundo
  background("#5858e0");
  //Borda
  createScreenBorder();

  //Desenhar tabuleiro
  tabuleiro.desenhar_tabuleiro()

  //Desenhar casas do tabeuleiro
  desenharTodasAsCasas()

  //Desenhar jogadores na ordem do ultimo ao primeiro
  for (let n = jogo.qtdJogadores; n > 0; n--) {
    jogador[n - 1].desenhar_jogador(casa[jogador[n - 1].posicao])
  }

  //Se o jogador ja tiver chegado, incrementa um valor e pula vez dele
  if (jogador[turnoJogador - 1].estado == "chegou") {
    turnoJogador += 1
  }

  //Desenhar dado
  switch (retornoGirardado) {
    case (1):
      dado.imagem = imagemDadoUm
      break;
    case (2):
      dado.imagem = imagemDadoDois
      break;
    case (3):
      dado.imagem = imagemDadoTres
      break;
    case (4):
      dado.imagem = imagemDadoQuatro
      break;
    case (5):
      dado.imagem = imagemDadoCinco
      break;
    case (6):
      dado.imagem = imagemDadoSeis
      break;
  }
  dado.desenhar_dado(tabuleiro.largura, tabuleiro.altura);

  //Botao configuracao
  botaoConfig.desenhar_botao()

  //Definicoes imagem
  image(definicoesImg, 55, 45, 30, 30);

  //Exibir desafios
  //tabuleiro.confere_desafio(turnoJogador, casa[jogador[turnoJogador-1].posicao])

  //Mostrar indicador do jogador atual
  jogador[turnoJogador - 1].exibir_indicador_turno()

  //Logo
  logo.desenhar_logo();
}

function mousePressed() {

  if (isHover(dado.posicaoX, dado.posicaoX + dado.tamanho, dado.posicaoY, dado.posicaoY + dado.tamanho)) {

    retornoGirardado = dado.girar_dado()
    jogador[turnoJogador - 1].mover_jogador(retornoGirardado)
    console.log("Vez do jogador ", turnoJogador, "\nPosicao atual: ", jogador[turnoJogador - 1].posicao, "\nValor dado:    ", retornoGirardado)
    gerirTurno(jogo.qtdJogadores, jogador[turnoJogador - 1])
  }
}
