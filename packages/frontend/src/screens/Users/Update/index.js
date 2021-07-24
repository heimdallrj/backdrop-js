import { useEffect, useState } from 'react';
import { Formik } from 'formik';
// import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { fetch as apiFetchUser, update as apiUpdateUser } from 'api/users';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Preloader from 'components/Preloader';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormWrap, FormFooter } from './styled';

export default function UpdateUser() {
  const history = useHistory();
  // const dispatch = useDispatch();
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
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = {};
              // if (!values.name) {
              //   errors.name = 'Required';
              // }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await apiUpdateUser(id, values);
              resetForm();
              setSubmitting(false);
              history.push(`/users`);
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
              <FormWrap>
                {isSubmitting && <p>creating..</p>}
                <Form onSubmit={handleSubmit}>
                  <TextInput
                    name="screenName"
                    label="Screen Name"
                    value={values.screenName}
                    errors={errors.screenName}
                    touched={touched.screenName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

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
                    name="email"
                    label="E-mail"
                    value={values.email}
                    errors={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <FormFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      <div style={{ display: 'flex' }}>
                        {isSubmitting && (
                          <Preloader
                            style={{ width: '20px', margin: '0 8px 0 0' }}
                          />
                        )}
                        <p>Update</p>
                      </div>
                    </Button>
                  </FormFooter>
                </Form>
              </FormWrap>
            )}
          </Formik>
        )}
      </Wrapper>
    </Layout>
  );
}
