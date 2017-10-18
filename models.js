const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
  name: {type: String},
  active: {type: Boolean},
  age: {type: Number}
});

personSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    active: this.active,
    age: this.age
  };
}

const Person = mongoose.model('Persons', personSchema);

module.exports = {Person};
