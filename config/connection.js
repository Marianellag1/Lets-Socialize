const { connect, connection } = require('mongoose');
//accessing videos and responses
connect('mongodb://localhost/socialize', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
