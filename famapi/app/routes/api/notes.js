const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Notes = mongoose.model('Notes');
var ObjectID = require('mongodb').ObjectID;

router.get('/:id', auth.optional, (req, res) => {
    console.log(req.params.id );
    const id = req.params.id;
    const details = { '_id': new ObjectID(id ) };
    return Notes.findById(id)
        .then((note)=>{
            return res.json({note: note.toAuthJSON()});
        });
    });

router.post('/', auth.optional, (req, res, next) => {
  const { body: { note } } = req;

  if(!note.text) {
    return res.status(422).json({
      errors: {
        text: 'is required',
      },
    });
  }

  
  const finalNote = new Notes(note);


  return finalNote.save()
    .then(() => res.json({ note: finalNote.toAuthJSON() }));
});
module.exports = router;