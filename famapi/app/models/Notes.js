const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const NotesSchema = new Schema({
    text: String,
    title: String
  });

  NotesSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    text: this.text,
    title: this.title,
  };
};

mongoose.model('Notes', NotesSchema);