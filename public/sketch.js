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
let respostaServidorUser;
let idUserLogin;
let nomeUserLogin;
let idSalaAtual;
let qtdJogadores;
let dadosCarregados = false

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
  logo = new Logo(logoImg);
  dado = new Dado(imagemDadoSeis);
  botaoConfig = new Botao(70, 60, 40, 40, "#5858e0");
  tabuleiro = new Tabuleiro();
  botaoCriarConta = new Botao(width / 2 - tabuleiro.largura * 0.223 / 2, height / 2 + tabuleiro.altura * 0.09, "black") //"#5858e0"
  botaoEntrarConta = new Botao(width / 2 + tabuleiro.largura * 0.202 / 2, height / 2 + tabuleiro.altura * 0.09, "black")
  botaoCriarSala = new Botao(width / 2 - tabuleiro.largura * 0.223 / 2, height / 2 + tabuleiro.altura * 0.09, "black")
  botaoEntrarSala = new Botao(width / 2 + tabuleiro.largura * 0.202 / 2, height / 2 + tabuleiro.altura * 0.09, "black")
  botaoEntrarPartida = new Botao(width / 2, height / 2 + tabuleiro.altura * 0.3, "black")
  jogo = new Jogo();
  userInput = new InputText(width / 2 - tabuleiro.largura * 0.21, height / 2 - tabuleiro.altura * 0.24, tabuleiro.largura * 0.4, tabuleiro.altura * 0.09)
  senhaInput = new InputText(width / 2 - tabuleiro.largura * 0.21, height / 2 - tabuleiro.altura * 0.1, tabuleiro.largura * 0.4, tabuleiro.altura * 0.09)
  salaInput = new InputText(width / 2 - tabuleiro.largura * 0.21, height / 2 - tabuleiro.altura * 0.1, tabuleiro.largura * 0.4, tabuleiro.altura * 0.09)

  //Instanciar 46 objetos do tipo Casa
  for (var i = 0; i < 47; i++) {
    var casaTemp = new Casa(tabuleiro.largura, tabuleiro.altura);
    casaTemp.numero = i
    casa.push(casaTemp);
  }

  //Instanciar 4 objetos do tipo jogador
  coresJogadores = ["red", "blue", "purple", "black"]
  for (var i = 0; i < 4; i++) {
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
  //Desenhar Borda
  createScreenBorder();

  //Gerir a exibição de paginas
  if (paginaAtual == 0) {

    frameRate(60)

    //Pagina inicial - Login e sigin
    //Desenhar tabuleiro
    tabuleiro.desenhar_tabuleiro()

    fill(255)

    //Input Text
    userInput.desenhar_input("Username:")
    senhaInput.desenhar_input("Password:")

    //Botoes
    botaoCriarConta.texto = "Criar uma conta"
    botaoCriarConta.largura = tabuleiro.largura * 0.19
    botaoCriarConta.altura = tabuleiro.altura * 0.1
    botaoCriarConta.desenhar_botao()

    botaoEntrarConta.texto = "Entrar na conta"
    botaoEntrarConta.largura = tabuleiro.largura * 0.19
    botaoEntrarConta.altura = tabuleiro.altura * 0.1
    botaoEntrarConta.desenhar_botao()

    //Exibir mensagem enviada pelo servidor ao tentar criar uma conta ou entrar no perfil
    exibirTexto(respostaServidorUser, width / 2, height / 2 + tabuleiro.altura * 0.19, tabuleiro.largura * 0.018, "white")

  }
  else if (paginaAtual == 1) {
    //Pagina entrar ou criar sala

    //Remover inputs da pagina anterior
    userInput.destruir_input()
    senhaInput.destruir_input()

    //Desenhar tabuleiro
    tabuleiro.desenhar_tabuleiro()

    //Input Text
    salaInput.desenhar_input("Nome da sala:")

    //Botoes
    botaoCriarSala.texto = "Criar nova sala"
    botaoCriarSala.largura = tabuleiro.largura * 0.19
    botaoCriarSala.altura = tabuleiro.altura * 0.1
    botaoCriarSala.desenhar_botao()

    botaoEntrarSala.texto = "Entrar na sala"
    botaoEntrarSala.largura = tabuleiro.largura * 0.19
    botaoEntrarSala.altura = tabuleiro.altura * 0.1
    botaoEntrarSala.desenhar_botao()

    //Exibir mensagem enviada pelo servidor ao tentar criar uma conta ou entrar no perfil
    exibirTexto(respostaServidorUser, width / 2, height / 2 + tabuleiro.altura * 0.19, tabuleiro.largura * 0.018, "white")

  }
  else if (paginaAtual == 2) {

    //Remover input da pagina anterior
    salaInput.destruir_input()

    //Desenhar tabuleiro
    tabuleiro.desenhar_tabuleiro()

    //Exibir lista de jogadores que estão na sala
    exibirTexto("Lista de jogadores na sala:", width / 2, height / 2 - tabuleiro.altura * 0.3, tabuleiro.largura * 0.04, "white")

    //Receber dados da sala para fazer a listagem de jogadores na pagina 2
    loadJSON(`/getListagemJogadoresSala?idSalaAtual=${idSalaAtual}`, (data) => {

      //Listagem dos nomes dos jogadores recebidos
      for (let ctr = 0; ctr < data.length; ctr++) {

        let nomeFormatado = capitalizeFirstLetter(data[ctr].username);

        exibirTexto(nomeFormatado, width / 2, height / 2 - tabuleiro.altura * 0.2 + 30 * ctr, tabuleiro.largura * 0.03, "white")
      }

      //Guardar a quantidade de jogadores da sala
      jogo.qtdJogadores = data.length;

    })

    //Botao entrar na partida
    botaoEntrarPartida.texto = "Entrar na partida"
    botaoEntrarPartida.largura = tabuleiro.largura * 0.19
    botaoEntrarPartida.altura = tabuleiro.altura * 0.1
    botaoEntrarPartida.desenhar_botao()

    exibirTexto(respostaServidorUser, width / 2, height / 2 + tabuleiro.altura * 0.19, tabuleiro.largura * 0.018, "white")

    noLoop()

  }
  else if (paginaAtual == 3) {

    //Requisicao a cada 2 segundos para atualizar dados do tabuleiro
    frameRate(0.5)
    loadJSON(`/getBaseDadosPartida?idSalaAtual=${idSalaAtual}`, (data) => {
      //vai receber os dados enviados pela rota 'getDataBase'
      //sera recebido um array com todos os registos da base de dados com um json
      // console.log("Dados recebidos da base de dados: ", data)
      for (let x = 0; x < data.length; x++) {
        console.log("---------------------")
        // console.log("ID user: ", data[x].id_user)
        // console.log("Num jogador: ", data[x].num_atribuido)
        // console.log("Nome jogador: ", data[x].nome_user)
        // console.log("Posicao: ", data[x].posicao)
        // console.log("Pontuacao: ", data[x].pontuacao)
        // console.log("Dado atual: ", data[x].dado_atual)
        // console.log("Turno atual: ", data[x].turno_atual)

        jogador[x].numero = data[x].num_atribuido
        jogador[x].nome = data[x].nome_user
        jogador[x].posicao = data[x].posicao
        jogador[x].pontuacao = data[x].pontuacao

        //Variavel que inicia em falso e so passa a ser true quando o load é finalizado
        dadosCarregados = true
      }

    })

    //So exibe o tabuleiro depois que o primeiro load for finalizado
    if (dadosCarregados) {
      //Atribuir valores aos jogadores com dados da base de dados
      console.log("JOGADORES INSTANCIADOS: ", jogador)

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
    }

  }

  //Logo
  logo.desenhar_logo(tabuleiro);

}

function mousePressed() {

  //Acoes do dado
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
      // "jogador": jogador[turnoJogador - 1].numero,
      // "posicao": jogador[turnoJogador - 1].posicao,
      // "pontuacao": jogador[turnoJogador - 1].pontuacao,
      "dadoAtual": retornoGirardado,
      // "turnoJogador": turnoJogador,
      "idSalaAtual": idSalaAtual
    }

    //POST AULA TEORICA
    httpPost('/updadeDadosPartida', dadosRodada, 'json', (data) => {
      console.log(data)
    }, (err) => console.log(err))
  }

  //Acoes pagina inicial
  //Botao criar conta
  if (botaoCriarConta.mouseIsHover() && paginaAtual == 0) {

    //Armazenar dados dos inputs
    let jsonInput = {
      "username": userInput.input.value(),
      "pass": senhaInput.input.value()
    }

    //Limpar campos input
    userInput.input.value("")
    senhaInput.input.value("")

    //Enviar dados do input para o servidor
    httpPost('/criarConta', jsonInput, 'json', (data) => {
      console.log("Data http post: ", data)
      respostaServidorUser = data.status
    }, (err) => console.log(err))

    loop()
  }

  //Botao entrar na conta
  if (botaoEntrarConta.mouseIsHover() && paginaAtual == 0) {

    //Armazenar dados dos inputs
    let jsonInput = {
      "username": userInput.input.value(),
      "pass": senhaInput.input.value()
    }

    //Enviar dados do input para o servidor
    httpPost('/getEfetuarLogin', jsonInput, 'json', (data) => {
      // console.log(data)
      if (data.status == "Login efetuado!") {
        paginaAtual = 1
        idUserLogin = data.id_user
        nomeUserLogin = data.name_user
      } else {
        respostaServidorUser = data.status
      }
    }, (err) => console.log(err))

    loop()

  }

  //Botao criar sala
  if (botaoCriarSala.mouseIsHover() && paginaAtual == 1) {
    //Armazenar dados dos inputs
    let jsonInput = {
      "nomeSala": salaInput.input.value(),
    }

    //Limpar campo input
    salaInput.input.value("")

    //Enviar dados do input para o servidor
    httpPost('/criarSala', jsonInput, 'json', (data) => {
      console.log("Data http post: ", data)
      respostaServidorUser = data.status
    }, (err) => console.log(err))

    loop()
  }

  //Botao entrar sala
  if (botaoEntrarSala.mouseIsHover() && paginaAtual == 1) {

    //Dados do input e do usario 'logado'
    let jsonInput = {
      "idUserLogin": idUserLogin,
      "nomeUserLogin": nomeUserLogin,
      "nomeSala": salaInput.input.value()
    }

    //Enviar dados do input para o servidor
    httpPost('/entrarSala', jsonInput, 'json', (data) => {
      // console.log(data)
      if (data.status == "Jogador entrou na sala com sucesso!") {
        //Avançar para a proxima pagina
        paginaAtual = 2
        idSalaAtual = data.id_sala
        console.log("O jogador entrou na sala com ID ", idSalaAtual)
      } else {
        respostaServidorUser = data.status
      }
    }, (err) => console.log(err))
  }

  //Botao iniciar partida
  if (botaoEntrarPartida.mouseIsHover() && paginaAtual == 2) {
    if (jogo.qtdJogadores < 2) {
      respostaServidorUser = "A partida só pode começar com pelo menos dois jogadores!"
    } else {
      paginaAtual = 3
    }

    loop()
  }

}