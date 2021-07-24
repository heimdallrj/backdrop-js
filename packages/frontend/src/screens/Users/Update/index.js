import { useEffect, useState } from 'react';
import { Formik } from 'formik';
// import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetch as apiFetchUser } from 'api/users';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Preloader from 'components/Preloader';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormWrap, FormFooter } from './styled';

// const initialValues = {
//   screenName: 'Jane',
//   email: 'jane@example.com',
//   userName: 'jane',
//   password: 'pa$$word',
//   role: 2,
//   status: 0,
// };

export default function UpdateUser() {
  // const history = useHistory();
  // const dispatch = useDispatch();
  const { id } = useParams();

  const [initialValues] = useState({});

  const fetchUser = async (id) => {
    const _user = await apiFetchUser(id);
    console.log('_user', _user);
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return (
    <Layout title="Users > Update">
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
            console.log(values);
            // register(values, (err) => {
            //   if (err) {
            //     // TODO: Handle error
            //   } else {
            //     // TODO Trigger and email and send user verification link
            //     resetForm();
            //     setSubmitting(false);
            //     history.push(`/users`);
            //   }
            // });
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
      </Wrapper>
    </Layout>
  );
}
