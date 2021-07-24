import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { fetch as apiFetch, update as apiUpdate } from 'api';

import Layout from 'components/Layout';
import FormBuilder from 'components/FormBuilder';

export default function CrudUpdate() {
  const history = useHistory();
  const { resource: name, id } = useParams();
  const { resources } = useSelector((state) => state.resources);

  const [isLoading, setIsLoading] = useState(true);
  const [schema, setSchema] = useState({});
  const [data, setData] = useState({});

  const fetch = async (id) => {
    const _data = await apiFetch(name, id);
    setData(_data);
    setIsLoading(false);
  };

  const onSubmitHandler = async (formData, cb = () => {}) => {
    await apiUpdate(name, id, formData);
    cb();
    history.push('/crud');
  };

  useEffect(() => {
    if (id) fetch(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const resource = resources.find((r) => r.name === name);
    let _schema = {};
    if (resource) {
      _schema = resource.schema;
    }
    setSchema(_schema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  return (
    <Layout title={`CRUD > ${name} > UPDATE`}>
      {!isLoading && (
        <FormBuilder
          initialData={data}
          schema={schema}
          submitBtnText="Update"
          onSubmit={onSubmitHandler}
        />
      )}
    </Layout>
  );
}
