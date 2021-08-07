export const resourceTypes = [
  { value: 'default', label: 'default' },
  { value: 'proxy', label: 'proxy' },
  // { value: 'static', label: 'static' }, // TODO: Enable when ready
  { value: 'custom', label: 'custom' },
];

export const resourceStatus = [
  { value: 'draft', label: 'draft' },
  { value: 'published', label: 'published' },
];

export const resourceMethods = [
  { value: 'get', label: 'get' },
  { value: 'put', label: 'put' },
  { value: 'post', label: 'post' },
  { value: 'patch', label: 'patch' },
  { value: 'delete', label: 'delete' },
];
