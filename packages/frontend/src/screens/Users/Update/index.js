import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';

import { fetch as apiFetchUser, update as apiUpdateUser } from 'api/users';

import Layout from 'components/Layout';

import FormFields from '../FormFields';

import { Wrapper } from './styled';

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
            {(formikProps) => (
              <FormFields {...formikProps} submitText="Update" />
            )}
          </Formik>
        )}
      </Wrapper>
    </Layout>
  );
}
