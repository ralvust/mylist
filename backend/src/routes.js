const express = require('express');

const ItemController = require('./controllers/ItemController');
const ListController = require('./controllers/ListController');

const router = express.Router();

router.get('/list/:listId/items', ItemController.list);
router.post('/list/:listId/item', ItemController.create);
router.delete('/list/:listId/item', ItemController.delete);

router.get('/list', ListController.list);
router.post('/list', ListController.create);
router.delete('/list', ListController.delete);

module.exports = router;