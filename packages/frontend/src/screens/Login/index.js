import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { login as acLogin } from 'store/reducers/authSlice';

import Button from 'components/Button';
import TextInput from 'components/TextInput';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormFooter } from './styled';

const validationSchema = yup.object().shape({
  userName: yup.string().required('* required'),
  password: yup.string().required('* required'),
});

const initialValues = {
  userName: '',
  password: '',
};

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const login = (user, cb) => dispatch(acLogin(user, cb));

  if (user) return <Redirect to="/" />;

  return (
    <Wrapper>
      <h4>Login</h4>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values, () => {
            // setSubmitting(false);
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
              placeholder="eg. admin"
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
              placeholder="eg. pa$$word"
            />

            <FormFooter>
              <Button type="submit" disabled={isSubmitting}>
                Login
              </Button>
            </FormFooter>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
