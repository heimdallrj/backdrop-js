import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout as acLogout } from 'store/reducers/userSlice';

export default function Logout() {
  const dispatch = useDispatch();
  const logout = () => dispatch(acLogout());

  logout();

  return <Redirect to="/login" />;
}
