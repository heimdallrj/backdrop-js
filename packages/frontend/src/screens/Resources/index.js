import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { fetchAll as acFetchAllResources,
  deleteResource as acDeleteResource
} from 'store/reducers/resourceSlice';

import SidePane from 'components/SidePane';
import Table from 'components/Table';

import Layout from 'components/Layout';

import {
  Wrapper,
  Heading,
  Button,
  AddDocumentIcon,
  DeleteIcon,
  ActionWrap,
  Status,
} from './styled';

const columns = [
  { label: 'ID', align: 'center' },
  { label: 'namespace', align: 'center' },
  { label: 'name', width: '200px' },
  { label: 'type' },
  { label: 'status' },
  { label: 'actions', visibility: 'hidden' },
];

export default function Resources() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { resources } = useSelector(state => state.resources);

  const [rows, setRows] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  const fetchAllResources = () => dispatch(acFetchAllResources());

  const onClickResourceHandler = (id) => {
    history.push(`/resources/ext/${id}`);
  };

  const onCloseSidePaneHandler = () => {
    setSelectedResource(null);
  };

  const onDeleteclick=(id) =>{
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Do you want to delete this resource?'))
    {
      dispatch(acDeleteResource(id));
    }    
  };

  const onClickRowHandler = ({ id }) => {
    const resource = resources.find(({ _id }) => _id === id);
   setSelectedResource(resource);
  };

  useEffect(() => {
    fetchAllResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rowsFiltered = resources.map(
      ({ _id, namespace, name, type, status }, index) => {
        return {
          id: _id,
          data: [
            { value: index + 1, align: 'center' },
            { value: namespace, align: 'center' },
            { value: name },
            { value: type },
            { value: <Status>{status}</Status> },
            {
              value: (
                <ActionWrap>
                  <AddDocumentIcon
                    onClick={onClickResourceHandler.bind(null, _id)}
                  />
                  <DeleteIcon onClick={onDeleteclick.bind(null,_id)} />
                </ActionWrap>
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
    <Layout>
      <Wrapper>
        <Heading>Resources</Heading>

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
