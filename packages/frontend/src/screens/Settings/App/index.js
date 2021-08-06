import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  updateAppConfig as acUpdateAppConfig,
  fetchConfigByType as apiFetchConfigByType,
} from 'store/reducers/configSlice';

import TextInput from 'components/TextInput';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Preloader from 'components/Preloader';

import { Form } from 'providers/ThemeProvider/styled';
import { Wrapper, FormFooter, FormWrap, Title } from './styled';

const validationSchema = yup.object().shape({
  appName: yup.string().required('* required'),
  appDesc: yup.string().required('* required'),
});

export default function AppSettings() {
  const dispatch = useDispatch();

  const {
    config: { app },
  } = useSelector((state) => state.config);

  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  const fetchConfigByType = () => dispatch(apiFetchConfigByType('app'));

  const updateAppConfig = (config, cb) =>
    dispatch(acUpdateAppConfig(config, cb));

  useEffect(() => {
    fetchConfigByType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (app) {
      setInitialValues(app);
      setIsLoading(false);
    }
  }, [app]);

  return (
    <Wrapper>
      <Title>App Settings</Title>

      {isLoading && <p>loading..</p>}

      {!isLoading && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
      )}
    </Wrapper>
  );
}
