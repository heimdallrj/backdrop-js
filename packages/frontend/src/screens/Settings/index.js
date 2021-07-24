import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { updateAppConfig as acUpdateAppConfig } from 'store/reducers/configSlice';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Preloader from 'components/Preloader';
import Select from 'components/Select';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormFooter, FormWrap } from './styled';

const dbOptions = [{ value: 'JsonDB', label: 'JsonDB' }];

export default function Settings() {
  const dispatch = useDispatch();

  const { config } = useSelector((state) => state.config);

  const [initialValues] = useState(config || {});
  const [selecteddbDrive, setSelecteddbDrive] = useState('');

  const updateAppConfig = (config, cb) =>
    dispatch(acUpdateAppConfig(config, cb));

  useEffect(() => {
    if (config) {
      const { driver } = config.database;
      setSelecteddbDrive(driver);
    }
  }, [config]);

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
          onSubmit={(
            { appName, appDesc, baseUrl },
            { setSubmitting, resetForm }
          ) => {
            const configToSave = {
              appName,
              appDesc,
              baseUrl,
              database: { driver: selecteddbDrive },
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

                <TextInput
                  name="baseUrl"
                  label="Base Url"
                  value={values.baseUrl}
                  errors={errors.baseUrl}
                  touched={touched.baseUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly
                />

                <Select
                  label="dbDriver"
                  options={dbOptions}
                  name="dbDriver"
                  value={
                    dbOptions
                      ? dbOptions.find(
                          (option) => option.value === selecteddbDrive
                        )
                      : ''
                  }
                  onChange={(option) => setFieldValue('dbDriver', option.value)}
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
