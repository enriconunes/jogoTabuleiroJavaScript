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
let ativarDadoDesafio;
let dueloAberto;
let ativarDadoDuelo;
let jogadorCasaOcupada;
let valoresDadoDuelo = []
let qtdGirosDado;

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
  logo = new Logo(logoImg);
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

  //Desafios e duelos iniciam fechados
  dueloAberto = false
  desafioAberto = false

  //Quantidade de vezes que o dado do duelo foi girado - inicia em 0
  qtdGirosDado = 0;
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

  //Se for true, o dado atual sera usado para jogar o desafio ou o duelo - inicia em falso
  ativarDadoDesafio = false
  ativarDadoDuelo = false

  //Desenhar jogadores na ordem do ultimo ao primeiro
  for (let n = jogo.qtdJogadores; n > 0; n--) {
    jogador[n - 1].desenhar_jogador(casa[jogador[n - 1].posicao])
  }

  //Se o jogador ja tiver chegado, incrementa um valor e pula vez dele
  if (jogador[turnoJogador - 1].posicao == 46) {
    gerirTurno(jogo.qtdJogadores, jogador[turnoJogador - 1])
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

  //Botao configuracao
  botaoConfig.desenhar_botao()

  //Definicoes imagem
  image(definicoesImg, 55, 45, 30, 30);

  //Mostrar indicador do jogador atual
  jogador[turnoJogador - 1].exibir_indicador_turno()

  //Exibir caixa de desafio e altera a imagem do dado caso haja um desafio aberto
  if (desafioAberto) {
    tabuleiro.exibir_desafio(jogador[turnoJogador - 1], casa[jogador[turnoJogador - 1].posicao])
    ativarDadoDesafio = true
  }

  //Exibir caixa de duelo e altera a imagem do dado caso haja um duelo aberto
  if (dueloAberto) {
    tabuleiro.exibir_duelo(jogador[turnoJogador - 1], jogador[jogadorCasaOcupada])
    ativarDadoDuelo = true
  }

  if (!jogo.confere_terminou()) {

    //Desenhar o dado se o jogo nao tiver terminado
    dado.desenhar_dado(tabuleiro.largura, tabuleiro.altura);

    //Exibir console com informacoes da partida
    tabuleiro.exibir_console(turnoJogador)
    tabuleiro.exibir_console_lateral()

  } else {

    //Caso o jogo tenha acabado, "limpa" o tabueleiro e exibe o placar
    tabuleiro.desenhar_tabuleiro()
    tabuleiro.exibir_placar(jogo)

  }

  //Logo
  logo.desenhar_logo(tabuleiro);

}

function mousePressed() {

  //Confere se o mouse está em cima do dado e se o jogo ainda nao terminou para executar as ações
  if (isHover(dado.posicaoX, dado.posicaoX + dado.tamanho, dado.posicaoY, dado.posicaoY + dado.tamanho) && !jogo.confere_terminou()) {

    //Move o jogador e confere se a casa que ele caiu é um desafio
    if (!dueloAberto) {
      retornoGirardado = dado.girar_dado()
      jogador[turnoJogador - 1].mover_jogador(retornoGirardado)
      tabuleiro.isDesafio(casa[jogador[turnoJogador - 1].posicao])
      console.log("Vez do jogador ", turnoJogador, "\nPosicao atual: ", jogador[turnoJogador - 1].posicao, "\nValor dado:    ", retornoGirardado)

      //Definir texto do console lateral
      if (jogador[turnoJogador - 1].posicao == 0 && retornoGirardado != 6) {
        tabuleiro.textoConsoleLateral = `Jogador ${turnoJogador} tirou ${retornoGirardado}\ne permaneceu no início`
      } else {
        if (jogador[turnoJogador - 1].posicao == 46) {
          tabuleiro.textoConsoleLateral = `Jogador ${turnoJogador} tirou ${retornoGirardado}\ne chegou ao final!`
        } else {
          tabuleiro.textoConsoleLateral = `Jogador ${turnoJogador} tirou ${retornoGirardado}\ne moveu para a casa ${jogador[turnoJogador - 1].posicao}`
        }
      }

    }

    //Conferir se ja existe algum jogador na casa
    for (let m = 0; m < jogo.qtdJogadores; m++) {
      if (jogador[turnoJogador - 1].conferir_posicao_jogadores(jogador[m])) {
        jogadorCasaOcupada = m
        dueloAberto = true
      }
    }

    //Adicionar o jogador à lista de jogadores que ja chegaram caso ele tenha chegado
    if (jogador[turnoJogador - 1].posicao == 46) {
      console.log("O jogador ", jogador[turnoJogador - 1].numero, " chegou!")
      jogo.adicionar_jogador_lista_chegada(jogador[turnoJogador - 1])
    }

    if (desafioAberto) {
      //conferir se o dado atual é para o desafio
      if (ativarDadoDesafio) {
        let retornoGirarDadoDesafio = dado.girar_dado()
        casa[jogador[turnoJogador - 1].posicao].resolver_desafio(jogador[turnoJogador - 1], retornoGirarDadoDesafio, tabuleiro)
        gerirTurno(jogo.qtdJogadores, jogador[turnoJogador - 1])

        //alterar a imagem do dado
        retornoGirardado = retornoGirarDadoDesafio
      }
    }
    else if (dueloAberto) {
      //conferir se o dado atual é para o duelo
      if (ativarDadoDuelo) {
        let retornoGirarDadoDuelo = dado.girar_dado()

        //Guarda os valores dos 2 dados
        valoresDadoDuelo[qtdGirosDado] = retornoGirarDadoDuelo // varia entre [0] e [1]

        jogador[turnoJogador - 1].resolver_duelo(jogador[turnoJogador - 1], jogador[jogadorCasaOcupada], valoresDadoDuelo[0], valoresDadoDuelo[1], tabuleiro)

        //alterar a imagem do dado
        retornoGirardado = retornoGirarDadoDuelo

        console.log("Jogador ", jogador[turnoJogador - 1].numero, " caiu na casa ocupada pelo jogador ", jogadorCasaOcupada + 1, " e tirou o numero ", retornoGirarDadoDuelo)

        if (!qtdGirosDado >= 1) {
          gerirTurno(jogo.qtdJogadores, jogador[turnoJogador - 1])
        }
      }
    }
    else {
      //Só passa a vez para o proximo jogador se nao for um desafio ou se nao for um duelo
      gerirTurno(jogo.qtdJogadores, jogador[turnoJogador - 1])
    }

  }

}
