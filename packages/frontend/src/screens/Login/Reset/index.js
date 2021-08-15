import { useState } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as yup from 'yup';

import { resetLogin as apiResetLogin } from 'api/auth';

import Button from 'components/Button';
import TextInput from 'components/TextInput';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, Desc, LoginLink, FormFooter } from './styled';

const validationSchema = yup.object().shape({
  email: yup.string().email('* invalid email address').required('* required'),
});

const initialValues = {
  email: '',
};

export default function LoginReset() {
  const { user } = useSelector((state) => state.auth);

  const [isRequested, setIsRequested] = useState(false);

  if (user) return <Redirect to="/" />;

  return (
    <Wrapper>
      <h4>Login {'>'} Reset Password</h4>

      {isRequested && (
        <Desc>
          You will receive an email with instructions on how to reset your password if you have an account associated.
          <LoginLink>
            <Link to="/login">Login</Link>
          </LoginLink>
        </Desc>
      )}

      {!isRequested && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await apiResetLogin(values);
            setSubmitting(false);
            setIsRequested(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Desc>
                Please enter email address.<br />
                You will receive an email with instructions on how to reset your password if you have an account associated.
              </Desc>
              <TextInput
                name="email"
                label="Email"
                value={values.email}
                errors={errors.email}
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="eg. john@example.com"
              />

              <FormFooter>
                <Button type="submit" disabled={isSubmitting}>
                  Reset
                </Button>
              </FormFooter>
            </Form>
          )}
        </Formik>
      )}
    </Wrapper>
  );
}
