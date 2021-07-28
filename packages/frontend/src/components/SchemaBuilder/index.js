import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import forEach from 'lodash/forEach';

import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';

import { inputTypeOptions } from 'config';

import { Wrapper, Row, AddNewButton, Button } from './styled';

export default function SchemaBuilder({ initialSchema = [], onUpdateSchema }) {
  const { resources } = useSelector((state) => state.resources);

  const [schema, setSchema] = useState(initialSchema || []);
  const [relationship, setRelationship] = useState({});

  const [resourcesOpt, setResourcesOpt] = useState([]);
  const [selectorsOpt, setSelectorsOpt] = useState([]);

  const handleAddNew = () => {
    setSchema([...schema, { name: '', type: 'string', length: '' }]);
  };

  const handleOnChange = (index, field, value) => {
    const newSchema = schema;
    newSchema[index][field] = value;
    setSchema(() => {
      return [...newSchema];
    });
  };

  const onResourceRelationshipHandler = (name, resource) => {
    // Set selectors options
    const selectors = (resource && resource.fields) || [];
    setSelectorsOpt(selectors.map((field) => ({ label: field, value: field })));

    const newRelationship = { ...relationship };
    newRelationship[name] = resource;
    setRelationship(newRelationship);
  };

  const onResourceRelationshipSelectorHandler = (name, selector) => {
    const newRelationship = { ...relationship };
    newRelationship[name] = { ...newRelationship[name] };
    newRelationship[name]['selector'] = selector;
    setRelationship(newRelationship);
  };

  const onUpdateSchemaHandler = () => {
    forEach(relationship, ({ label, value, defaultValue, selector }, key) => {
      const schemaIndex = schema.findIndex(({ name }) => name === key);
      const _relationship = schema[schemaIndex].relationship || [];
      _relationship.push({
        type: 'resource',
        name: label,
        selector: (selector && selector.value) || null,
      });
      schema[schemaIndex]['relationship'] = _relationship;
    });
    onUpdateSchema(schema);
  };

  useEffect(() => {
    if (resources && resources.length > 0) {
      setResourcesOpt(
        resources.map(({ _id, name, schema }) => ({
          label: name,
          value: _id,
          fields: Object.keys(schema),
          selector: '',
          defaultValue: [],
        }))
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
              placeholder="eg. title"
            />

            <Select
              label="type"
              options={inputTypeOptions}
              name="type[]"
              value={
                inputTypeOptions
                  ? inputTypeOptions.find((option) => option.value === type)
                  : ''
              }
              onChange={(option) => handleOnChange(index, 'type', option.value)}
              onBlur={() => {}}
            />

            {type === 'Resource' && (
              <Row>
                <Select
                  label="Resource"
                  options={resourcesOpt}
                  name="type.resource[]"
                  value={relationship[name] || ''}
                  onChange={(option) =>
                    onResourceRelationshipHandler(name, option)
                  }
                  onBlur={() => {}}
                />

                <Select
                  label="Selector"
                  options={selectorsOpt}
                  name="type.resource.selectorId[]"
                  value={
                    (relationship &&
                      relationship[name] &&
                      relationship &&
                      relationship[name].selector) ||
                    ''
                  }
                  onChange={(option) =>
                    onResourceRelationshipSelectorHandler(name, option)
                  }
                  onBlur={() => {}}
                />
              </Row>
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
              placeholder="eg. 255"
            />
          </Row>
        );
      })}

      <AddNewButton onClick={handleAddNew}>+ Add new</AddNewButton>

      <Button type="button" onClick={onUpdateSchemaHandler}>
        Save
      </Button>
    </Wrapper>
  );
}
