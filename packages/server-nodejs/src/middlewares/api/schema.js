/* eslint no-unused-vars: 0 */
import pick from 'lodash/pick';
import forEach from 'lodash/forEach';

import { response } from 'utils/http';

const validate = (inputs, schema) => {
  let valid = true;
  const errors = {};

  // forEach(inputs, (value, field) => {
  //   const config = schema[field];

  //   // validate: type
  //   if (config.type) {
  //     // eslint-disable-next-line
  //     if (typeof value !== config.type) {
  //       valid = false;
  //       errors[field] = 'Invalid type';
  //     }
  //   }

  //   // validate: length
  //   if (config.length) {
  //     if (value.length > 256) {
  //       valid = false;
  //       errors[field] = 'Invalid length';
  //     }
  //   }

  //   // validate: required
  //   if (config.required) {
  //     if (!value || value.trim() === '') {
  //       valid = false;
  //       errors[field] = 'Required';
  //     }
  //   }
  // });

  return [valid, errors];
};

export default function validateSchema(req, res, next) {
  const {
    body: doc,
    resourceConfig: { schema },
  } = req;

  const allowedFields = Object.keys(schema).filter((f) => !['_id'].includes(f));
  const inputs = pick(doc, allowedFields);

  const [valid, errors] = validate(inputs, schema);

  if (!valid) return response.bad(res);

  return next();
}
