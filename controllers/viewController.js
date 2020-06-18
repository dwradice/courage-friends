const Pet = require('../models/petModel');
const Shelter = require('../models/shelterModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  if (req.params.species) {
    pets = await Pet.find({ species: req.params.species });
  } else {
    pets = await Pet.find();
  }

  res.status(200).render('overview', {
    title: 'All Pets',
    pets,
  });
});

exports.getShelter = catchAsync(async (req, res) => {
  const shelter = await Shelter.findOne({ slug: req.params.slug }).populate(
    'animals'
  );

  res.status(200).render('shelter', {
    title: shelter.slug,
    shelter: shelter,
  });
});
