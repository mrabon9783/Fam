const noteRoutes = require('./note_routes');
const mediaRoutes = require('./media_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  mediaRoutes(app, db);
  // Other route groups could go here, in the future
};