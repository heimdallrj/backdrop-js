import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import forEach from 'lodash/forEach';
import * as yup from 'yup';

import {
  fetchOne as apiFetchOne,
  update as apiUpdateResource,
} from 'api/resources';

// import { fetchAll as acFetchAllResources } from 'store/reducers/resourceSlice';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Preloader from 'components/Preloader';
import CustomSelect from 'components/Select/CustomSelect';
import SchemaBuilder from 'components/SchemaBuilder';

import { resourceMethods, resourceTypes, resourceStatus } from 'config/form';

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

function normalize(rawSchema) {
  let normalizedSchema = {};

  rawSchema.forEach(({ name, ...rest }) => {
    normalizedSchema[name] = { ...rest };
  });
  return normalizedSchema;
}

export default function CreateResource() {
  // const dispatch = useDispatch();
  const history = useHistory();
  const { name } = useParams();

  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [resource, setResource] = useState(null);
  const [schema, setSchema] = useState([]);

  // const fetchAllResources = () => dispatch(acFetchAllResources());

  const fetchResource = async (name) => {
    const _resource = await apiFetchOne(name);
    setResource(_resource);
  };

  const createResource = async (resource) => {
    await apiUpdateResource(name, resource);
  };

  const handleSchemaUpdate = (newSchema) => {
    setSchema(newSchema);
  };

  useEffect(() => {
    // fetchAllResources();
    fetchResource(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resource) {
      const _schema = [];
      forEach(resource.schema, (val, key) => {
        _schema.push({ name: key, ...val });
      });
      setSchema(_schema);
      setIsLoading(false);
    }
  }, [resource]);

  return (
    <Layout isLoading={isLoading} title={`Resources > Update`}>
      <Wrapper>
        <Formik
          initialValues={resource}
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
                />

                <Select
                  label="type"
                  options={resourceTypes}
                  name="type"
                  errors={errors.type}
                  touched={touched.type}
                  value={
                    resourceTypes
                      ? resourceTypes.find(
                          (option) => option.value === values.type
                        )
                      : ''
                  }
                  onChange={(option) => setFieldValue('type', option.value)}
                  onBlur={handleBlur}
                />

                <FormField>
                  <Label htmlFor="methods">methods</Label>
                  <Field
                    name="methods"
                    errors={errors.methods}
                    touched={touched.methods}
                    options={resourceMethods.filter((opt) => {
                      if (values.type === 'proxy') {
                        return opt.value === 'get';
                      } else {
                        return true;
                      }
                    })}
                    component={CustomSelect}
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
                  errors={errors.status}
                  touched={touched.status}
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

                {values.type !== 'proxy' && (
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
