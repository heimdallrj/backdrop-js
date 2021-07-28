import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { ping as apiPing } from 'api';

import { fetchAppConfig as acFetchAppConfig } from 'store/reducers/configSlice';
import { fetchAll as acFetchAllResources } from 'store/reducers/resourceSlice';
import { fetchAll as acFetchAllMedia } from 'store/reducers/mediaSlice';

import { FullPageLoading as Loading } from 'components/Loading';
import Bootstrap from 'components/Bootstrap';
import ProtectedRoute from 'components/ProtectedRoute';
import Route from 'components/Route';

import Login from 'screens/Login';
import Register from 'screens/Register';
import Home from 'screens/Home';
import Resources from 'screens/Resources';
import UpdateResource from 'screens/Resources/Update';
import CreateResource from 'screens/Resources/Create';
import Crud from 'screens/Crud';
import CrudCreate from 'screens/Crud/Create';
import CrudUpdate from 'screens/Crud/Update';
import Media from 'screens/Media';
import Settings from 'screens/Settings';
import Users from 'screens/Users';
import CreateUser from 'screens/Users/Create';
import UpdateUser from 'screens/Users/Update';
import Logout from 'screens/Logout';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

function App() {
  const dispatch = useDispatch();

  const [bootstrap, setBootstrap] = useState(null);
  const { isLoading } = useSelector((state) => state.config);

  const ping = async () => {
    const heartbeat = await apiPing();
    if (heartbeat === null) {
      setBootstrap(!!!heartbeat);
    }
  };

  const fetchAppConfig = () => dispatch(acFetchAppConfig());

  const fetchAllResources = () => dispatch(acFetchAllResources());

  const fetchAllMedia = () => dispatch(acFetchAllMedia());

  useEffect(() => {
    ping();
    fetchAppConfig();
    fetchAllResources();
    fetchAllMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;

  if (bootstrap) return <Bootstrap />;

  return (
    <Wrapper>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={Logout} />

        <ProtectedRoute exact path="/" component={Home} />

        <ProtectedRoute
          featureId="resources"
          exact
          path="/resources"
          component={Resources}
        />
        <ProtectedRoute
          featureId="resources"
          exact
          path="/resources/create"
          component={CreateResource}
        />
        <ProtectedRoute
          featureId="resources"
          exact
          path="/resources/update/:id"
          component={UpdateResource}
        />

        <ProtectedRoute featureId="curd" exact path="/crud" component={Crud} />
        <ProtectedRoute
          featureId="curd"
          exact
          path="/crud/:resource"
          component={CrudCreate}
        />
        <ProtectedRoute
          featureId="curd"
          exact
          path="/crud/:resource/:id"
          component={CrudUpdate}
        />

        <ProtectedRoute
          featureId="media"
          exact
          path="/media"
          component={Media}
        />

        <ProtectedRoute
          featureId="settings"
          exact
          path="/settings"
          component={Settings}
        />

        <ProtectedRoute
          featureId="users"
          exact
          path="/users"
          component={Users}
        />
        <ProtectedRoute
          featureId="users"
          exact
          path="/users/create"
          component={CreateUser}
        />
        <ProtectedRoute
          featureId="users"
          exact
          path="/users/update/:id"
          component={UpdateUser}
        />
      </Router>
    </Wrapper>
  );
}

export default App;
