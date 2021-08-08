import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { create as apiCreateResource } from 'api/resources';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Preloader from 'components/Preloader';
import CustomSelect from 'components/Select/CustomSelect';
import SchemaBuilder from 'components/SchemaBuilder';

import { resourceTypes, resourceStatus, resourceMethods } from 'config/form';

import { Form, FormField } from 'providers/ThemeProvider/styled';
import {
  Wrapper,
  FormWrap,
  Label,
  FormFooter,
  CheckboxWrapper,
} from './styled';

const validationSchema = yup.object().shape({
  namespace: yup.string().required('* required'),
  name: yup.string().required('* required'),
  type: yup.string().required('* required'),
  methods: yup.array().required('* required'),
  status: yup.string().required('* required'),
});

const initialValues = {
  namespace: 'api',
  private: false,
  protected: false,
  name: '',
  type: 'default',
  methods: '',
  endpoint: '',
  status: 'draft',
  schema: {},
};

function normalize(rawSchema) {
  let normalizedSchema = {};

  rawSchema.forEach(({ name, ...rest }) => {
    normalizedSchema[name] = { ...rest };
  });
  return normalizedSchema;
}

export default function CreateResource() {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const [schema, setSchema] = useState([]);

  const createResource = async (resource) => {
    await apiCreateResource(resource);
  };

  const handleSchemaUpdate = (newSchema) => {
    setSchema(newSchema);
  };

  return (
    <Layout title="Resources > Create">
      <Wrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // TODO Submit the form
            const resourceData = {
              ...values,
              schema: normalize(schema),
              author: {
                id: user._id,
                name: user.userName,
              },
            };
            createResource(resourceData);
            setSubmitting(false);
            history.push('/resources');
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
                  name="namespace"
                  label="namespace"
                  value={values.namespace}
                  errors={errors.namespace}
                  touched={touched.namespace}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly
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

                <TextInput
                  name="name"
                  label="name"
                  value={values.name}
                  errors={errors.name}
                  touched={touched.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. posts"
                />

                <Select
                  label="type"
                  options={resourceTypes}
                  name="type"
                  value={
                    resourceTypes
                      ? resourceTypes.find(
                          (option) => option.value === values.type
                        )
                      : ''
                  }
                  errors={errors.type}
                  touched={touched.type}
                  onChange={(option) => setFieldValue('type', option.value)}
                  onBlur={handleBlur}
                />

                <FormField>
                  <Label htmlFor="methods">methods</Label>
                  <Field
                    name="methods"
                    options={resourceMethods.filter((opt) => {
                      if (values.type === 'proxy') {
                        return opt.value === 'get';
                      } else {
                        return true;
                      }
                    })}
                    component={CustomSelect}
                    errors={errors.methods}
                    touched={touched.methods}
                    isMulti={true}
                  />
                </FormField>

                {values.type === 'proxy' && (
                  <TextInput
                    name="endpoint"
                    label="endpoint"
                    value={values.endpoint}
                    errors={errors.endpoint}
                    touched={touched.endpoint}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
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

                {values.type === 'default' && (
                  <SchemaBuilder
                    initialSchema={schema}
                    onUpdateSchema={handleSchemaUpdate}
                  />
                )}

                <FormFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    <div style={{ display: 'flex' }}>
                      {isSubmitting && (
                        <Preloader
                          style={{ width: '20px', margin: '0 8px 0 0' }}
                        />
                      )}
                      <p>Create</p>
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
