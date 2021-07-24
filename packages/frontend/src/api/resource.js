import { get } from 'utils/http';

const namespace = 'api';

export const fetchAll = (name) => get(`/${namespace}/${name}`);
