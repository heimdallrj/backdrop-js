import { useState } from 'react';
import styled from 'styled-components';

import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Button from 'components/Button';

export const Wrapper = styled.div`
  border: 1px solid rgba(229, 231, 235, 1);
  padding: 10px;
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
          <div key={String(index)}>
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
          </div>
        );
      })}

      <p onClick={handleAddNew}>+ Add new</p>

      <Button type="button" onClick={() => onUpdateSchema(schema)}>
        Save
      </Button>
    </Wrapper>
  );
}
