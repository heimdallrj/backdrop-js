import { Formik } from 'formik';
import * as yup from 'yup';

import { bootstrap as apiBootstrap } from 'api';

import Button from 'components/Button';
import TextInput from 'components/TextInput';

import { Form } from 'providers/ThemeProvider/styled';
import {
  Wrapper,
  Welcome,
  Heading,
  Tagline,
  FormWrap,
  Instruction,
  FormFooter,
} from './styled';

const validationSchema = yup.object().shape({
  appName: yup.string().required('* required'),
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
  appName: '',
  screenName: '',
  email: '',
  userName: '',
  password: '',
  password_re: '',
};

const getInitialConfig = (values) => {
  const { userName, screenName, password, email, appName } = values;
  return {
    appName,
    appDesc: 'Minimalistic API Artisan',
    adminUser: { userName, screenName, password, email },
  };
};

export default function Bootstrap() {
  const postBootstrap = async (config, { setSubmitting }) => {
    await apiBootstrap(config);
    setSubmitting(false);
    return (window.location.href = '/login');
  };

  return (
    <Wrapper>
      <Welcome>
        <Heading>Backdrop-js</Heading>
        <Tagline>Welcome to the Backdrop-js - Minimalistic API Artisan</Tagline>
      </Welcome>

      <FormWrap>
        <Instruction>
          Please provide following information to proceed. <br />
          Don't worry you can always change these settings later.
        </Instruction>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikProps) => {
            postBootstrap(getInitialConfig(values), formikProps);
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
                name="appName"
                label="Application Name"
                value={values.appName}
                errors={errors.appName}
                touched={touched.appName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="eg. Backdrop-js API"
              />

              <TextInput
                name="screenName"
                label="Screen Name"
                value={values.screenName}
                errors={errors.screenName}
                touched={touched.screenName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="eg. John Doe"
              />

              <TextInput
                name="email"
                type="email"
                label="Your email"
                value={values.email}
                errors={errors.email}
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="eg. john@example.com"
              />

              <TextInput
                name="userName"
                label="User Name"
                value={values.userName}
                errors={errors.userName}
                touched={touched.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="eg. john"
              />

              <TextInput
                name="password"
                label="Password"
                value={values.password}
                errors={errors.password}
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                masked
                placeholder="eg. pa$$word"
              />

              <TextInput
                name="password_re"
                label="Re-type Password"
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
                  Start
                </Button>
              </FormFooter>
            </Form>
          )}
        </Formik>
      </FormWrap>
    </Wrapper>
  );
}
