import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Z][a-z]*$/, { name: 'capitalized' })
    .messages({
      'string.pattern.name': '"{#label}" should start with a capital letter',
    }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.pattern.base':
        '"{#label}" should only contain alphabetic characters',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female'),
  dateOfBirth: Joi.string().allow(null, ''),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddres: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().allow(null, ''),
  isActive: Joi.string().valid('active', 'blocked'),
});

export default studentValidationSchema;
