// const catchAsync = require('./../utils/catchAsync');
const Pet = require('./../models/petModel');
const factory = require('./handlerFactory');

exports.createPet = factory.createOne(Pet);
exports.updatePet = factory.updateOne(Pet);
exports.getAllPets = factory.getAll(Pet);
exports.getPet = factory.getOne(Pet);
exports.deletePet = factory.deleteOne(Pet);
