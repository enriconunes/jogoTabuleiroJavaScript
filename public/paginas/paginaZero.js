function exibirPaginaZero() {
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
    botaoCriarConta.desenhar_botao(tabuleiro.largura)

    botaoEntrarConta.texto = "Entrar na conta"
    botaoEntrarConta.largura = tabuleiro.largura * 0.19
    botaoEntrarConta.altura = tabuleiro.altura * 0.1
    botaoEntrarConta.desenhar_botao(tabuleiro.largura)

    //Exibir mensagem enviada pelo servidor ao tentar criar uma conta ou entrar no perfil
    exibirTexto(respostaServidorUser, width / 2, height / 2 + tabuleiro.altura * 0.19, tabuleiro.largura * 0.018, "white")
}