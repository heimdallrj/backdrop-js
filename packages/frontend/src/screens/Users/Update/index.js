import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { fetch as apiFetchUser, update as apiUpdateUser } from 'api/users';

import TextInput from 'components/TextInput';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Preloader from 'components/Preloader';

import FormFields from '../FormFields';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormWrap, FormFooter } from './styled';

// TODO Improve validationSchema
const validationSchema = yup.object().shape({
  screenName: yup.string().required('* required'),
  userName: yup.string().required('* required'),
  email: yup.string().email('* invalid email address').required('* required'),
  role: yup.number().required('* required').integer(),
});

const passwordValidationSchema = yup.object().shape({
  password_old: yup.string().required('* required'),
  password: yup.string().required('* required'),
  password_re: yup
    .string()
    .required('* required')
    .oneOf([yup.ref('password'), null], '* passwords must match'),
});

export default function UpdateUser() {
  const history = useHistory();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState(null);

  const fetchUser = async (id) => {
    const _user = await apiFetchUser(id);
    const { screenName, email, userName, role, status } = _user;
    setInitialValues({ screenName, email, userName, role, status });
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return (
    <Layout title="Users > Update">
      <Wrapper>
        {initialValues && (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                await apiUpdateUser(id, values);
                resetForm();
                setSubmitting(false);
                history.push(`/users`);
              }}
            >
              {(formikProps) => (
                <FormFields {...formikProps} isUpdate submitText="Update" />
              )}
            </Formik>

            <h6>Change Password</h6>

            <Formik
              initialValues={{
                password_old: '',
                password: '',
                password_re: '',
              }}
              validationSchema={passwordValidationSchema}
              onSubmit={async ({ password }, { setSubmitting, resetForm }) => {
                await apiUpdateUser(id, { password });
                resetForm();
                setSubmitting(false);
                history.push(`/users`);
              }}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <FormWrap>
                  <Form onSubmit={handleSubmit}>
                    <TextInput
                      name="password_old"
                      label="Old Password"
                      value={values.password_old}
                      errors={errors.password_old}
                      touched={touched.password_old}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      masked
                    />

                    <TextInput
                      name="password"
                      label="New Password"
                      value={values.password}
                      errors={errors.password}
                      touched={touched.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      masked
                    />

                    <TextInput
                      name="password_re"
                      label="New Password (Confirm)"
                      value={values.password_re}
                      errors={errors.password_re}
                      touched={touched.password_re}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      masked
                    />

                    <FormFooter>
                      <Button type="submit" disabled={isSubmitting}>
                        <div style={{ display: 'flex' }}>
                          {isSubmitting && (
                            <Preloader
                              style={{ width: '20px', margin: '0 8px 0 0' }}
                            />
                          )}
                          <p>Update Password</p>
                        </div>
                      </Button>
                    </FormFooter>
                  </Form>
                </FormWrap>
              )}
            </Formik>
          </>
        )}
      </Wrapper>
    </Layout>
  );
}
