const dbModal = require('./teamModel');
const router = require('express').Router();
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);
// get all teams for an organization
router.get('/', (req, res) => {});
//get a team by id
router.get('/:id', (req, res) => {});
//add a team  to a organization
router.post('/', (req, res) => {});
//delete a team
router.delete('/:id', (req, res) => {});
//update team
router.put('/:id', (req, res) => {});

module.exports = router;
