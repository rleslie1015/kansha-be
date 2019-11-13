const router = require('express').Router();
const dbModel = require('./userModel');

router
    .get('/', (req, res) => {
        dbModel.findAll()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    })

router  
    .get('/:id', (req, res) => {
        const {id} = req.params
        
        dbModel.findById(id)
            .then(user => {
                if(!user){
                    res.status(404).json({ message: 'User not found' })
                } else {
                    res.status(200).json(user)
                } 
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })

router 
    .post('/', (req, res) => {
        const {body} = req

        dbModel.addUser(body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })

router  
    .delete('/:id', (req, res) => {
        const {id} = req.params

        dbModel.deleteUser(id)
            .then(() => res.sendStatus(204))
            .catch(err => {
                res.status(500).json(err)
            })
    })

router
    .put('/:id', (req, res) => {
        const {id} = req.params
        const {body} = req

        dbModel.editUser(id, body) 
            .then(user => {
                res.status(200).json(body)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    })

module.exports = router