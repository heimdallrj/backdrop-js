import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import forEach from 'lodash/forEach';

import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Preloader from 'components/Preloader';
import Textarea from 'components/Textarea';

import RichText from './RichText';

import { Form } from 'providers/ThemeProvider/styled';

const Wrapper = styled.div``;

export const FormFooter = styled.div`
  text-align: left;
  margin: 30px 0;
`;

export default function FormBuilder({
  initialData = {},
  schema,
  submitBtnText,
  onSubmit,
}) {
  const [initialValues] = useState(initialData);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const _fields = [];
    forEach(schema, (val, key) => {
      _fields.push({
        ...val,
        name: key,
        label: key,
      });
    });
    setFields(_fields);
  }, [schema]);

  return (
    <Wrapper>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values, () => {
            resetForm();
            setSubmitting(false);
            // TODO
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
          <Form onSubmit={handleSubmit}>
            {fields.map(({ name, label, type }) => {
              if (type === 'Text') {
                return (
                  <TextInput
                    key={name}
                    name={name}
                    label={label}
                    value={values[name]}
                    errors={errors[name]}
                    touched={touched[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                );
              }

              if (type === 'RichText') {
                return (
                  <RichText
                    key={name}
                    name={name}
                    label={label}
                    value={values[name]}
                    errors={errors[name]}
                    touched={touched[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write something..."
                  />
                );
              }

              if (type === 'MultilineText') {
                return (
                  <Textarea
                    key={name}
                    name={name}
                    label={label}
                    value={values[name]}
                    errors={errors[name]}
                    touched={touched[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                );
              }

              return (
                <TextInput
                  key={name}
                  name={name}
                  label={label}
                  value={values[name]}
                  errors={errors[name]}
                  touched={touched[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              );
            })}

            <FormFooter>
              <Button type="submit" disabled={isSubmitting}>
                <div style={{ display: 'flex' }}>
                  {isSubmitting && (
                    <Preloader style={{ width: '20px', margin: '0 8px 0 0' }} />
                  )}
                  <p>{submitBtnText}</p>
                </div>
              </Button>
            </FormFooter>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
