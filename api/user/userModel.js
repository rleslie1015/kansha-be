const db = require('../../data/dbConfig')

module.exports = {
    findAll,
    findById,
    addUser,
    deleteUser,
    editUser
}

function findAll() {
    return db('Users')
}

function findById(id) {
    return db('Users')
    .where({ id })
}

function addUser(user) {
    return db('Users')
    .insert(user)
}

function deleteUser(id) {
    return db('Users')
    .where({ id })
    .del()
}

function editUser(id, changes) {
    return db('Users')
    .where({ id })
    .update(changes)
}