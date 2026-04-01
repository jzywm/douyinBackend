const express = require('express');
const router = express.Router();
const videoController = require('../controller/videoController');

/* GET users listing. */
router.get('/', videoController.getVideos);

module.exports = router;
