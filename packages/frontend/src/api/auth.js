import { post } from 'utils/http';

const namespace = 'auth';

export const login = (user) => post(`/${namespace}/user`, user);
