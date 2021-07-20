import { Formik } from 'formik';

import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Button from 'components/Button';

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

const dbOptions = [{ value: 'JsonDB', label: 'JsonDB' }];

const initialValues = {
  appName: 'Backdrop-js',
  userName: 'admin',
  screenName: 'John Doe',
  password: 'pa$$word',
  password_re: 'pa$$word',
  email: 'john@example.com',
  dbAdapter: 'JsonDB',
};

export default function Start() {
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
          validate={(values) => {
            const errors = {};
            if (!values.appName) {
              errors.appName = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
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
                label="App Name"
                value={values.appName}
                errors={errors.appName}
                touched={touched.appName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <TextInput
                name="userName"
                label="userName"
                value={values.userName}
                errors={errors.userName}
                touched={touched.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

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
                name="password"
                label="password"
                value={values.password}
                errors={errors.password}
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                masked
              />

              <TextInput
                name="password_re"
                label="password_re"
                value={values.password_re}
                errors={errors.password_re}
                touched={touched.password_re}
                onChange={handleChange}
                onBlur={handleBlur}
                masked
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
              />

              <Select
                label="Database Adapter"
                options={dbOptions}
                name="dbAdapter"
                value={
                  dbOptions
                    ? dbOptions.find(
                        (option) => option.value === values.dbAdapter
                      )
                    : ''
                }
                onChange={(option) => setFieldValue('dbAdapter', option.value)}
                onBlur={handleBlur}
              />

              <FormFooter>
                <Button type="submit" disabled={isSubmitting}>
                  Proceed
                </Button>
              </FormFooter>
            </Form>
          )}
        </Formik>
      </FormWrap>
    </Wrapper>
  );
}
