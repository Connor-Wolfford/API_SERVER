const router = require('express').Router()
const Album = require('../db').import('../models/album')
const validateSession = require('../midddleware/validate-session')

router.get('/album', (req, res) => res.send('Music'))

router.get('/', (req, res) => {
    Album.findAll()
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({error: err}))
})

router.post('/create', validateSession, (req, res) => {
    const albumFromRequest = {
        albumTitle: req.body.albumTitle,
        artist: req.body.artist,
        numberOfSongs: req.body.numberOfSongs,
        songs: req.body.songs
    }

    Album.create(albumFromRequest)
    .then(album => res.status(200).json(album))
    .catch(err => res.json(req.errors))
})

router.get('/:albumTitle', (req, res) => {
    Album.findOne({ where: {albumTitle: req.params.albumTitle}})
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({ error: err}))
})

router.put('/:id', validateSession, (req, res) => {
    Album.update(req.body, { where: {id: req.params.id}})
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({ error: err}))
})

router.delete('/:id', validateSession, (req, res) => {
    Album.delete({where: {id: req.params.id}})
    .then(Album => res.status(200).json(album))
    .catch(err => res.json({error: err}))
})

module.exports = router