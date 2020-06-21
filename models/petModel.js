const mongoose = require('mongoose');
const slugify = require('slugify');
const { aggregate } = require('./shelterModel');

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Pet must have a name'],
      trim: true,
      maxlength: [20, 'Name must be less than 20 characters'],
    },
    dob: {
      type: Number,
      required: [true, 'Pet must have a date of birth (approximate)'],
    },
    species: {
      type: String,
      required: [true, 'Must specify species'],
    },
    breed: String,
    sex: {
      type: String,
      required: [true, 'Must specify sex of animal'],
    },
    fixed: {
      type: Boolean,
      required: [true, 'Must specify if animal has been spayed/neutered'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    adopted: {
      type: Boolean,
      default: false,
    },
    shelter: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shelter',
      required: [true, 'Pet must be linked with a Shelter'],
    },
    slug: String,
    photo: {
      type: String,
      default: 'default.jpg',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

petSchema.index({ dob: -1 });

petSchema.virtual('age').get(function (next) {
  var dob = `${this.dob}`;
  var year = Number(dob.substr(0, 4));
  var month = Number(dob.substr(4, 2)) - 1;
  var day = Number(dob.substr(6, 2));
  var today = new Date();
  var age = today.getFullYear() - year;
  if (
    today.getMonth() < month ||
    (today.getMonth() == month && today.getDate() < day)
  ) {
    age--;
  }

  if (age === 0 && this.species === 'cat') age = 'Kitten';
  if (age === 0 && this.species === 'dog') age = 'Puppy';

  return age;
});

petSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'shelter',
    select: 'name location slug',
  });
  next();
});

petSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
