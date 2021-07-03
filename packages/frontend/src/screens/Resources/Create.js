import { Formik, Field } from 'formik';
import Select from 'react-select';

import { create as apiCreateResource } from 'api/resources';

import CustomSelect from 'components/CustomSelect';

const typeOptions = [
  { value: 'default', label: 'default' },
  { value: 'proxy', label: 'proxy' },
  { value: 'static', label: 'static' }
];

const methodsOptions = [
  { value: 'get', label: 'get' },
  { value: 'put', label: 'put' },
  { value: 'post', label: 'post' },
  { value: 'patch', label: 'patch' },
  { value: 'delete', label: 'delete' }
];

const initialValues = { namespace: '', name: '', type: 'default', methods: '', endpoint: '', status: '' };

export default function CreateResource() {
  const createResource = async (resource) => {
    await apiCreateResource(resource);
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          createResource(values);
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
          <div>
            {isSubmitting && <p>creating..</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <p>namespace</p>
                <input
                  type="text"
                  name="namespace"
                  readOnly
                  value="api"
                />
              </div>

              <div>
                <p>name</p>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && errors.name}
              </div>

              <div>
                <p>type</p>
                <Select
                  options={typeOptions}
                  name="type"
                  value={typeOptions ? typeOptions.find(option => option.value === values.type) : ''}
                  onChange={(option) => setFieldValue('type', option.value)}
                  onBlur={handleBlur}
                />
                {errors.type && touched.type && errors.type}
              </div>

              <div>
                <Field
                  className="custom-select"
                  name="methods"
                  options={methodsOptions}
                  component={CustomSelect}
                  isMulti={true}
                />
              </div>

              <div>
                <p>endpoint</p>
                <input
                  type="text"
                  name="endpoint"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.endpoint}
                />
                {errors.endpoint && touched.endpoint && errors.endpoint}
              </div>

              <div>
                <p>status</p>
                <input
                  type="text"
                  name="status"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.status}
                />
                {errors.status && touched.status && errors.status}
              </div>

              <div>
                <button type="submit" disabled={isSubmitting}>
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
