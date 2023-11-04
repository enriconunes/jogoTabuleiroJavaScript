function exibirPaginaDois(){
    frameRate(1)

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

    //Armazenar array ranking
    loadJSON(`/listagemRanking`, (data) => {
        listaRanking = data
    })

    //Botao entrar na partida
    botaoEntrarPartida.texto = "Entrar na partida"
    botaoEntrarPartida.largura = tabuleiro.largura * 0.19
    botaoEntrarPartida.altura = tabuleiro.altura * 0.1
    botaoEntrarPartida.desenhar_botao(tabuleiro.largura)

    //Botao voltar
    botaoVoltar.desenhar_botao(tabuleiro.largura)

    exibirTexto(respostaServidorUser, width / 2, height / 2 + tabuleiro.altura * 0.19, tabuleiro.largura * 0.018, "white")
}