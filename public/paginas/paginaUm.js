function exibirPaginaUm(){
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
    botaoCriarSala.desenhar_botao(tabuleiro.largura)

    botaoEntrarSala.texto = "Entrar na sala"
    botaoEntrarSala.largura = tabuleiro.largura * 0.19
    botaoEntrarSala.altura = tabuleiro.altura * 0.1
    botaoEntrarSala.desenhar_botao(tabuleiro.largura)

    botaoRetomarSala.texto = "Retomar sala"
    botaoRetomarSala.largura = tabuleiro.largura * 0.4
    botaoRetomarSala.altura = tabuleiro.altura * 0.1
    botaoRetomarSala.desenhar_botao(tabuleiro.largura)

    botaoVoltar.texto = "←"
    botaoVoltar.largura = tabuleiro.largura * 0.04
    botaoVoltar.altura = tabuleiro.altura * 0.05
    botaoVoltar.desenhar_botao(tabuleiro.largura)

    //Exibir mensagem enviada pelo servidor ao tentar criar uma conta ou entrar no perfil
    exibirTexto(respostaServidorUser, width / 2, height / 2 + tabuleiro.altura * 0.32, tabuleiro.largura * 0.018, "white")
}