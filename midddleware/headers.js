module.exports = function(req, res, next){
    res.header('acces-control-allow-origin', '*')
    res.header('acces-control-allow-methods', 'GET, POST, PUT, DELETE')
    res.header('acces-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    next()
}