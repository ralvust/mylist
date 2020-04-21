const express = require('express');

const app = express();

const router = express.Router();

const ItemController = require('./controllers/ItemController');

app.use(express.json());

router.post('/item', ItemController.addItem);
router.get('/item', ItemController.listItems);

app.listen(3333);