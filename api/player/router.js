const express = require('express');
const router = express.Router();
const playerService = require('./service');

router.get('/', playerService.getPlayers);
router.get('/:mvp', playerService.getMvpPlayer);
router.delete('/:mvp', playerService.deleteMvpPlayer);
router.post('/', playerService.createPlayer);
router.put('/', playerService.editPlayer);

module.exports = router;
