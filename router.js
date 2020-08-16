const Decision = require('./controllers/decisions');
// To call the decision contollers for relative path /api/decision

module.exports = function(app) {
    app.post('/api/decision', Decision.check);
  }
  