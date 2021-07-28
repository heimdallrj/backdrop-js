import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { updateAppConfig as acUpdateAppConfig } from 'store/reducers/configSlice';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Preloader from 'components/Preloader';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormFooter, FormWrap } from './styled';

export default function Settings() {
  const dispatch = useDispatch();

  const { config } = useSelector((state) => state.config);

  const [initialValues] = useState(config || {});

  const updateAppConfig = (config, cb) =>
    dispatch(acUpdateAppConfig(config, cb));

  return (
    <Layout title="Settings">
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
          onSubmit={({ appName, appDesc }, { setSubmitting, resetForm }) => {
            const configToSave = {
              appName,
              appDesc,
            };
            updateAppConfig({ config: configToSave }, () => {
              resetForm();
              setSubmitting(false);
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
            <FormWrap>
              <Form onSubmit={handleSubmit}>
                <TextInput
                  name="appName"
                  label="Application Name"
                  value={values.appName}
                  errors={errors.appName}
                  touched={touched.appName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextInput
                  name="appDesc"
                  label="Description"
                  value={values.appDesc}
                  errors={errors.appDesc}
                  touched={touched.appDesc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Checkbox
                  label="Enable SignUp"
                  name="enableSignUp"
                  checked={values.enableSignUp || false}
                  errors={errors.enableSignUp}
                  touched={touched.enableSignUp}
                  onChange={handleChange}
                />

                <FormFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    <div style={{ display: 'flex' }}>
                      {isSubmitting && (
                        <Preloader
                          style={{ width: '20px', margin: '0 8px 0 0' }}
                        />
                      )}
                      <p>Save</p>
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
