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
let paginaAtual = 0;
let userInput;
let senhaInput;
let respostaServidorUser;

function preload() {

  // 'posicionamento' é o endpoint determinado no servidor
  // este endpoint tem um res.send json, o json fica alojado em (data )
  loadJSON('/getBaseDadosPartida', (data) => {
    //vai receber os dados enviados pela rota 'getDataBase'
    //sera recebido um array com todos os registos da base de dados com um json
    console.log("Dados recebidos da base de dados: ", data)
  })

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
  logo = new Logo(logoImg);
  dado = new Dado(imagemDadoSeis);
  botaoConfig = new Botao(70, 60, 40, 40, "#5858e0");
  tabuleiro = new Tabuleiro();
  botaoCriarConta = new Botao(width / 2 - tabuleiro.largura * 0.223 / 2, height / 2 + tabuleiro.altura * 0.09, tabuleiro.largura * 0.19, tabuleiro.altura * 0.1, "#5858e0")
  botaoEntrarConta = new Botao(width / 2 + tabuleiro.largura * 0.202 / 2, height / 2 + tabuleiro.altura * 0.09, tabuleiro.largura * 0.19, tabuleiro.altura * 0.1, "#5858e0")
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

  //Instanciar objetos do tipo Input
  senhaInput = createInput('');
  userInput = createInput('');
}

function draw() {

  cursor(ARROW)
  //Cor de Fundo
  background("#5858e0");
  //Desenhar Borda
  createScreenBorder();

  //Desenhar tabuleiro
  tabuleiro.desenhar_tabuleiro()

  //Gerir a exibição de paginas
  if(paginaAtual == 0){

    //Pagina inicial - Sigin/Login
    fill(255)
    //Input Text
    text("Nome de usuário", width / 2 - tabuleiro.largura * 0.21, height / 2 - tabuleiro.altura * 0.25)
    userInput.position(width / 2 - tabuleiro.largura * 0.21, height/2 - tabuleiro.altura * 0.24);
    userInput.size(tabuleiro.largura * 0.4, tabuleiro.altura * 0.09);

    text("Senha", width / 2 - tabuleiro.largura * 0.21, height / 2 - tabuleiro.altura * 0.11)
    senhaInput.position(width / 2 - tabuleiro.largura * 0.21, height / 2 - tabuleiro.altura * 0.1);
    senhaInput.size(tabuleiro.largura * 0.4, tabuleiro.altura * 0.09);

    //Botoes
    botaoCriarConta.texto = "Criar uma conta"
    botaoEntrarConta.texto = "Entrar na conta"
    botaoCriarConta.desenhar_botao()
    botaoEntrarConta.desenhar_botao()

    //Exibir mensagem enviada pelo servidor ao tentar criar uma conta ou entrar no perfil
    // exibirTexto(respostaServidorUser, width / 2, height / 2 + tabuleiro.altura * 0.19, tabuleiro.largura * 0.018, "white")
    
  }
  else if(paginaAtual == 3){
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

    // Enviar dados para o servidor
    let dadosRodada = {
      "jogador": jogador[turnoJogador - 1].numero,
      "posicao": jogador[turnoJogador - 1].posicao,
      "pontuacao": jogador[turnoJogador - 1].pontuacao,
      "dadoAtual": retornoGirardado,
      "turnoJogador": turnoJogador,
    }

    //POST AULA TEORICA
    httpPost('/enviarDados', dadosRodada, 'json', (data) => {
      console.log(data)
    }, (err) => console.log(err))
  }

  //Acoes pagina inicial
  if (botaoCriarConta.mouseIsHover()){

    console.log(`Criar conta:\nUser: ${userInput.value()}\nPass: ${senhaInput.value()}`)

    //Armazenar dados dos inputs
    let jsonInput = {
      "username": userInput.value(),
      "pass": senhaInput.value()
    }

    //Limpar campos input
    senhaInput = createInput('');
    userInput = createInput('');

    //Enviar dados do input para o servidor
    httpPost('/criarConta', jsonInput, 'json', (data) => {
      console.log(data)
    }, (err) => console.log(err))

    // Ler mensagem enviada pelo servidor ao tentar criar conta e a exibir no sketch
    // lerRespostaRotaPost('/criarConta')
    //   .then(data => {
    //     console.log("Dados recebidos da base de dados: ", data);
    //     //Pegar resposta enviada pelo servidor e alterar mensagem de texto exibida na tela de login
    //     respostaServidorUser = data.status
    //   })
    //   .catch(error => {
    //     console.error('Erro:', error);
    //   });

  }

}
