//Conferir se o mouse está em cima de uma dada área
function isHover(xMaiorQue, xMenorQue, yMaiorQue, yMenorQue) {
    if (mouseX > xMaiorQue && mouseX < xMenorQue) {
        if (mouseY > yMaiorQue && mouseY < yMenorQue) {
            return true;
        }
    }
    return false;
}

//Desenhar borda da tela do jogo
function createScreenBorder() {
    push();
    fill(255, 255, 255, 0);
    stroke(255);
    strokeWeight(5);
    rectMode(CENTER);
    rect(width/2, height * 0.5, width, height);
    pop();
}

//Configuracoes das casas do jogo
function configurarCasas() {

    // Configuracoes gerais das casas
    casa[0].largura += casa[0].largura * 0.5
    casa[0].numero = "Início";
    casa[46].numero = "Fim"
    casa[2].corFundo = "#e3a549";
    casa[7].corFundo = "#e3a549";
    casa[11].corFundo = "#e3a549";
    casa[17].corFundo = "#e3a549";
    casa[21].corFundo = "#e3a549";
    casa[26].corFundo = "#e3a549";
    casa[28].corFundo = "#e3a549";
    casa[37].corFundo = "#e3a549";
    casa[40].corFundo = "#e3a549";
    casa[45].corFundo = "#e3a549";

    // Definir que as casas sao desafios
    casa[2].isDesafio = true;
    casa[7].isDesafio = true;
    casa[11].isDesafio = true;
    casa[17].isDesafio = true;
    casa[21].isDesafio = true;
    casa[26].isDesafio = true;
    casa[28].isDesafio = true;
    casa[37].isDesafio = true;
    casa[40].isDesafio = true;
    casa[45].isDesafio = true;

    //Definir os desafios e a punicao de cada casa
    casa[2].desafioDadoMaiorQue = 2
    casa[2].desafioDadoMenorQue = 5
    casa[2].desafioVoltarCasasQtd = 1

    casa[7].desafioDadoMaiorQue = 1
    casa[7].desafioDadoMenorQue = 4
    casa[7].desafioVoltarCasasQtd = 4

    casa[11].desafioDadoMaiorQue = 3
    casa[11].desafioDadoMenorQue = 6
    casa[11].desafioVoltarCasasQtd = 5

    casa[17].desafioDadoMaiorQue = 0
    casa[17].desafioDadoMenorQue = 4
    casa[17].desafioVoltarCasasQtd = 9

    casa[21].desafioDadoMaiorQue = 2
    casa[21].desafioDadoMenorQue = 5
    casa[21].desafioVoltarCasasQtd = 5

    casa[26].desafioDadoMaiorQue = 1
    casa[26].desafioDadoMenorQue = 5
    casa[26].desafioVoltarCasasQtd = 8

    casa[28].desafioDadoMaiorQue = 2
    casa[28].desafioDadoMenorQue = 6
    casa[28].desafioVoltarCasasQtd = 27

    casa[37].desafioDadoMaiorQue = 3
    casa[37].desafioDadoMenorQue = 7
    casa[37].desafioVoltarCasasQtd = 10

    casa[40].desafioDadoMaiorQue = 1
    casa[40].desafioDadoMenorQue = 3
    casa[40].desafioVoltarCasasQtd = 10

    casa[45].desafioDadoMaiorQue = 3
    casa[45].desafioDadoMenorQue = 7
    casa[45].desafioVoltarCasasQtd = 16


    //Definir os textos de cada casa
    casa[2].textoDesafio = `Gire o dado e tire um numero entre ${casa[2].desafioDadoMaiorQue} e ${casa[2].desafioDadoMenorQue} ou volte ${casa[2].desafioVoltarCasasQtd} casas.`
    casa[7].textoDesafio = `Gire o dado e tire um numero entre ${casa[7].desafioDadoMaiorQue} e ${casa[7].desafioDadoMenorQue} ou volte ${casa[7].desafioVoltarCasasQtd} casas.`
    casa[11].textoDesafio = `Gire o dado e tire um numero entre ${casa[11].desafioDadoMaiorQue} e ${casa[11].desafioDadoMenorQue} ou volte ${casa[11].desafioVoltarCasasQtd} casas.`
    casa[17].textoDesafio = `Gire o dado e tire um numero entre ${casa[17].desafioDadoMaiorQue} e ${casa[17].desafioDadoMenorQue} ou volte ${casa[17].desafioVoltarCasasQtd} casas.`
    casa[21].textoDesafio = `Gire o dado e tire um numero entre ${casa[21].desafioDadoMaiorQue} e ${casa[21].desafioDadoMenorQue} ou volte ${casa[21].desafioVoltarCasasQtd} casas.`
    casa[26].textoDesafio = `Gire o dado e tire um numero entre ${casa[26].desafioDadoMaiorQue} e ${casa[26].desafioDadoMenorQue} ou volte ${casa[26].desafioVoltarCasasQtd} casas.`
    casa[28].textoDesafio = `Gire o dado e tire um numero entre ${casa[28].desafioDadoMaiorQue} e ${casa[28].desafioDadoMenorQue} ou volte ${casa[28].desafioVoltarCasasQtd} casas.`
    casa[37].textoDesafio = `Gire o dado e tire um numero entre ${casa[37].desafioDadoMaiorQue} e ${casa[37].desafioDadoMenorQue} ou volte ${casa[37].desafioVoltarCasasQtd} casas.`
    casa[40].textoDesafio = `Gire o dado e tire um numero entre ${casa[40].desafioDadoMaiorQue} e ${casa[40].desafioDadoMenorQue} ou volte ${casa[40].desafioVoltarCasasQtd} casas.`
    casa[45].textoDesafio = `Gire o dado e tire um numero entre ${casa[45].desafioDadoMaiorQue} e ${casa[45].desafioDadoMenorQue} ou volte ${casa[45].desafioVoltarCasasQtd} casas.`
}

function confereDesafio(jogador, casa, tabuleiro, logo) {
    if (casa.isDesafio) {
        logo.desenhar_logo();
        push()
        fill(tabuleiro.cor)
        stroke(tabuleiro.corBorda)
        strokeWeight(tabuleiro.larguraBorda)
        rectMode(CENTER)
        rect(width / 2, height / 2, tabuleiro.largura, tabuleiro.altura)

        fill(255)
        strokeWeight(0)
        textSize(20)
        let textoDesafio = `Jogador ${jogador} caiu no desafio da casa ${casa.numero}:\n${casa.textoDesafio}`
        textAlign(CENTER, CENTER)
        text(textoDesafio, width / 2, height / 2)
        pop()
        logo.desenhar_logo()
    }
}

function gerirTurno(qtdJogadores) {
    turnoJogador += 1
    if(turnoJogador > qtdJogadores){
        turnoJogador = 1
    }
}

function confereChegada(jogo, listaJogadores){
    //os jogadores possuem um atributo "finalizou"
}

//Desenhar todas as casas do jogo
function desenharTodasAsCasas() {

    //Casa numero 0
    casa[0].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[0].largura, height / 2 + tabuleiro.altura / 2 - casa[0].altura / 2 - casa[0].altura * 0)

    //Casas numero 1 a 8
    for (var x = 1; x <= 8; x++) {
        casa[x].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[x].largura * 1.5, height / 2 + tabuleiro.altura / 2 - casa[x].altura / 2 - casa[x].altura * x)
    }

    //Casas numero 9 a 17
    for (var y = 1; y <= 9; y++) {
        casa[y + 8].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[y + 8].largura * 1.5 + casa[y + 8].largura * y, height / 2 + tabuleiro.altura / 2 - casa[y + 8].altura / 2 - casa[y + 8].altura * 8)
    }

    //Casa numero 18
    casa[18].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[18].largura * 1.5 + casa[18].largura * 9, height / 2 + tabuleiro.altura / 2 - casa[18].altura / 2 - casa[18].altura * 7)

    //Casas numero 19 a 26
    for (var j = 1; j < 9; j++) {
        casa[27 - j].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[27 - j].largura * 1.5 + casa[27 - j].largura + casa[27 - j].largura * j, height / 2 + tabuleiro.altura / 2 - casa[27 - j].altura / 2 - casa[27 - j].altura * 6)
    }

    //Casa numero 27
    casa[27].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[27].largura * 1.5 + casa[27].largura * 2, height / 2 + tabuleiro.altura / 2 - casa[27].altura / 2 - casa[27].altura * 5)

    //Casas numero 28 a 35
    for (var n = 1; n <= 8; n++) {
        casa[n + 27].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[n + 27].largura * 1.5 + casa[n + 27].largura + casa[n + 27].largura * n, height / 2 + tabuleiro.altura / 2 - casa[n + 27].altura / 2 - casa[n + 27].altura * 4)
    }

    //Casa numero 36
    casa[36].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[36].largura * 1.5 + casa[36].largura * 9, height / 2 + tabuleiro.altura / 2 - casa[36].altura / 2 - casa[36].altura * 3)

    //Casas numero 37 a 44
    for (var m = 1; m < 9; m++) {
        casa[45 - m].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[45 - m].largura * 1.5 + casa[45 - m].largura + casa[45 - m].largura * m, height / 2 + tabuleiro.altura / 2 - casa[45 - m].altura / 2 - casa[45 - m].altura * 2)
    }

    //Casas numero 45 e 46
    for (var a = 1; a >= 0; a--) {
        casa[46 - a].desenhar_casa(width / 2 - tabuleiro.largura / 2 + casa[46 - a].largura * 1.5 + casa[46 - a].largura * 2, height / 2 + tabuleiro.altura / 2 - casa[46 - a].altura / 2 - casa[46 - a].altura * a)
    }

}