const { Schema, model } = require('mongoose');

const tripSchema = new Schema(
  {
    tripName: {
      type: String,
      required: 'Please name your collection!',
      minlength: 1,
      maxlength: 280
    },
    category: {
      type: String,
      required: 'Please add a category',
      minlength: 1,
      maxlength: 280
    },
    email: {
      type: String
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

tripSchema.virtual('tripCount').get(function() {
  return this.items.length;
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;