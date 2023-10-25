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

//Rotas para envio de dados para a base de dados
//Salvar dados da partida
app.post('/enviarDados', async (req, res) => {
    const data = req.body; // dados enviados pelo sketch.js

    let sql = `INSERT INTO dados_rodada (jogador, posicao, pontuacao, dadoAtual, turnoJogador) VALUES (${data.jogador}, ${data.posicao}, ${data.pontuacao}, ${data.dadoAtual}, ${data.turnoJogador});`

    db.query(sql, function (err) {
        if (err) {
            console.log("Erro ao salvar na base de dados: ", err)
            throw err;
        } else {
            console.log("Dados salvos na base de dados: ", req.body);
        }
    });

    res.status(200).json({ ok: 200 })
})

//Salvar dados da nova conta
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


//criar rota get com select da base de dados, essa rota será chamada na sketch
app.get('/getBaseDadosPartida', (req, res) => {
    let sql = "SELECT * FROM dados_rodada";
    db.query(sql, (err, resultado) => {
        if (err) throw err;
        //console.log(res);
        res.send(resultado)
    })
})

//--------------------------------------------

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})