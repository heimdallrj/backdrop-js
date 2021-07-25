import { useState } from 'react';
import styled from 'styled-components';

import TextInput from 'components/TextInput';
import Select from 'components/Select';
import ButtonSource from 'components/Button';

export const Wrapper = styled.div`
  padding: 5px 10px 15px;
  background: #ece7e7;
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
  { value: 'string', label: 'String' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'array', label: 'Array' },
  { value: 'object', label: 'Object' },
];

export default function SchemaBuilder({ initialSchema = [], onUpdateSchema }) {
  const [schema, setSchema] = useState(initialSchema || []);

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

  return (
    <Wrapper>
      {schema.map(({ name, type }, index) => {
        return (
          <Row key={String(index)}>
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
              name="type"
              value={
                typeOptions
                  ? typeOptions.find((option) => option.value === type)
                  : ''
              }
              onChange={(option) => handleOnChange(index, 'type', option.value)}
              onBlur={() => {}}
            />
          </Row>
        );
      })}

      <AddNewButton onClick={handleAddNew}>+ Add new</AddNewButton>

      <Button type="button" onClick={() => onUpdateSchema(schema)}>
        Save
      </Button>
    </Wrapper>
  );
}
