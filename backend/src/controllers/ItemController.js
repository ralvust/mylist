const redis = require('redis');
const connection = redis.createClient({
  host: 'redis-server',
  port: 6379
});

connection.set('list', JSON.stringify({})); 

const ItemController = {
  listItems: (request, response) => {
    connection.get('list', (error, result) => {
      if (!error) {
        return response.json(JSON.parse(result));        
      }
    });
  },

  addItem: (request, response) => {
    const { name, type, qty } = request.body;
    connection.get('list', (error, result) => {
      if (error) 
        return response.status(500).json({ message: 'Algo de errado não está certo.' });

      const itemsList = JSON.parse(result);
      if (type in itemsList){
        itemsList[type].push({
          name: name,
          qty: qty,
        });
      } else {
        itemsList[type] = [{
          name: name,
          qty: qty,
        }];
      } 
      connection.set('list', JSON.stringify(itemsList));

      return response.json({ message: 'Item adicionado com sucesso.' });
    });
  },

  removeItem: (request, response) => {
    const { name, type } = request.body;
    connection.get('list', (error, result) => {
      if (error)
        return response.status(500).json({ message: 'Algo de errado não está certo.' });

      const itemsList = JSON.parse(result);
      if (type in itemsList) {
        itemsList[type].filter(item => item.name !== name);
        connection.set('list', JSON.stringify(itemsList));
        return response.json({ message: 'Item deletado.' });
      }
      return response.status(400).json({ message: 'Item nao existe.' });
    });
  }
};

module.exports = ItemController;