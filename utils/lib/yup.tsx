import * as Yup from 'yup';

const noScriptTags = (value: any) => {
  // Regular expression to match <script> tags
  const scriptTagPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  return !scriptTagPattern.test(value);
};

const positionValidation = Yup.object({
  name: Yup.string().min(3).test(noScriptTags).required(),
});

const foodValidation = Yup.object({
  name: Yup.string().min(3).test(noScriptTags).required(),
});

const departmentValidation = Yup.object({
  name: Yup.string().min(3).test(noScriptTags).required(),
});

const passwordValidation = Yup.string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  .required('Password is required');

const employeeFoodValidation = Yup.object({
  employeeId: Yup.number()
    .required('Employee ID is required')
    .positive('Employee ID must be a positive number')
    .integer('Employee ID must be an integer'),

  foodId: Yup.number()
    .required('Food ID is required')
    .positive('Food ID must be a positive number')
    .integer('Food ID must be an integer'),

  remarks: Yup.string().nullable().max(255, 'Remarks cannot be longer than 255 characters'),
});

const employeeValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(100, 'Name cannot be more than 100 characters'),

  email: Yup.string().email('Invalid email format').required('Email is required'),

  image: Yup.string().url('Image must be a valid URL').nullable(), // Optional field

  empId: Yup.number().required('EmpId is required'),
  role: Yup.mixed().oneOf(['ADMIN', 'USER'], 'Role must be either ADMIN or USER').default('USER'), // Default role

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must be digits only')
    .min(10, 'Phone number must be at least 10 digits long')
    .max(15, 'Phone number cannot be more than 15 digits long'),

  address: Yup.string().required('Address is required'),

  positionId: Yup.number()
    .required('Position ID is required')
    .positive('Position ID must be a positive number')
    .integer('Position ID must be an integer'),

  departmentId: Yup.number()
    .required('Department ID is required')
    .positive('Department ID must be a positive number')
    .integer('Department ID must be an integer'),

  foodId: Yup.number()
    .required('Food ID is required')
    .positive('Food ID must be a positive number')
    .integer('Food ID must be an integer'),
});

export {
  positionValidation,
  foodValidation,
  employeeValidation,
  departmentValidation,
  employeeFoodValidation,
  passwordValidation,
};
