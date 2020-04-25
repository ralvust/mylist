const redis = require('redis');
const connection = redis.createClient({
  host: 'redis-server',
  port: 6379
});

const client = {
  set: (id, obj) => {
    connection.set(id, JSON.stringify(obj));
  },
  get: id => {
    return new Promise((resolve, reject) => {
      connection.get(id, (err, obj) => {
        if (err) return reject(err);
        return resolve(JSON.parse(obj));
      });
    });
  },
  del: id => {
    return new Promise((resolve, reject) => {
      connection.del(id, (err, success) => {
        if (err) return reject(err);
        if (success) {
          return resolve();
        }
        return reject();
      });
    });
  }
}

module.exports = client;