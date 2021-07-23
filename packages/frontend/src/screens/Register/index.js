import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { register as acRegister } from 'store/reducers/authSlice';

import Button from 'components/Button';
import TextInput from 'components/TextInput';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormFooter } from './styled';

const initialValues = {
  userName: 'admin',
  password: 'pa$$word',
};

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const register = (user, cb) => dispatch(acRegister(user, cb));

  if (user) return <Redirect to="/" />;

  return (
    <Wrapper>
      <h4>Register</h4>

      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.userName) {
            errors.userName = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          register(values, () => {
            setSubmitting(false);
            history.push(`/`);
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="userName"
              label="User Name"
              value={values.userName}
              errors={errors.userName}
              touched={touched.userName}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextInput
              name="password"
              label="password"
              value={values.password}
              errors={errors.password}
              touched={touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
              masked
            />

            <FormFooter>
              <Button type="submit" disabled={isSubmitting}>
                Register
              </Button>
            </FormFooter>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
