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
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="namespace"
                >
                  namespace
                </label>
                <input
                  type="text"
                  name="namespace"
                  readOnly
                  value="api"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>

              <div>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                {errors.name && touched.name && errors.name && (<p className="text-red-500 text-xs italic">{errors.name}</p>)}
              </div>

              <div>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="type"
                >
                  type
                </label>
                <div className="relative">
                  <Select
                    options={typeOptions}
                    name="type"
                    value={typeOptions ? typeOptions.find(option => option.value === values.type) : ''}
                    onChange={(option) => setFieldValue('type', option.value)}
                    onBlur={handleBlur}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                {errors.type && touched.type && errors.type && (<p className="text-red-500 text-xs italic">{errors.type}</p>)}
              </div>

              <div>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="methods"
                >
                  methods
                </label>
                <div className="relative">
                  <Field
                    name="methods"
                    options={methodsOptions}
                    component={CustomSelect}
                    isMulti={true}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="endpoint"
                >
                  endpoint
                </label>
                <input
                  type="text"
                  name="endpoint"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.endpoint}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                {errors.endpoint && touched.endpoint && errors.endpoint && (<p className="text-red-500 text-xs italic">{errors.endpoint}</p>)}
              </div>

              <div>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="status"
                >
                  status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
                {errors.status && touched.status && errors.status && (<p className="text-red-500 text-xs italic">{errors.status}</p>)}
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
