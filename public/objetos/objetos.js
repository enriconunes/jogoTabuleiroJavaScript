class Logo {
    constructor(logoImg) {
        this.imagem = logoImg;
        this.posY = 0
        this.posX = 0
        this.largura = 0
        this.altura = 0
    }

    desenhar_logo(tabuleiro) {
        push();

        this.altura = tabuleiro.largura * 0.2
        this.largura = tabuleiro.largura * 0.4
        this.posX = width / 2 - this.largura / 2
        this.posY = height / 2 - tabuleiro.altura / 1.35

        image(this.imagem, this.posX, this.posY, this.largura, this.altura)

        pop();
    }
}

class Botao {

    constructor(posX, posY, cor) {
        this.corPrimaria = cor;
        this.corVariante = cor;
        this.corHover = 0;
        this.posX = posX;
        this.posY = posY;
        this.largura = 0;
        this.altura = 0;
        this.larguraBorda = 2;
        this.corBorda = 255;
        this.texto = ""
    }

    desenhar_botao() {

        push()

        //Animacao do botao
        // if (this.mouseIsHover()) {
        //     this.corVariante = this.corHover;
        //     cursor(HAND);
        // } else {
        //     this.corVariante = this.corPrimaria;
        // }

        strokeWeight(this.larguraBorda);
        stroke(this.corBorda);
        rectMode(CENTER);
        fill(this.corVariante);
        rect(this.posX, this.posY, this.largura, this.altura);

        //Escrever texto do botao
        textAlign(CENTER, CENTER)
        fill(255)
        strokeWeight(0)
        textSize(this.largura * 0.09)
        text(this.texto, this.posX, this.posY)
        pop()

    }

    mouseIsHover() {
        if (isHover(this.posX - this.largura / 2, this.posX + this.largura / 2, this.posY - this.altura / 2, this.posY + this.altura / 2)) {
            return true
        } else {
            return false
        }
    }
}

class Dado {
    constructor(imagem) {
        this.imagem = imagem;
        this.tamanho = width * 0.08
        this.posicaoX = 0
        this.posicaoY = 0

        if (this.tamanho > 65) {
            this.tamanho = 65
        }
    }

    desenhar_dado(larguraTabuleiro, alturaTabuleiro) {

        push()

        this.posicaoX = width / 2 - larguraTabuleiro / 2
        this.posicaoY = height / 2 + alturaTabuleiro / 2 + 10

        image(this.imagem, this.posicaoX, this.posicaoY, this.tamanho, this.tamanho);

        let dadoHover = isHover(this.posicaoX, this.posicaoX + this.tamanho, this.posicaoY, this.posicaoY + this.tamanho);

        if (dadoHover) {
            cursor(HAND)
        }

        pop()
    }

    girar_dado() {
        return int(random(1, 7))
    }

}

class Tabuleiro {

    constructor() {
        this.cor = "#699669"
        this.larguraBorda = 2;
        this.corBorda = 255;
        this.textoConsoleLateral = ""

        //Manter a proporçao 16:9
        this.largura = width * 0.9;
        this.altura = this.largura * 0.5625;

        //Garantir que a altura nao passe de 70% da tela
        if (this.altura > height * 0.7) {
            this.altura = height * 0.7;
            //Largura = 177% da altura para manter a prop. 16:9
            this.largura = this.altura + this.altura * 0.77;
        }
    }

    desenhar_tabuleiro() {
        push()

        fill(this.cor);
        stroke(this.corBorda);
        strokeWeight(this.larguraBorda);
        rectMode(CENTER);
        rect(width / 2, height / 2, this.largura, this.altura)

        pop()
    }

    isDesafio(casa) {
        if (casa.isDesafio) {
            //variavel global para conferir se um desafio está em aberto
            desafioAberto = true
        }
    }

    exibir_desafio(jogador, casa) {
        push()
        //desenhar quadro com o desafio
        fill(12, 54, 32, 230)
        stroke(255)
        strokeWeight(this.larguraBorda)
        rectMode(CENTER)
        rect(width / 2, height / 2, this.largura * 0.7, this.altura * 0.3)

        //escrever a mensagem
        let textoDesafio = `Jogador ${jogador.numero} caiu no desafio da casa ${casa.numero}:\n${casa.textoDesafio}`
        fill(255, 255, 255, 230)
        strokeWeight(0)
        textSize(this.largura * 0.025)
        textAlign(CENTER, CENTER)
        text(textoDesafio, width / 2, height / 2)
        pop()
    }

    exibir_console(turno) {
        push()
        //desenhar quadro com o desafio
        fill("#185c37")
        stroke(255)
        strokeWeight(this.larguraBorda)
        rectMode(CENTER)
        rect(width / 2, height / 2 + this.altura / 1.7, this.largura * 0.8, this.altura * 0.1)

        //escrever a mensagem
        let textoDesafio = `Vez do jogador ${turno}`
        fill(255, 255, 255, 230)
        strokeWeight(0)
        textSize(this.largura * 0.02)
        textAlign(CENTER, CENTER)
        text(textoDesafio, width / 2, height / 2 + this.altura / 1.7)
        pop()
    }

    exibir_placar(configuracoesJogo) {
        push()

        rectMode(CENTER)
        fill("#393993")
        stroke(255)
        strokeWeight(2)

        rect(width / 2, height / 2, this.largura * 0.5, this.altura * 0.6)

        //escrever a mensagem
        fill(255, 255, 255, 230)
        strokeWeight(0)
        textAlign(CENTER, CENTER)

        textSize(this.largura * 0.03)
        text("ORDEM DE CHEGADA:", width / 2, height / 2 - this.largura * 0.05)

        textSize(this.largura * 0.025)
        for (let n = 0; n < configuracoesJogo.qtdJogadores - 1; n++) {
            let texto = `${n + 1}º.     Pontuação: ${configuracoesJogo.ordemChegada[n].pontuacao}`
            text(texto, width / 2, height / 2 + this.largura * 0.055 * n)
            configuracoesJogo.ordemChegada[n].desenhar_jogador_placar(this, width / 2 - this.largura * 0.065, height / 2 - this.largura * 0.01 + this.largura * 0.055 * n)
        }

        pop()
    }

    exibir_duelo(jogadorTurnoAtual, jogadorCasaOcupada) {
        push()
        //desenhar quadro com o desafio
        fill(12, 54, 32, 230)
        stroke(255)
        strokeWeight(this.larguraBorda)
        rectMode(CENTER)
        rect(width / 2, height / 2, this.largura * 0.7, this.altura * 0.3)

        //escrever a mensagem
        let textoDesafio = `Jogador ${jogadorTurnoAtual.numero} caiu na casa ocupada pelo jogador ${jogadorCasaOcupada.numero} \ndeverão realizar um duelo!`
        fill(255, 255, 255, 230)
        strokeWeight(0)
        textSize(this.largura * 0.025)
        textAlign(CENTER, CENTER)
        text(textoDesafio, width / 2, height / 2)

        let vezJogador;
        if (qtdGirosDado == 0) {
            vezJogador = jogadorTurnoAtual.numero;
        } else if (qtdGirosDado == 1) {
            vezJogador = jogadorCasaOcupada.numero;
        } else {
            vezJogador = undefined
        }

        fill("yellow")
        textSize(this.largura * 0.02)
        strokeWeight(1)
        stroke(0)
        let textoDesafio2 = `Vez do jogador ${vezJogador} lançar o dado!`
        text(textoDesafio2, width / 2, height / 1.8)

        pop()
    }

    exibir_console_lateral() {
        push()
        //desenhar quadro com o desafio
        fill("#185c37")
        stroke(255)
        strokeWeight(this.larguraBorda)
        rectMode(CENTER)

        if (width >= 1280) {
            //exibir o console na lateral
            rect(width / 2 - this.largura / 2 - this.largura * 0.2 / 1.4, height / 2 - this.altura / 2 + this.altura * 0.25 / 2, this.largura * 0.25, this.altura * 0.25)
        } else {
            //exibir o console embaixo
            rect(width / 2, height / 2 + this.altura / 1.25, this.largura * 0.25, this.altura * 0.25)
        }

        //escrever a mensagem
        fill(255, 255, 255, 230)
        strokeWeight(0.5)
        textSize(this.largura * 0.018)

        if (width >= 1280) {
            text("CONSOLE", width / 2 - this.largura / 2 - this.largura * 0.2 / 1.4, height / 2 - this.altura / 2 + this.altura * 0.25 / 4.5)
        } else {
            text("CONSOLE", width / 2, height / 2 + this.altura / 1.35)
        }

        strokeWeight(0)
        textSize(this.largura * 0.015)
        textAlign(CENTER, CENTER)

        if (width >= 1280) {
            text(this.textoConsoleLateral, width / 2 - this.largura / 2 - this.largura * 0.2 / 1.4, height / 2 - this.altura / 2 + this.altura * 0.25 / 1.8)
        } else {
            text(this.textoConsoleLateral, width / 2, height / 2 + this.altura / 1.23)
        }

        pop()
    }
}

class Casa {

    constructor(larguraTabueleiro, alturaTabuleiro, numero) {
        this.largura = larguraTabueleiro / 12;
        this.altura = alturaTabuleiro / 10;
        this.posicaoX = 0;
        this.posicaoY = 0;
        this.larguraBorda = 1;
        this.corBorda = 255;
        this.corFundo = "#185c37"
        this.numero = numero;
        this.tamanhoFonte = this.largura * 0.3;
        this.isDesafio = false
        this.textoDesafio = ""
        this.desafioDadoMaiorQue = 0
        this.desafioDadoMenorQue = 0
        this.desafioVoltarCasasQtd = 0
    }

    desenhar_casa(posicaoX, posicaoY) {
        push()

        //Desenhar retangulo
        fill(this.corFundo);
        stroke(this.corBorda);
        strokeWeight(this.larguraBorda);
        rectMode(CENTER);
        rect(posicaoX, posicaoY, this.largura, this.altura);

        //Desenhar texto interno
        strokeWeight(0)
        fill(255)
        textAlign(CENTER, CENTER)
        textSize(this.tamanhoFonte)
        text(this.numero, posicaoX, posicaoY)

        //Atribuir valores para a posicao da casa com base no tabuleiro
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;

        pop()
    }

    resolver_desafio(jogador, valorDado, tabuleiro) {
        if (valorDado > this.desafioDadoMaiorQue && valorDado < this.desafioDadoMenorQue) {
            tabuleiro.textoConsoleLateral = `Jogador ${jogador.numero} passou\nno desafio e permaneceu\nno mesmo lugar.`
        } else {
            jogador.posicao -= this.desafioVoltarCasasQtd
            tabuleiro.textoConsoleLateral = `Jogador ${jogador.numero} perdeu\no desafio e voltou\n${this.desafioVoltarCasasQtd} casas.`
        }
        desafioAberto = false
        console.log("Valor dado desafio: ", valorDado)
    }
}

class Jogador {

    constructor() {
        this.numero = 0
        this.nome = ""
        this.cor = ""
        this.tamanhoBase = ""
        this.posicao = 0
        this.posicaoCirculoX = ""
        this.posicaoCirculoY = ""
        this.circuloLargura = ""
        this.pontuacao = 100
        this.estado = ""
    }

    desenhar_jogador(objetoCasa) {
        push()

        rectMode(CENTER)
        fill(this.cor)
        stroke(255)
        strokeWeight(2)

        //Formato do jogador
        this.posicaoCirculoX = objetoCasa.posicaoX
        this.posicaoCirculoY = objetoCasa.posicaoY - objetoCasa.altura * 0.2
        this.circuloLargura = objetoCasa.altura * 0.4
        triangle(this.posicaoCirculoX, this.posicaoCirculoY, this.posicaoCirculoX - this.circuloLargura / 2, this.posicaoCirculoY + this.circuloLargura * 1.5, this.posicaoCirculoX + this.circuloLargura / 2, this.posicaoCirculoY + this.circuloLargura * 1.5)
        ellipse(this.posicaoCirculoX, this.posicaoCirculoY, this.circuloLargura, this.circuloLargura);

        //Texto do numero do jogador
        textAlign(CENTER, CENTER)
        fill(255)
        strokeWeight(0)
        text(this.numero, this.posicaoCirculoX, this.posicaoCirculoY)

        pop()
    }

    desenhar_jogador_placar(tabuleiro, posicaoX, posicaoY) {
        push()

        rectMode(CENTER)
        fill(this.cor)
        stroke(255)
        strokeWeight(2)

        //Formato do jogador
        this.posicaoCirculoX = posicaoX
        this.posicaoCirculoY = posicaoY
        this.circuloLargura = tabuleiro.altura / 10 * 0.3
        triangle(this.posicaoCirculoX, this.posicaoCirculoY, this.posicaoCirculoX - this.circuloLargura / 2, this.posicaoCirculoY + this.circuloLargura * 1.5, this.posicaoCirculoX + this.circuloLargura / 2, this.posicaoCirculoY + this.circuloLargura * 1.5)
        ellipse(this.posicaoCirculoX, this.posicaoCirculoY, this.circuloLargura, this.circuloLargura);

        //Texto do numero do jogador
        textAlign(CENTER, CENTER)
        fill(255)
        strokeWeight(0)
        textSize(this.circuloLargura * 0.8)
        text(this.numero, this.posicaoCirculoX, this.posicaoCirculoY)

        pop()
    }


    mover_jogador(valorDado) {

        //So move o jogador se nao houver um desafio ou um duelo em aberto
        if (!desafioAberto) {
            if (this.posicao + valorDado <= 46) {
                if (this.posicao == 0) {
                    if (valorDado == 6) {
                        this.posicao = 1
                    }
                } else {
                    this.posicao += valorDado
                }
            }
        }

        if (this.posicao == 46) {
            this.estado = "chegou"
        }

        //Decrementa um valor da pontuacao a cada jogada
        this.pontuacao--
    }

    exibir_indicador_turno() {
        //triangulo
        fill(255)
        triangle(this.posicaoCirculoX, this.posicaoCirculoY - this.circuloLargura * 0.8, this.posicaoCirculoX - this.circuloLargura / 2, this.posicaoCirculoY - this.circuloLargura * 2, this.posicaoCirculoX + this.circuloLargura / 2, this.posicaoCirculoY - this.circuloLargura * 2)
        //numero
        fill(this.cor)
        strokeWeight(1)
        stroke(this.cor)
        textAlign(CENTER, CENTER)
        text(this.numero, this.posicaoCirculoX, this.posicaoCirculoY - this.circuloLargura * 1.5)
    }

    // confere se existe algum jogador ja a ocupar a casa para qual this.jogador irá se mover
    conferir_posicao_jogadores(jogador) {

        //retorna true se a casa atual for um desafio
        let casaIsDesafio = [2, 7, 11, 17, 21, 26, 28, 37, 40, 45, 46].includes(this.posicao)

        // confere se nao está a comparar o jogador com ele mesmo e se a casa nao é um desafio
        if (jogador.numero != this.numero && !casaIsDesafio && this.posicao != 0) {
            if (jogador.posicao == this.posicao) {
                return true
            }
        } return false
    }

    resolver_duelo(jogadorTurnoAtual, jogadorCasaOcupada, valorDado1, valorDado2, tabuleiro) {

        if (qtdGirosDado < 1) {
            qtdGirosDado++
        } else {
            qtdGirosDado = 0
            dueloAberto = false

            // comparar valores dos dados de cada jogador
            if (valorDado1 > valorDado2) {
                jogadorCasaOcupada.posicao = 0
                tabuleiro.textoConsoleLateral = `Jogador ${jogadorTurnoAtual.numero} venceu o duelo\npor ${valorDado1} a ${valorDado2} e o jogador ${jogadorCasaOcupada.numero} voltou\nao início.`
            }
            else if (valorDado1 == valorDado2) {
                jogadorTurnoAtual.posicao = 0
                tabuleiro.textoConsoleLateral = `Jogador ${jogadorCasaOcupada.numero} venceu o duelo\npelo empate de ${valorDado2} a ${valorDado1} e o jogador ${jogadorTurnoAtual.numero}\nvoltou ao início.`
            }
            else if (valorDado1 < valorDado2) {
                jogadorTurnoAtual.posicao = 0
                tabuleiro.textoConsoleLateral = `Jogador ${jogadorCasaOcupada.numero} venceu o duelo\npor ${valorDado2} a ${valorDado1} e o jogador ${jogadorTurnoAtual.numero} voltou\nao início.`
            }

        }
    }

}

class Jogo {

    constructor() {
        this.qtdJogadores = "";
        this.ordemChegada = [];
    }

    adicionar_jogador_lista_chegada(jogador) {
        if (!this.ordemChegada.includes(jogador)) {
            this.ordemChegada.push(jogador)
        }
    }

    confere_terminou() {
        if (this.ordemChegada.length == this.qtdJogadores - 1) {
            return true;
        } else {
            return false;
        }
    }

}

class InputText {
    constructor(posX, posY, largura, altura) {
        this.posX = posX;
        this.posY = posY;
        this.largura = largura;
        this.altura = altura;
        this.textoLabel = "";
        this.input = createInput('');
        this.input.size(this.largura, this.altura);
    }

    desenhar_input(textoLabel) {
        this.textoLabel = textoLabel;
        this.input.position(this.posX, this.posY);
        push();
        textSize(this.largura * 0.04); //mudar
        fill("white");
        text(this.textoLabel, this.posX, this.posY - this.altura * 0.13);
        pop();
    }

    destruir_input() {
        if (this.input) {
            this.input.remove();
            this.input = null;
        }
    }
}