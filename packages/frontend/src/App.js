import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import { fetchAppConfig as acFetchAppConfig } from 'store/reducers/configSlice';
import { fetchAll as acFetchAllResources } from 'store/reducers/resourceSlice';
import { fetchAll as acFetchAllMedia } from 'store/reducers/mediaSlice';

import { FullPageLoading as Loading } from 'components/Loading';
import Bootstrap from 'components/Bootstrap';
import ProtectedRoute from 'components/ProtectedRoute';

import Login from 'screens/Login';
import Register from 'screens/Register';
import Home from 'screens/Home';
import Resources from 'screens/Resources';
import ResourceSingle from 'screens/Resources/Single';
import CreateResource from 'screens/Resources/Create';
import Crud from 'screens/Crud';
import CrudCreate from 'screens/Crud/Create';
import CrudUpdate from 'screens/Crud/Update';
import Media from 'screens/Media';
import MediaUpload from 'screens/Media/Upload';
import Settings from 'screens/Settings';
import Users from 'screens/Users';
import CreateUser from 'screens/Users/Create';
import Logout from 'screens/Logout';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

function App() {
  const dispatch = useDispatch();

  const { isLoading, bootstrap } = useSelector((state) => state.config);

  const fetchAppConfig = () => dispatch(acFetchAppConfig());

  const fetchAllResources = () => dispatch(acFetchAllResources());

  const fetchAllMedia = () => dispatch(acFetchAllMedia());

  useEffect(() => {
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

        <ProtectedRoute exact path="/resources" component={Resources} />
        <ProtectedRoute
          exact
          path="/resources/create"
          component={CreateResource}
        />
        <ProtectedRoute
          exact
          path="/resources/update/:id"
          component={ResourceSingle}
        />

        <ProtectedRoute exact path="/crud" component={Crud} />
        <ProtectedRoute exact path="/crud/:resource" component={CrudCreate} />
        <ProtectedRoute
          exact
          path="/crud/:resource/:id"
          component={CrudUpdate}
        />

        <ProtectedRoute exact path="/media" component={Media} />
        <ProtectedRoute exact path="/media/upload" component={MediaUpload} />

        <ProtectedRoute exact path="/settings" component={Settings} />

        <ProtectedRoute exact path="/users" component={Users} />
        <ProtectedRoute exact path="/users/create" component={CreateUser} />
      </Router>
    </Wrapper>
  );
}

export default App;
