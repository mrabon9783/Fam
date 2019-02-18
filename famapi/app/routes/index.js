//const noteRoutes = require('./data/note_routes');
//const mediaRoutes = require('./data/media_routes');

// module.exports = function(app, db) {
//   noteRoutes(app, db);
//   mediaRoutes(app, db);
//   // Other route groups could go here, in the future
// };


const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));
router.use('/mysite', require('./site'));
router.use('/login', require('./login'));
module.exports = router;