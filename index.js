const express = require('express');
const { engine }  = require('express-handlebars')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Noticia = require('./models/Noticia');
const { or } = require('sequelize');
const Op = Sequelize.Op

const app = express();
app.use('/public', express.static(__dirname + '/public'))

// Config
    // Template Engine
        app.engine('handlebars', engine())
        app.set('view engine', 'handlebars')
        app.set('views', './views')

    // Body Parser (pega dados do formulario)
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

// Rotas

    app.get('/', (req, res) => {
        Noticia.findAll({order: [['id', 'ASC']]}).then(function(posts){
            res.render('home', {posts: posts})
        })
    })

    app.get('/cadastro', (req, res) => {
        res.render('formulario')
    })

    app.post('/add', function(req, res){
        Noticia.create({
            tituloNoticia: req.body.tituloNoticia,
            categoriaNoticia: req.body.categoriaNoticia,
            conteudoNoticia: req.body.conteudoNoticia
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send('Houve um erro: ' + erro)
        })
    })
    
    app.post('/consulta', function(req, res){
        Noticia.findAll({
            where: { 
                [Op.or]: [{ 
                    tituloNoticia: {
                        [Op.like]: `%`+req.body.idconsulta+`%`
                    }
                },
                {
                    categoriaNoticia: 
                        {[Op.like]: `%`+req.body.idconsulta+`%`
                    }
                }    
            ]
        }      
    }).then(function(posts){
            res.render('home', {posts: posts})
        })
    })

    app.get('/deletar/:id', function(req, res){
        Noticia.destroy({where: {'id' : req.params.id}}).then(function(){
            res.send('Noticia deletada com sucesso')
        }).catch(function(erro){
            res.send('Esta notícia nao existe!')
        })
    })

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});