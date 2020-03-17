const dbModal = require('./teamMembersModel');
const router = require('express').Router();
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);
// get all team-members for a team Id
router.get('/', (req, res) => {});
//get a team-member  by id
router.get('/:id', (req, res) => {});

//delete a team-member
router.delete('/:id', (req, res) => {});
//update team-member
router.put('/:id', (req, res) => {});

module.exports = router;
