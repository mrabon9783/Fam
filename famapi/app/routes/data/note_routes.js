var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    const collection = 
    app.post('/notes', (req, res) => {
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').insert(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
    app.put('/notes/:id', (req, res) => {
      console.log(req.params.id );
      const id = req.params.id;
      const notequery = { '_id': new ObjectID(id ) };
      var newnote = {$set: { text: req.body.body} }
      db.collection('notes').updateOne(notequery,newnote,function(err, dbres){
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          //db.close();
          res.send({'status':'success'});
        }
      });
    });
    app.get('/notes/:id', (req, res) => {
        console.log(req.params.id );
        const id = req.params.id;
        const details = { '_id': new ObjectID(id ) };
        db.collection('notes').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          }
        });
      });
  };