import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { create as apiCreate } from 'api';

import Layout from 'components/Layout';
import FormBuilder from 'components/FormBuilder';

export default function CrudCreate() {
  const history = useHistory();

  const { resource: name, id } = useParams();
  const { resources } = useSelector((state) => state.resources);
  const { user } = useSelector((state) => state.auth);

  const [resource, setResource] = useState(null);
  const [schema, setSchema] = useState([]);

  useEffect(() => {
    if (resources && resources.length > 0 && !resource) {
      const filtered = resources.find((r) => r.name === name);
      setResource(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, resources]);

  useEffect(() => {
    if (resource) {
      setSchema(resource.schema);
      if (id) fetch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const onSubmitHandler = async (formData, cb = () => {}) => {
    await apiCreate(name, {
      ...formData,
      author: { name: user.userName, id: user._id },
    });
    cb();
    history.push('/crud');
  };

  return (
    <Layout title={`CRUD > ${name} > CREATE`}>
      <FormBuilder
        schema={schema}
        submitBtnText="Create"
        onSubmit={onSubmitHandler}
      />
    </Layout>
  );
}
