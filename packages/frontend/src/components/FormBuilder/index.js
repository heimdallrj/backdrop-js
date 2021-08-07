import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import forEach from 'lodash/forEach';

import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Preloader from 'components/Preloader';
import Textarea from 'components/Textarea';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';

import RichText from './RichText';
import Resource from './Resource';

import { resourceStatus } from 'config/form';

import { Form } from 'providers/ThemeProvider/styled';

const Wrapper = styled.div``;

export const FormFooter = styled.div`
  text-align: left;
  margin: 15px 0;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
`;

export default function FormBuilder({
  initialData = null,
  schema,
  submitBtnText,
  onSubmit,
}) {
  const [initialValues, setInitialValues] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const _fields = [];
    const _initialValues = {};
    forEach(schema, (val, key) => {
      _fields.push({
        ...val,
        name: key,
        label: key,
      });
      if (val.type !== 'Resource') {
        _initialValues[key] = '';
      }
    });
    setFields(_fields);
    setInitialValues({
      ..._initialValues,
      status: 'draft',
      private: false,
      protected: false,
    });
  }, [schema]);

  useEffect(() => {
    if (initialData) {
      setInitialValues({
        ...initialData,
        status: 'draft',
        private: false,
        protected: false,
      });
    }
  }, [initialData]);

  return (
    <Wrapper>
      {initialValues && (
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
              {fields.map(
                ({ name, label, type, relationships, placeholder }) => {
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
                        placeholder={placeholder}
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
                        onChange={(html) => setFieldValue(name, html)}
                        onBlur={handleBlur}
                        placeholder={placeholder}
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
                        placeholder={placeholder}
                      />
                    );
                  }

                  if (type === 'Resource') {
                    return <Resource key={name} name={name} label={label} />;
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
                      placeholder={placeholder}
                    />
                  );
                }
              )}

              <Select
                label="status"
                options={resourceStatus}
                name="status"
                value={
                  resourceStatus
                    ? resourceStatus.find(
                        (option) => option.value === values.status
                      )
                    : ''
                }
                onChange={(option) => setFieldValue('status', option.value)}
                onBlur={handleBlur}
              />

              <CheckboxWrapper>
                <Checkbox
                  label="Private"
                  name="private"
                  checked={values.private || false}
                  errors={errors.private}
                  touched={touched.private}
                  onChange={handleChange}
                />

                <Checkbox
                  label="Protected"
                  name="protected"
                  checked={values.protected || false}
                  errors={errors.protected}
                  touched={touched.protected}
                  onChange={handleChange}
                />
              </CheckboxWrapper>

              <FormFooter>
                <Button type="submit" disabled={isSubmitting}>
                  <div style={{ display: 'flex' }}>
                    {isSubmitting && (
                      <Preloader
                        style={{ width: '20px', margin: '0 8px 0 0' }}
                      />
                    )}
                    <p>{submitBtnText}</p>
                  </div>
                </Button>
              </FormFooter>
            </Form>
          )}
        </Formik>
      )}
    </Wrapper>
  );
}
