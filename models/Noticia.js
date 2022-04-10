const db = require('./db')

const Noticia = db.sequelize.define('noticias',{
    tituloNoticia: {
        type: db.Sequelize.STRING
    },
    categoriaNoticia: {
        type: db.Sequelize.STRING
    },
    conteudoNoticia: {
        type: db.Sequelize.TEXT
    }
})

module.exports = Noticia

//Noticia.sync({force: true})