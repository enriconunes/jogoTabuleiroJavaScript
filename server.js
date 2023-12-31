const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const port = 3000

// Configuração do servidor para receber json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// Configuracao de seguranca do navegador
app.use(cors());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lucky_maze'
});

db.connect((err) => {
    if (err) {
        console.log('Erro ao se conectar à base de dados!');
        throw err;
    }
    console.log('Conectado à base de dados MySQL');
});


app.use(express.static('public'))

//Atualizar dados da partida no banco de dados
app.post('/updadeDadosPartida', async (req, resposta) => {
    const data = req.body; // dados enviados pelo sketch.js

    let sqlUpdate = `UPDATE dados_rodada SET dado_atual = ${data.dadoAtual}, turno_atual = ${data.turno_atual}, mensagem_console = "${data.mensagem_console}", desafio_aberto = ${data.desafio_aberto}, duelo_aberto = ${data.duelo_aberto}, jogador_duelado = ${data.jogadorCasaOcupada}, jogador_desafiador = ${data.jogadorDesafiador}, qtd_giros_dado_duelo = ${data.qtdGirosDadoDesafio}, terminou = ${data.jogoTerminou}, lista_chegada = "${data.listaOrdemChegada.join(', ')}" WHERE id_sala = "${data.idSalaAtual}";`
    db.query(sqlUpdate, (err, res) => {
        if (err) {
            throw err;
        } else {
            //Apos fazer update dos valores gerais da partida (valores que servem para todos os jogadores),
            //Atualizar tambem os dados do jogador atual
            let sqlUpdateJogador = `UPDATE dados_rodada SET posicao = ${data.posicao}, pontuacao = ${data.pontuacao}, chegou = ${data.chegou} WHERE id_sala = ${data.idSalaAtual} AND num_atribuido = ${data.numeroJogadorLogado};`

            db.query(sqlUpdateJogador, (err, res) => {
                if (err) {
                    throw err;
                } else{

                    //Apos fazer update dos valores do jogador logado, atualizar valor da posicao do oponente do duelo
                    //Se nao fizer esse update, a posicao so é alterada no jogo do jogador logado e nao será salvo na DB
                    //Ao fazer uma nova requisicao dos dados, ele terá o valor anterior (nao terá se movido)
                    let sqlUpdateJogadorDuelado = `UPDATE dados_rodada SET posicao = ${data.jogadorCasaOcupadaNovaPosicao} WHERE id_sala = ${data.idSalaAtual} AND num_atribuido = ${data.jogadorCasaOcupada + 1};`

                    db.query(sqlUpdateJogadorDuelado, (err, res) => {
                        if (err){
                            throw err;
                        }
                    })

                    //atualizar valor do jogador que iniciou o duelo
                    let sqlUpdateJogadorDesafiador = `UPDATE dados_rodada SET posicao = ${data.jogadorDesafiadorNovaPosicao} WHERE id_sala = ${data.idSalaAtual} AND num_atribuido = ${data.jogadorDesafiador+1};`

                    db.query(sqlUpdateJogadorDesafiador, (err, res) => {
                        if (err) {
                            throw err;
                        }
                    })

                    resposta.status(200).json({ status: "Update feito com sucesso!" });
   
                }
            })       
        }
    })
})

//Rota criar nova conta - salvar banco de dados
app.post('/criarConta', async (req, res) => {
    const data = req.body; // dados enviados pelo sketch.js

    //Conferir se o usuário já existe
    let selectQuery = `SELECT username FROM users WHERE username = "${data.username}";`;
    db.query(selectQuery, (err, result) => {
        if (err) {
            res.status(500).json({ status: "Erro no servidor ao verificar o usuário." });
        } else {
            if (result.length > 0) {
                res.status(200).json({ status: "O username inserido já está sendo utilizado!" });
            } else {
                //Inserir usuário na base de dados caso ele não exista
                let insertQuery = `INSERT INTO users (username, pass) VALUES ("${data.username}", "${data.pass}");`;

                db.query(insertQuery, function (err) {
                    if (err) {
                        console.log("Erro ao salvar na base de dados: ", err);
                        res.status(500).json({ status: "Erro no servidor ao criar a conta." });
                    } else {
                        console.log("Nova conta salva na base de dados: ", req.body);
                        res.status(200).json({ status: "Conta criada com sucesso!" });
                    }
                });
            }
        }
    });
});

//Rota para conferir se o login está correto
app.post('/getEfetuarLogin', (req, res) => {

    const data = req.body;

    let sql = `SELECT * FROM users WHERE username = "${data.username}";`
    db.query(sql, (err, resultado) => {
        if (err) throw err;
        // res.send(resultado)

        if (resultado.length > 0) {
            if (resultado[0].pass == data.pass) {
                res.status(200).json({ status: "Login efetuado!", id_user: resultado[0].id, name_user: data.username });
            } else {
                res.status(200).json({ status: "A senha está incorreta!" });
            }
        } else {
            res.status(200).json({ status: "Este username não existe!" });
        }

    })
})

//Rota criar nova sala - salvar no banco de dados
app.post('/criarSala', async (req, res) => {
    const data = req.body; // dados enviados pelo sketch.js

    //Conferir se o usuário já existe
    let selectQuery = `SELECT nome FROM sala WHERE nome = "${data.nomeSala}";`;
    db.query(selectQuery, (err, result) => {
        if (err) {
            res.status(500).json({ status: "Erro no servidor ao verificar a sala." });
        } else {
            if (result.length > 0) {
                res.status(200).json({ status: "Essa sala já existe!" });
            } else {
                //Inserir usuário na base de dados caso ele não exista
                let insertQuery = `INSERT INTO sala (nome, estado) VALUES ("${data.nomeSala}", 1);`;

                db.query(insertQuery, function (err) {
                    if (err) {
                        console.log("Erro ao salvar sala na base de dados: ", err);
                        res.status(500).json({ status: "Erro no servidor ao criar a sala." });
                    } else {
                        console.log("Nova sala salva na base de dados: ", req.body);
                        res.status(200).json({ status: "Sala criada com sucesso!" });
                    }
                });
            }
        }
    });
});

//Rota para o usuario entrar em uma sala
app.post('/entrarSala', (req, resposta) => {

    const data = req.body;

    let sql = `SELECT * FROM sala WHERE nome = "${data.nomeSala}";`
    db.query(sql, (err, resultado) => {
        if (err) {
            throw err;
        } else {

            //Confere se existe uma sala com esse nome
            if (resultado.length > 0) {

                //Conferir se a sala está aberta
                if (resultado[0].estado == "aberta") {
                    if (resultado[0].qtd_users < 4) {

                        //Se a sala tiver menos de 4 jogadores, entao insere o jogador na tabela da sala na coluna correta
                        //e incrementa um valor a qtd_users
                        let sqlUpdate = `UPDATE sala SET id_user_${resultado[0].qtd_users + 1} = ${data.idUserLogin}, qtd_users = ${resultado[0].qtd_users + 1} WHERE nome = "${data.nomeSala}";`
                        db.query(sqlUpdate, (err, res) => {
                            if (err) {
                                throw err;
                            } else {

                                //Apos entrar na sala, adicionar jogador na tabela dados_partida com suas informacoes
                                let sqlInsert = `INSERT INTO dados_rodada (id_user, id_sala, num_atribuido, nome_user) VALUES (${data.idUserLogin}, ${resultado[0].id}, ${resultado[0].qtd_users + 1}, "${data.nomeUserLogin}");`

                                db.query(sqlInsert, (err, res) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        resposta.status(200).json({ status: "Jogador entrou na sala com sucesso!", id_sala: resultado[0].id });
                                    }
                                })
                            }
                        })
                    } else {
                        resposta.status(200).json({ status: "A sala já possui a quantidade máxima de jogadores!" });
                    }
                }
                else if (resultado[0].estado == "iniciada"){
                    resposta.status(200).json({ status: "A partida desta sala já iniciou!" });
                } else{
                    resposta.status(200).json({ status: "Esta sala está fechada!" });
                }

            } else {
                resposta.status(200).json({ status: "Esta sala não existe!" });
            }

        }
    })
})

//Rota retomar sala iniciada
app.post('/retomarSala', (req, res) => {

    const data = req.body;

    let sql = `SELECT * FROM sala WHERE nome = "${data.nomeSala}";`
    db.query(sql, (err, resultado) => {
        if (err) throw err;
        // res.send(resultado)

        if (resultado.length > 0) {
            
            // caso a sala exista, conferir se o jogador está dentro dela
            let sqlQuery = `SELECT * FROM dados_rodada WHERE id_sala = "${resultado[0].id}" AND nome_user = "${data.nomeUserLogin}";`
            db.query(sqlQuery, (err, resultadoDados) => {
                if (err) throw err;

                if (resultadoDados.length > 0){
                    res.status(200).json({ status: "Jogador está na sala!", id_sala: resultado[0].id});
                } else{
                    res.status(200).json({ status: "Jogador não está nessa sala!" });
                }

            })

        } else {
            res.status(200).json({ status: "Esta sala não existe!" });
        }

    })
})

//Criar rota get com select da base de dados, essa rota será chamada na sketch
app.get('/getBaseDadosPartida', (req, res) => {

    //Valor passado como parametro na chamada da rota
    let idSalaAtual = req.query.idSalaAtual;

    let sql = `SELECT * FROM dados_rodada WHERE id_sala = ${idSalaAtual};`
    db.query(sql, (err, resultado) => {
        if (err) throw err;
        //console.log(res);
        res.send(resultado)
    })
})

//Listar todos os jogadores de uma sala
app.get('/getListagemJogadoresSala', (req, res) => {

    //Valor passado como parametro na chamada da rota
    let idSalaAtual = req.query.idSalaAtual;
    let sql = `SELECT * FROM sala WHERE id = "${idSalaAtual}";`
    db.query(sql, (err, resultado) => {
        if (err) throw err;
        
        //Armezena o id dos jogadores no array listaIdJogadores
        let idJogadores = [resultado[0].id_user_1, resultado[0].id_user_2, resultado[0].id_user_3, resultado[0].id_user_4]

        //Buscar o nome de cada jogador a partir do id de cada um deles
        let sqlUsers = `SELECT username FROM users WHERE id IN (${idJogadores[0]}, ${idJogadores[1]}, ${idJogadores[2]}, ${idJogadores[3]});`
        db.query(sqlUsers, (err, resultado) => {
            if (err) throw err;
            // console.log("RESULTADO TABELA USERS:\n", resultado);
            res.send(resultado)
        })
    })
})

app.get('/listagemRanking', (req, res) => {

    let sql = "SELECT nome_user, pontuacao FROM dados_rodada WHERE chegou = 1 ORDER BY pontuacao DESC  LIMIT 10;"

    db.query(sql, (err, resultado) => {
        if (err) throw err;

        res.send(resultado)

    })
})

//Update do estado da sala, passar de 'aberta' para 'inicializada'
app.post('/updateEstadoSala', (req, res) => {

    const data = req.body;

    let sqlUpdate = `UPDATE sala SET estado = "iniciada" WHERE id = "${data.idSalaAtual}";`

    db.query(sqlUpdate, (err, resultado) => {
        if (err) throw err;

        res.status(200).json({ status: "Estado da sala alterado para iniciada!"});

    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})