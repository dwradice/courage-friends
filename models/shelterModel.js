const mongoose = require('mongoose');
const slugify = require('slugify');

const shelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Shelter needs a name'],
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      description: String,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

shelterSchema.virtual('animals', {
  ref: 'Pet',
  foreignField: 'shelter',
  localField: '_id',
});

shelterSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;
