export const userSessionKey = process.env.REACT_APP_USER_SESSION_KEY;
export const cookieKey = process.env.REACT_APP_COOKIE_KEY;

export const inputTypeOptions = [
  {
    value: 'Text',
    label: 'Text',
    type: 'string',
    element: 'Text',
    defaultValue: null,
  },
  {
    value: 'MultilineText',
    label: 'Multiline Text',
    type: 'string',
    element: 'MultilineText',
    defaultValue: null,
  },
  {
    value: 'RichText',
    label: 'RichText',
    type: 'string',
    element: 'RichText',
    defaultValue: null,
  },
  {
    value: 'Resource',
    label: 'Resource',
    type: 'resource',
    element: 'ResourceSelector',
    defaultValue: [],
  },
  {
    value: 'Date',
    label: 'Date',
    type: 'date',
    element: 'Text',
    defaultValue: null,
  },
  {
    value: 'Boolean',
    label: 'Boolean',
    type: 'boolean',
    element: 'Checkbox',
    defaultValue: false,
  },
  {
    value: 'Array',
    label: 'Array',
    type: 'array',
    element: null,
    defaultValue: [],
  },
  {
    value: 'Object',
    label: 'Object',
    type: 'object',
    element: null,
    defaultValue: {},
  },
];
