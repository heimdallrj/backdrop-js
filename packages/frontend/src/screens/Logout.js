import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout as acLogout } from 'store/reducers/authSlice';

export default function Logout() {
  const dispatch = useDispatch();
  const logout = () => dispatch(acLogout());

  useEffect(() => {
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to="/login" />;
}
