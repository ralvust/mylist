const client = require('../database/connection');

const ItemController = {
  list: async (req, res) => {
    const { listId } = req.params;
    try {
      const lists = await client('lists');
      if ( lists.includes(listId) ) {
        const items = await client.get(listId);
        return res.json(items);
      } else {
        return res.staus(400).json({ message: 'List does not exists.' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    const { name, type, qty } = request.body;
    const { listId } = req.params;

    try {
      const lists = await client('lists');
      if ( lists.includes(listId) ) {
        const items = await client.get(listId);

        if ( type in items ) {
          items[type].push({
            name: name,
            qty: qty,
          });
        } else {
          items[type] = [{
            name: name,
            qty: qty,
          }];
        }

        client.set(listId, items);
        return res.json({ message: 'Item included successfully.' });
      } else {
        return res.staus(400).json({ message: 'List does not exists.' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const { name, type, qty } = request.body;
    const { listId } = req.params;

    try {
      const lists = await client('lists');
      if ( lists.includes(listId) ) {
        const items = await client.get(listId);
        if ( type in items ) {
          const updatedItems = items[type].filter(item => item.name !== name);
          client.set(listId, updatedItems);
          return res.json({ message: "Item deleted successfully" });
        } else {
          return res.status(400).json({ message: 'Type does not exists on this list.' });
        }
      } else {
        return res.staus(400).json({ message: 'List does not exists.' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = ItemController;