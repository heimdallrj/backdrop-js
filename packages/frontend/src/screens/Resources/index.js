import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import {
  fetchAll as acFetchAllResources,
  deleteResource as acDeleteResource,
} from 'store/reducers/resourceSlice';

import SidePane from 'components/SidePane';
import Table from 'components/Table';

import Layout from 'components/Layout';

import {
  Wrapper,
  Button,
  AddDocumentIcon,
  DeleteIcon,
  LockClosedIcon,
  KeyIcon,
  Status,
  Method,
  NameWrap,
  FlexIcons,
} from './styled';

const columns = [
  { label: 'falgs', size: 5, visible: false },
  { label: 'ID', size: 3, align: 'center' },
  { label: 'namespace', size: 10, align: 'center' },
  { label: 'name', size: 57 },
  { label: 'type', size: 10, align: 'center' },
  { label: 'status', size: 10, align: 'center' },
  { label: 'actions', size: 5, visible: false },
];

export default function Resources() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { resources } = useSelector((state) => state.resources);

  const [rows, setRows] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  const fetchAllResources = () => dispatch(acFetchAllResources());

  const onClickResourceHandler = (id) => {
    history.push(`/resources/ext/${id}`);
  };

  const onCloseSidePaneHandler = () => {
    setSelectedResource(null);
  };

  const onDeleteclick = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to delete this resource?')) {
      dispatch(acDeleteResource(id));
    }
  };

  const onClickRowHandler = ({ id }) => {
    const resource = resources.find(({ _id }) => _id === id);
    setSelectedResource(resource);
  };

  const Name = ({ name, methods }) => (
    <NameWrap>
      <div style={{ marginRight: '30px' }}>{name}</div>
      <div>
        {methods.map((m) => (
          <Method key={m}>{m}</Method>
        ))}
      </div>
    </NameWrap>
  );

  useEffect(() => {
    fetchAllResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rowsFiltered = resources.map(
      (
        {
          _id,
          namespace,
          name,
          private: isPrivate,
          protected: isProtected,
          type,
          methods,
          status,
        },
        index
      ) => {
        return {
          id: _id,
          data: [
            {
              value: (
                <FlexIcons>
                  {isProtected && <KeyIcon />} {isPrivate && <LockClosedIcon />}
                </FlexIcons>
              ),
              align: 'center',
            },
            { value: index + 1, align: 'center' },
            { value: namespace, align: 'center' },
            { value: <Name name={name} methods={methods} /> },
            { value: type, align: 'center' },
            { value: <Status>{status}</Status>, align: 'center' },
            {
              value: (
                <FlexIcons>
                  <AddDocumentIcon
                    onClick={onClickResourceHandler.bind(null, _id)}
                  />
                  <DeleteIcon onClick={() => onDeleteclick(_id)} />
                </FlexIcons>
              ),
            },
          ],
        };
      }
    );
    setRows(rowsFiltered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  return (
    <Layout title="Resources">
      <Wrapper>
        <Link to={`/resources/create`}>
          <Button>Create a new resource</Button>
        </Link>

        <Table columns={columns} rows={rows} onClickRow={onClickRowHandler} />
      </Wrapper>

      <SidePane
        isOpen={!!selectedResource}
        backdropClicked={onCloseSidePaneHandler}
      >
        <pre>{JSON.stringify(selectedResource, null, 2)}</pre>
        <p>TODO Edit resource form goes here.</p>
      </SidePane>
    </Layout>
  );
}
