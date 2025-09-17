const Joi = require("joi");

const passportSchema = Joi.object({
  data: Joi.object({
    generalInformation: Joi.object({
      batteryIdentifier: Joi.string().required(),
      batteryModel: Joi.object({
        id: Joi.string().required(),
        modelName: Joi.string().required(),
      }).required(),
      batteryMass: Joi.number().required(),
      batteryCategory: Joi.string().required(),
      batteryStatus: Joi.string().required(),
      manufacturingDate: Joi.string().required(),
      manufacturingPlace: Joi.string().required(),
      warrantyPeriod: Joi.string().required(),
      manufacturerInformation: Joi.object({
        manufacturerName: Joi.string().required(),
        manufacturerIdentifier: Joi.string().required(),
      }).required(),
    }).required(),
    materialComposition: Joi.object({
      batteryChemistry: Joi.string().required(),
      criticalRawMaterials: Joi.array().items(Joi.string()).required(),
      hazardousSubstances: Joi.array()
        .items(
          Joi.object({
            substanceName: Joi.string().required(),
            chemicalFormula: Joi.string().required(),
            casNumber: Joi.string().required(),
          })
        )
        .required(),
    }).required(),
    carbonFootprint: Joi.object({
      totalCarbonFootprint: Joi.number().required(),
      measurementUnit: Joi.string().required(),
      methodology: Joi.string().required(),
    }).required(),
  }).required(),
}).required();

module.exports = {
  passportSchema,
};
