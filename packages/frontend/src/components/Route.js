import { Route as RouteSource } from 'react-router-dom';

const Route = ({ component: Component, ...restProps }) => {
  return (
    <RouteSource
      {...restProps}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default Route;
