function exibirPaginaTres(){
    //Requisicao a cada 1 segundo e meio para atualizar dados do tabuleiro
    frameRate(1.5)
    loadJSON(`/getBaseDadosPartida?idSalaAtual=${idSalaAtual}`, (data) => {
        //vai receber os dados enviados pela rota 'getDataBase'
        //sera recebido um array com todos os registos da base de dados com um json
        // console.log("Dados recebidos da base de dados: ", data)
        for (let x = 0; x < data.length; x++) {

            jogador[x].numero = data[x].num_atribuido
            jogador[x].nome = data[x].nome_user
            jogador[x].posicao = data[x].posicao
            jogador[x].pontuacao = data[x].pontuacao
            turnoJogador = data[x].turno_atual
            retornoGirardado = data[x].dado_atual
            tabuleiro.textoConsoleLateral = data[x].mensagem_console
            desafioAberto = data[x].desafio_aberto
            dueloAberto = data[x].duelo_aberto
            jogadorCasaOcupada = data[x].jogador_duelado
            qtdGirosDado = data[x].qtd_giros_dado_duelo
            jogadorDesafiador = data[x].jogador_desafiador
            jogoTerminou = data[x].terminou
            jogo.ordemChegada = data[x].lista_chegada.split(',').map(item => parseInt(item.trim()));


            // Identificar o numero do jogador que fez o login
            // Numero para a gestao de turnos
            if (data[x].id_user == idUserLogin) {
                numeroJogadorLogado = data[x].num_atribuido
            }

            //Variavel que inicia em falso e so passa a ser true quando o load é finalizado
            dadosCarregados = true
        }

    })

    //So exibe o tabuleiro depois que o primeiro load for finalizado
    if (dadosCarregados) {
        console.log("VOCE É O JOGADOR NUMERO: ", numeroJogadorLogado)

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

        if (!jogoTerminou) {

            //Desenhar o dado se o jogo nao tiver terminado
            dado.desenhar_dado(tabuleiro.largura, tabuleiro.altura);

            //Exibir console com informacoes da partida
            tabuleiro.exibir_console(turnoJogador, capitalizeFirstLetter(jogador[turnoJogador - 1].nome))
            tabuleiro.exibir_console_lateral()
            tabuleiro.exibir_lista_jogadores(jogador, jogo.qtdJogadores)
            tabuleiro.exibir_lista_ranking(listaRanking)

        } else {

            //Caso o jogo tenha acabado, "limpa" o tabueleiro e exibe o placar
            tabuleiro.desenhar_tabuleiro()
            tabuleiro.exibir_placar(jogo, jogador)

            //Desenhar botao voltar
            botaoInico.texto = "Voltar ao início"
            botaoInico.largura = tabuleiro.largura * 0.19
            botaoInico.altura = tabuleiro.altura * 0.1
            botaoInico.desenhar_botao(tabuleiro.largura)

        }
    }
}