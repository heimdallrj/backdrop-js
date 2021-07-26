import { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import { useParams,useHistory } from 'react-router-dom';

import { fetch as apiFetchResource,
update as apiUpdateResource } from 'api/resources';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Preloader from 'components/Preloader';
import CustomSelect from 'components/Select/CustomSelect';
//import SchemaBuilder from 'components/SchemaBuilder';


import { Form, FormField } from 'providers/ThemeProvider/styled';
import {
  Wrapper,
  FormWrap,
  Label,
  FormFooter,
  CheckboxWrapper,
} from './Create/styled';

export default function ResourceSingle() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState(null);
  //const [schema, setSchema] = useState([]);
  const history = useHistory();
  const typeOptions = [
    { value: 'default', label: 'default' },
    { value: 'proxy', label: 'proxy' },
    // { value: 'static', label: 'static' }, // TODO: Enable when ready
    // { value: 'custom', label: 'custom' },
  ];
  
  const statusOptions = [
    { value: 'draft', label: 'draft' },
    { value: 'published', label: 'published' },
  ];
  
  const methodsOptions = [
    { value: 'get', label: 'get' },
    { value: 'put', label: 'put' },
    { value: 'post', label: 'post' },
    { value: 'patch', label: 'patch' },
    { value: 'delete', label: 'delete' },
  ];

  // function normalize(rawSchema) {
  //   let normalizedSchema = {};
  
  //   rawSchema.forEach(({ name, ...rest }) => {
  //     normalizedSchema[name] = { ...rest };
  //   });
  //   //setSchema(normalizedSchema)
  //   return normalizedSchema;
  // }

  // const handleSchemaUpdate = (newSchema) => {
  //   setSchema(newSchema);
  // };
  
  const fetchResource = async (id) => {
    const resp = await apiFetchResource(id);
    setResource(resp);
    //setSchema(resp.schema)
    setLoading(false);
  };

  const updateResource =async (id,resource) =>{
    console.log(id)
    console.log(resource)
    const response = await apiUpdateResource(id, resource);
  }

  useEffect(() => {
    if (id) {
      fetchResource(id);
    }
  }, [id]);

  if (loading) {
    return <p>loading...</p>;
  }
  const initialValues = {
    namespace: resource.namespace,
    private: resource.private,
    protected: resource.protected,
    name: resource.name,
    type: resource.type,
    methods: resource.methods,
    endpoint: resource.endpoint,
    status: resource.status,
    schema: resource.schema,
  };
  
  // const scheme =(sche)=>{
  //   sche.forEach(element => {
  //     console.log("s");
  //     console.log(sche.indexOf(element))
  //   });
  // }
  return (
    <Layout title="Resources > Update">
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
          onSubmit={(values, { setSubmitting,resetForm }) => {
            // TODO Submit the form
           const resourceData = {
             ...values,
              //schema: normalize(schema),
           };
            updateResource(id,resourceData);
            resetForm();
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
                  options={typeOptions}
                  name="type"
                  value={
                    typeOptions
                      ? typeOptions.find(
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
                    options={methodsOptions.filter((opt) => {
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
                  options={statusOptions}
                  name="status"
                  value={
                    statusOptions
                      ? statusOptions.find(
                          (option) => option.value === values.status
                        )
                      : ''
                  }
                  onChange={(option) => setFieldValue('status', option.value)}
                  onBlur={handleBlur}
                />

                {/* { <SchemaBuilder
                  initialSchema={scheme(values.schema)}
                  onUpdateSchema={handleSchemaUpdate}
                /> } */}

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
