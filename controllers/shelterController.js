// const catchAsync = require('./../utils/catchAsync');
const Shelter = require('./../models/shelterModel');
const factory = require('./handlerFactory');

exports.createShelter = factory.createOne(Shelter);
exports.updateShelter = factory.updateOne(Shelter);
exports.deleteShelter = factory.deleteOne(Shelter);
exports.getAllShelters = factory.getAll(Shelter);
exports.getShelter = factory.getOne(Shelter, { path: 'animals' });
