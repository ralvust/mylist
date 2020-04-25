const express = require('express');
const cors = require('cors');

const app = express();

const router = express.Router();

const ItemController = require('./controllers/ItemController');

app.use(cors());
app.use(express.json());

router.post('/item', ItemController.addItem);
router.get('/item', ItemController.listItems);
router.delete('/item', ItemController.removeItem);

app.use(router);

app.listen(3333);