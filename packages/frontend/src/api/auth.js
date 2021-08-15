import { post } from 'utils/http';

const namespace = 'auth';

export const login = (user) => post(`/${namespace}/user`, user);

export const resetLogin = (user) => post(`/${namespace}/user/reset-password`, user);
