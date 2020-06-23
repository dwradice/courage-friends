const Pet = require('../models/petModel');
const Shelter = require('../models/shelterModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    pets = await Pet.find();
  } else {
    queryStr = JSON.stringify(req.query);
    pets = await Pet.find(JSON.parse(queryStr));
  }
  pets.sort((a, b) => b.dob - a.dob);
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
