function botaoCriarContaPress(){
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
}

function botaoEntrarContaPress(){
    if (botaoEntrarConta.mouseIsHover() && paginaAtual == 0) {

        if (userInput.input.value() == "" || senhaInput.input.value() == "") {
            respostaServidorUser = "Insira dodos válidos!"
        } else {
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

    }
}

function botaoCriarSalaPress(){
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
}

function botaoEntrarSalaPress(){
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
}

function botaoRetomarSalaPress(){
    if (botaoRetomarSala.mouseIsHover() && paginaAtual == 1) {

        //Dados do input
        let jsonInput = {
            "idUserLogin": idUserLogin,
            "nomeUserLogin": nomeUserLogin,
            "nomeSala": salaInput.input.value()
        }

        //Enviar dados do input para o servidor
        httpPost('/retomarSala', jsonInput, 'json', (data) => {
            respostaServidorUser = data.status

            if (data.status == "Jogador está na sala!") {
                //Avançar para a proxima pagina
                paginaAtual = 2
                idSalaAtual = data.id_sala
            }

        }, (err) => console.log(err))

    }
}

function botaoEntrarPartidaPress(){
    if (botaoEntrarPartida.mouseIsHover() && paginaAtual == 2) {
        if (jogo.qtdJogadores < 2) {
            respostaServidorUser = "A partida só pode começar com pelo menos dois jogadores!"
        } else {
            paginaAtual = 3

            let jsonSalaId = {
                "idSalaAtual": idSalaAtual
            }

            //Update do estado da sala, passar de 'aberta' para 'inicializada'
            httpPost('/updateEstadoSala', jsonSalaId, 'json', (data) => {
                // console.log(data)
                if (data.status == "Estado da sala alterado para iniciada!") {
                    respostaServidorUser = data.status
                } else {
                    respostaServidorUser = "Erro ao iniciar a partida!"
                }
            }, (err) => console.log(err))

        }

        loop()
    }
}

function botaoVoltarPress(){
    if (botaoVoltar.mouseIsHover() && (paginaAtual == 1 || paginaAtual == 2)) {
        location.reload()
    }
}

function botaoVoltarInicioPress(){
    if (botaoInico.mouseIsHover() && paginaAtual == 3) {
        location.reload()
    }
}