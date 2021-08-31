const express = require('express');
const router = express.Router();
const playerService = require('./service');

router.get('/', playerService.getPlayers);
router.get('/:final_mvp', playerService.getMvpPlayer);
router.delete('/:final_mvp', playerService.deleteMvpPlayer);
router.post('/', playerService.createPlayer);
router.put('/:id', playerService.editPlayer);

module.exports = router;
