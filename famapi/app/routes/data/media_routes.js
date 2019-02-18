var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    const collection = 
    app.post('/media', (req, res) => {
      const media = { type: req.body.type, title: req.body.title, url: req.body.url };
      db.collection('media').insert(media, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
    app.put('/media/:id', (req, res) => {
      console.log(req.params.id );
      const id = req.params.id;
      const mediaquery = { '_id': new ObjectID(id ) };
      var newmedia = {$set: { url: req.body.url} }
      db.collection('media').findOneAndUpdate(mediaquery,newmedia,function(err, dbres){
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
            //db.close();
            //console.log(dbres.modifiedCount);
            let repobj = Object.assign(dbres.value,newmedia.$set);
           
            //let cresp = {'old':dbres.value,'new':repobj}
            res.send(dbres.value);
            //res.send({'status':'success'});
        }
      });
    });
    app.get('/media/:id', (req, res) => {
        console.log(req.params.id );
        const mediaid = req.params.id;
        const mediadetails = { '_id': new ObjectID(mediaid ) };
        db.collection('media').findOne(mediadetails, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
              res.send(item);
          }
        });
      });
  };