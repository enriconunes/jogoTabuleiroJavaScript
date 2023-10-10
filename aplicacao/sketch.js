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
let desafioAberto;

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
  dadoDesafio = new Dado(imagemDadoGirar);
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

  //Desenhar o dado normal
  dado.desenhar_dado(tabuleiro.largura, tabuleiro.altura);

  //Botao configuracao
  botaoConfig.desenhar_botao()

  //Definicoes imagem
  image(definicoesImg, 55, 45, 30, 30);

  //Mostrar indicador do jogador atual
  jogador[turnoJogador - 1].exibir_indicador_turno()

  //Exibir caixa de desafio e o dado para desafios
  if (desafioAberto) {
    tabuleiro.exibir_desafio(jogador[turnoJogador - 1], casa[jogador[turnoJogador - 1].posicao], dadoDesafio)
  }

  //Logo
  logo.desenhar_logo();

}

function mousePressed() {

  if (isHover(dado.posicaoX, dado.posicaoX + dado.tamanho, dado.posicaoY, dado.posicaoY + dado.tamanho)) {

    //Move o jogador e confere se a casa que ele caiu é um desafio
    jogador[turnoJogador - 1].mover_jogador(retornoGirardado)
    tabuleiro.isDesafio(casa[jogador[turnoJogador - 1].posicao])

    //Se for um desafio, pausa os movimentos do dado
    if (!desafioAberto) {
      retornoGirardado = dado.girar_dado()
      //jogador[turnoJogador - 1].mover_jogador(retornoGirardado)
      console.log("Vez do jogador ", turnoJogador, "\nPosicao atual: ", jogador[turnoJogador - 1].posicao, "\nValor dado:    ", retornoGirardado)
      gerirTurno(jogo.qtdJogadores, jogador[turnoJogador - 1])
    } else {
      //casa.resolver_desafio()
      //chama a funcao de girar o dado
      //o valor do dado girado é passado para o dado normal
      //confere se passou no desafio
      //cumpre as punicoes do jogador
      //passa desafioAberto para falso
    }
  }
}
