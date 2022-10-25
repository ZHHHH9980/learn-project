const express = require('express');

const friendsController = require('../controller/friends.controller');

const friendsRouter = express.Router();

friendsRouter.get('/', friendsController.getFriends);

module.exports = friendsRouter;