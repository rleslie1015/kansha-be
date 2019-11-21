const db = require('../../data/dbConfig')

module.exports={
    findAll,
    findById,
    deleteRec,
    editRec,
    addRec,
    getUserInteractions
}

function findAll(){
    return db('Recognition')
}

function findById(id){
     return db('Recognition')
    .where({id})
}

function deleteRec(id) {
    return db('Recognition')
    .where({id})
    .del()
}

function editRec(id, changes){
    return db('Recognition')
    .where({ id })
    .update(changes)
}

function addRec(obj, id){
    return db('Recognition')
    .insert(obj)
    .then(() => {
        findAll()
    })
}

function getUserInteractions(id) {
    return db('Recognition')
    .where({sender: id})
}