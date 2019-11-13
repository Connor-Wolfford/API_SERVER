let express = require('express')
let app = express()
let user = require('./controllers/usercontroller')
let album = require('./controllers/albumcontroller')
let sequelize = require('./db')

sequelize.sync()
app.use(express.json())

app.use(require('./midddleware/headers'))

app.use('/user', user)
app.use('/album', album)

app.listen(3000, function(){
    console.log('Ask me who Joe is.')
})