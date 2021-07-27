import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import TextInput from 'components/TextInput';
import Select from 'components/Select';
import ButtonSource from 'components/Button';
import Checkbox from 'components/Checkbox';

export const Wrapper = styled.div`
  padding: 5px 10px 15px;
  // background: #ece7e7;
  border: 1px solid rgba(229, 231, 235, 1);
  margin: 20px 0;
`;

export const Row = styled.div`
  border: 1px solid rgba(229, 231, 235, 1);
  background: #fff;
  padding: 10px;
  margin: 6px 0;
`;

export const AddNewButton = styled.p`
  font-size: 0.8em;
  color: blue;
  cursor: pointer;
  padding: 5px 0 15px;
`;

export const Button = styled(ButtonSource)`
  background: #2c3039;
  font-size: 0.6em;
`;

const typeOptions = [
  { value: 'text', label: 'Text' },
  { value: 'multiline-text', label: 'Multiline Text' },
  { value: 'rich-text', label: 'RichText' },
  { value: 'resource', label: 'Resource' },
  // { value: 'date', label: 'Date' },
  // { value: 'boolean', label: 'Boolean' },
  // { value: 'array', label: 'Array' },
  // { value: 'object', label: 'Object' },
];

export default function SchemaBuilder({ initialSchema = [], onUpdateSchema }) {
  const { resources } = useSelector((state) => state.resources);

  const [schema, setSchema] = useState(initialSchema || []);

  const [resourcesOpt, setResourcesOpt] = useState([]);
  const [resourcesMap, setResourcesMap] = useState({});

  const handleAddNew = () => {
    setSchema([...schema, { name: '', type: 'string' }]);
  };

  const handleOnChange = (index, field, value) => {
    const newSchema = schema;
    newSchema[index][field] = value;
    setSchema(() => {
      return [...newSchema];
    });
  };

  const handleOnResourceRelationship = (name, resource) => {
    const newResourcesMap = { ...resourcesMap };
    newResourcesMap[name] = resource;
    setResourcesMap(newResourcesMap);
  };

  useEffect(() => {
    if (resources && resources.length > 0) {
      setResourcesOpt(
        resources.map(({ _id, name }) => ({ label: name, value: _id }))
      );
    }
  }, [resources]);

  return (
    <Wrapper>
      {schema.map(({ name, type, required, length }, index) => {
        return (
          <Row key={String(index)}>
            <Checkbox
              label="Required"
              name="required[]"
              checked={required || false}
              errors={null}
              touched={null}
              onChange={(evt) =>
                handleOnChange(index, 'required', evt.target.checked)
              }
            />

            <TextInput
              name="name[]"
              label="name"
              value={name}
              errors={null}
              touched={null}
              onChange={(evt) =>
                handleOnChange(index, 'name', evt.target.value)
              }
              onBlur={() => {}}
            />

            <Select
              label="type"
              options={typeOptions}
              name="type[]"
              value={
                typeOptions
                  ? typeOptions.find((option) => option.value === type)
                  : ''
              }
              onChange={(option) => handleOnChange(index, 'type', option.value)}
              onBlur={() => {}}
            />

            {type === 'resource' && (
              <Select
                label="Resource"
                options={resourcesOpt}
                name="type.resource[]"
                value={resourcesMap[name] || ''}
                onChange={(option) =>
                  handleOnResourceRelationship(name, option)
                }
                onBlur={() => {}}
              />
            )}

            <TextInput
              name="lenght[]"
              label="length"
              value={length}
              type="number"
              errors={null}
              touched={null}
              onChange={(evt) =>
                handleOnChange(index, 'length', evt.target.value)
              }
              onBlur={() => {}}
            />
          </Row>
        );
      })}

      <AddNewButton onClick={handleAddNew}>+ Add new</AddNewButton>

      <Button
        type="button"
        onClick={() => onUpdateSchema(schema, resourcesMap)}
      >
        Save
      </Button>
    </Wrapper>
  );
}
