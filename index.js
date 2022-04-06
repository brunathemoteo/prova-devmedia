const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
// const Noticia = require('./models/Noticia')

// Config
    // Template Engine
        const hbs = handlebars.create({
            defaultLayout: 'main'
        })
        app.engine('handlebars', hbs.engine)
        app.set('view engine', 'handlebars')

    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json)

         // Conexao com o banco de dados
    const sequelize = new Sequelize ('dbnoticias', 'root', 'root123',{
    host: "localhost",
    dialect: 'mysql'
})

// Rotas
    app.get('/cadastro', function(req, res){
        res.render('formulario')
    })

    // app.get('/', function(req, res){
    //     res.render('home')
    // })

    // app.post('/add', function(req, res){
    //     Noticia.create({
    //         tituloNoticia: req.body.tituloNoticia,
    //         categoriaNoticia: req.body.categoriaNoticia,
    //         conteudoNoticia: req.body.conteudoNoticia
    //     }).then(function(){
    //         res.redirect('/')
    //     }).catch(function(erro){
    //         res.send('Houve um erro: ' + erro)
    //     })
    // })


app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});