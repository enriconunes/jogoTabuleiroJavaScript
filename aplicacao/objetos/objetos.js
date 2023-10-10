class Logo {
    constructor() {
        this.imagem = logoImg;
        this.posY = 0

        if (width < 800) {
            this.posX = width * 0.5 - width * 0.15
            this.largura = width * 0.3
            this.altura = width * 0.15
        } else {
            this.posX = width * 0.5 - width * 0.1
            this.largura = width * 0.2
            this.altura = width * 0.1
        }
    }

    desenhar_logo() {
        push();
        image(this.imagem, this.posX, this.posY, this.largura, this.altura)
        pop();
    }
}

class Botao {

    constructor(posX, posY, largura, altura, cor) {
        this.corPrimaria = cor;
        this.corVariante = cor;
        this.corHover = 0;
        this.posX = posX;
        this.posY = posY;
        this.largura = largura;
        this.altura = altura;
        this.larguraBorda = 2;
        this.corBorda = 255;
    }

    desenhar_botao() {

        push()

        let hoverBotaoConfig = isHover(this.posX - this.largura / 2, this.posX + this.largura / 2, this.posY - this.altura / 2, this.posY + this.altura / 2)

        if (hoverBotaoConfig) {
            this.corVariante = this.corHover;
            cursor(HAND);
        } else {
            this.corVariante = this.corPrimaria;
        }

        strokeWeight(this.larguraBorda);
        stroke(this.corBorda);
        rectMode(CENTER);
        fill(this.corVariante);
        rect(this.posX, this.posY, this.largura, this.altura);

        pop()

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

    confere_desafio(jogador, casa) {
        if (casa.isDesafio) {
            push()

            //desenhar quadro com o desafio
            fill(this.cor)
            stroke(this.corBorda)
            strokeWeight(this.larguraBorda)
            rectMode(CENTER)
            rect(width / 2, height / 2, this.largura, this.altura)

            //escrever a mensagem
            let textoDesafio = `Jogador ${jogador} caiu no desafio da casa ${casa.numero}:\n${casa.textoDesafio}`
            fill(255)
            strokeWeight(0)
            textSize(20)
            textAlign(CENTER, CENTER)
            text(textoDesafio, width / 2, height / 2)
            pop()
        }
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
}

class Jogador {

    constructor() {
        this.numero = ""
        this.cor = ""
        this.tamanhoBase = ""
        this.posicao = 0
        this.posicaoCirculoX = ""
        this.posicaoCirculoY = ""
        this.circuloLargura = ""
        this.pontuacao = 100
        this.qtdJogadas = 0
        this.jogouDado = ""
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

    mover_jogador(valorDado) {

        if (this.posicao + valorDado <= 46) {
            if (this.posicao == 0) {
                if (valorDado == 6) {
                    this.posicao = 1
                }
            } else {
                this.posicao += valorDado
            }

            this.qtdJogadas += 1
            this.pontuacao -= this.qtdJogadas
        }

        if (this.posicao == 46) {
            this.estado = "finalizou"
        }
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

}

class Jogo {

    constructor() {
        this.qtdJogadores = 0;
    }

}