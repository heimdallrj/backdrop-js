import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { register as acRegister } from 'store/reducers/userSlice';

import Button from 'components/Button';
import TextInput from 'components/TextInput';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormFooter } from './styled';

const validationSchema = yup.object().shape({
  screenName: yup.string().required('* required'),
  userName: yup.string().required('* required'),
  email: yup.string().email('* invalid email address').required('* required'),
  password: yup.string().required('* required'),
  password_re: yup
    .string()
    .required('* required')
    .oneOf([yup.ref('password'), null], '* passwords must match'),
});

const initialValues = {
  screenName: '',
  email: '',
  userName: '',
  password: '',
  password_re: '',
  role: 2,
  status: 0,
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
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          register(values, (err) => {
            if (err) {
              // TODO: Handle error
            } else {
              // TODO Trigger and email and send user verification link
              resetForm();
              setSubmitting(false);
              history.push(`/login`);
            }
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
              name="screenName"
              label="Screen Name"
              value={values.screenName}
              errors={errors.screenName}
              touched={touched.screenName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jane Doe"
            />

            <TextInput
              name="userName"
              label="User Name"
              value={values.userName}
              errors={errors.userName}
              touched={touched.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="jane"
            />

            <TextInput
              name="email"
              label="E-mail"
              value={values.email}
              errors={errors.email}
              touched={touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="jane@example.com"
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
              placeholder="pa$$word"
            />

            <TextInput
              name="password_re"
              label="password (confirm)"
              value={values.password_re}
              errors={errors.password_re}
              touched={touched.password_re}
              onChange={handleChange}
              onBlur={handleBlur}
              masked
              placeholder="eg. pa$$word"
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
