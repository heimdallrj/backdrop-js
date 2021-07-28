import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Unauthorized from 'components/Unauthorized';

import { featuresConfig } from 'config/features';

const ProtectedRoute = ({ component: Component, featureId, ...restProps }) => {
  const { user } = useSelector((state) => state.auth);
  const { role } = user || {};

  return (
    <Route
      {...restProps}
      render={(props) => {
        if (!user) {
          // not logged in so redirect to login page with the return url

          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        if (user && role && featuresConfig[featureId]) {
          if (featuresConfig[featureId].includes(role) === false) {
            return <Unauthorized />;
          }
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
