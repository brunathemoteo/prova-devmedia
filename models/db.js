const Sequelize = require('sequelize')

 // Conexao com o banco de dados
 const sequelize = new Sequelize ('dbnoticias', 'root', 'root123',{
    host: "localhost",
    dialect: 'mysql',
    query:{raw:true}
})
console.log('conectado ao bd com sucesso')
// exportando sequelize e Sequelize

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}