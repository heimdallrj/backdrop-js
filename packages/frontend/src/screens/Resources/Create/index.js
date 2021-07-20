import { Formik, Field } from 'formik';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

import { create as apiCreateResource } from 'api/resources';

import Layout from 'components/Layout';

import CustomSelect from 'components/Select/CustomSelect';

import {
  Wrapper,
  FormWrap,
  Heading,
  Form,
  FormField,
  Label,
  Input,
} from './styled';

const typeOptions = [
  { value: 'default', label: 'default' },
  { value: 'proxy', label: 'proxy' },
  { value: 'static', label: 'static' },
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

const initialValues = {
  namespace: 'api',
  private: false,
  protected: false,
  name: '',
  type: 'default',
  methods: '',
  endpoint: '',
  status: 'draft',
};

export default function CreateResource() {
  const history = useHistory();

  const createResource = async (resource) => {
    await apiCreateResource(resource);
  };

  return (
    <Layout>
      <Wrapper>
        <Heading>Create a new Resource</Heading>

        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            createResource(values);
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
              <Form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <FormField>
                  <Label htmlFor="namespace">namespace</Label>
                  <Input type="text" name="namespace" readOnly value="api" />
                </FormField>

                <FormField>
                  <Label htmlFor="name">name</Label>
                  <Input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && errors.name && (
                    <p className="text-red-500 text-xs italic">{errors.name}</p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="type">type</Label>
                  <Select
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

                  {errors.type && touched.type && errors.type && (
                    <p className="text-red-500 text-xs italic">{errors.type}</p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="methods">methods</Label>
                  <Field
                    name="methods"
                    options={methodsOptions}
                    component={CustomSelect}
                    isMulti={true}
                  />
                </FormField>

                {values.type === 'proxy' && (
                  <FormField>
                    <Label htmlFor="endpoint">endpoint</Label>
                    <Input
                      type="text"
                      name="endpoint"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.endpoint}
                    />
                    {errors.endpoint && touched.endpoint && errors.endpoint && (
                      <p className="text-red-500 text-xs italic">
                        {errors.endpoint}
                      </p>
                    )}
                  </FormField>
                )}

                <FormField>
                  <Label htmlFor="status">status</Label>
                  <Select
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  {errors.status && touched.status && errors.status && (
                    <p className="text-red-500 text-xs italic">
                      {errors.status}
                    </p>
                  )}
                </FormField>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </Form>
            </FormWrap>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
}
