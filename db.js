const Sequelize = require('sequelize')

const sequelize = new Sequelize('Records_Blue', 'postgres', 'password'/*process.env.PASS*/, {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function() {
        console.log('Connected to Database')
    },
    function(err){
        console.log(err)
    }
)

module.exports = sequelize