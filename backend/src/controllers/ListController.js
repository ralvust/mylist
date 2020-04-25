const client = require('../database/connection');
const moment = require('moment');

client.set('lists', []); // Create an empty list

const ListController = {
  list: async (req, res) => {
    try {
      const lists = await client.get('lists');
      return res.json(lists);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    const listId = moment().format('DD:MM:AA hh:mm:ss');
    try {
      const lists = await client.get('lists');
      if ( ! lists.includes(listId) ) {
        lists.push(listId);
        client.set('lists', lists);
        client.set(listId, {});

        return res.json({
          message: 'List created successfully',
          listId: listId
        });
      } else {
        return res.status(400).json({ message: 'List exists already.' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const { listId } = req.body;

    try {
      const lists = await client.get('lists');
      if ( lists.include(listId) ) {
        const updatedLists = lists.filter(list => list !== listId);
        client.set('lists', updatedLists);

        await client.del(listId);
        return res.json({
          message: 'List deleted successfully'
        });
      } else {
        return res.status(400).json({ message: 'List does not exists' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = ListController;