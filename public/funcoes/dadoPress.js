function dadoPress() {
    //Confere se o mouse está em cima do dado e se o jogo ainda nao terminou para executar as ações
    if (isHover(dado.posicaoX, dado.posicaoX + dado.tamanho, dado.posicaoY, dado.posicaoY + dado.tamanho) && !jogoTerminou) {

        // Confere se é o turno do jogador logado para ele lançar o dado
        if (numeroJogadorLogado == turnoJogador || dueloAberto) {
            //Move o jogador e confere se a casa que ele caiu é um desafio
            if (!dueloAberto) {
                retornoGirardado = dado.girar_dado()
                jogador[turnoJogador - 1].mover_jogador(retornoGirardado)
                tabuleiro.isDesafio(casa[jogador[turnoJogador - 1].posicao])
                //console.log("Vez do jogador ", turnoJogador, "\nPosicao atual: ", jogador[turnoJogador - 1].posicao, "\nValor dado:    ", retornoGirardado)

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

                    jogador[turnoJogador - 1].resolver_duelo(jogador[turnoJogador - 1], jogador[jogadorCasaOcupada], valoresDadoDuelo[qtdGirosDado], valoresDadoDuelo[qtdGirosDado], tabuleiro)

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

            //Confere se o jogo terminou e envia o resultado para a DB
            jogo.confere_terminou()

            //Se o jogador ja tiver chegado, incrementa um valor e pula vez dele
            if (jogador[turnoJogador - 1].posicao == 46) {
                gerirTurno(jogo.qtdJogadores, jogador[turnoJogador - 1])
            }

            // Enviar dados para o servidor
            let dadosRodada = {
                "numeroJogadorLogado": numeroJogadorLogado,
                "posicao": jogador[numeroJogadorLogado - 1].posicao,
                "pontuacao": jogador[numeroJogadorLogado - 1].pontuacao,
                "chegou": jogador[numeroJogadorLogado - 1].chegou,
                "dadoAtual": retornoGirardado,
                "turno_atual": turnoJogador,
                "idSalaAtual": idSalaAtual,
                "mensagem_console": tabuleiro.textoConsoleLateral,
                "desafio_aberto": desafioAberto,
                "duelo_aberto": dueloAberto,
                "jogadorCasaOcupada": jogadorCasaOcupada,
                "jogadorCasaOcupadaNovaPosicao": jogador[jogadorCasaOcupada].posicao,
                "jogadorDesafiador": jogadorDesafiador,
                "jogadorDesafiadorNovaPosicao": jogador[jogadorDesafiador].posicao,
                "qtdGirosDadoDesafio": qtdGirosDado,
                "jogoTerminou": jogoTerminou,
                "listaOrdemChegada": jogo.ordemChegada
            }

            httpPost('/updadeDadosPartida', dadosRodada, 'json', (data) => {
                console.log(data)
            }, (err) => console.log(err))
        } else {
            console.log("Não é a sua vez. Aguarde o seu turno!");
        }
    }

}