const db = require('../../data/dbConfig')

module.exports = {
    findAll,
    findById,
    addUser,
    deleteUser,
    editUser,
    find
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
    .returning("id")
    then((id) => console.log(id))
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

function find(filter) {
    return db('Users')
    .where(filter)

}