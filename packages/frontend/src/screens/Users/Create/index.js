import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { register as acRegister } from 'store/reducers/userSlice';

import Layout from 'components/Layout';

import { Wrapper } from './styled';

import FormFields from '../FormFields';

const initialValues = {
  screenName: 'Jane',
  email: 'jane@example.com',
  userName: 'jane',
  password: 'pa$$word',
  password_re: 'pa$$word',
  role: 2,
};

export default function CreateUser() {
  const history = useHistory();
  const dispatch = useDispatch();

  const register = (user, cb) => dispatch(acRegister(user, cb));

  return (
    <Layout title="Users > Create">
      <Wrapper>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            // if (!values.name) {
            //   errors.name = 'Required';
            // }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            register(values, (err) => {
              if (err) {
                // TODO: Handle error
              } else {
                // TODO Trigger and email and send user verification link
                resetForm();
                setSubmitting(false);
                history.push(`/users`);
              }
            });
          }}
        >
          {(formikProps) => <FormFields {...formikProps} submitText="Create" />}
        </Formik>
      </Wrapper>
    </Layout>
  );
}
