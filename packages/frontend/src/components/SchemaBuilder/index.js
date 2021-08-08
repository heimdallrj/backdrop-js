import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import forEach from 'lodash/forEach';

import TextInput from 'components/TextInput';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';

import { dataTypes, ctrlTypes } from 'config/resource';

import {
  Wrapper,
  Column,
  Row,
  AddNewButton,
  Button,
  CloseIcon,
} from './styled';

export default function SchemaBuilder({ initialSchema = [], onUpdateSchema }) {
  const { resources } = useSelector((state) => state.resources);

  const [schema, setSchema] = useState([]);
  const [relationship, setRelationship] = useState({});

  const [resourcesOpt, setResourcesOpt] = useState([]);
  const [selectorsOpt, setSelectorsOpt] = useState([]);

  const handleAddNew = () => {
    let _schema = [...schema];
    if (schema.length === 0) {
      _schema.push({
        name: '_id',
        label: 'ID',
        type: 'string',
        ctrl: null,
        length: false,
        auto: true,
        unique: true,
        required: true,
        readOnly: true,
      });
    } else {
      _schema.push({ name: '', label: '', type: '', ctrl: '', length: '' });
    }
    setSchema(_schema);
  };

  const handleOnChange = (index, field, value) => {
    const newSchema = schema;
    newSchema[index][field] = value;

    const dataType = dataTypes.find((e) => e.value === value);

    if (field === 'type') {
      const { defaultCtrl } = dataType;
      newSchema[index].ctrl = defaultCtrl;
    }

    if (field === 'ctrl' && value === 'Resource') {
      newSchema[index].type = '@resource';
    }

    if (dataType && dataType.defaultValue) {
      newSchema[index].defaultValue = dataType.defaultValue;
    }

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
    console.log('*', schema);
    onUpdateSchema(schema);
  };

  const onDelete = (target) => {
    const _schema = schema.filter((item, index) => index !== target);
    setSchema(_schema);
  };

  useEffect(() => {
    setSchema(initialSchema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {schema.map(
        (
          { auto, unique, required, readOnly, name, label, type, ctrl, length },
          index
        ) => {
          const lengthEnabled =
            length !== false ? ['number', 'string'].includes(type) : false;
          const ctrlEnabled = ctrl !== null;

          return (
            <Column key={String(index)}>
              <CloseIcon onClick={() => onDelete(index)} />
              <Row>
                <Checkbox
                  label="Required"
                  name="required[]"
                  checked={required || false}
                  errors={null}
                  touched={null}
                  onChange={(evt) =>
                    handleOnChange(
                      index,
                      'required',
                      readOnly ? required : evt.target.checked
                    )
                  }
                />

                <Checkbox
                  label="Auto"
                  name="auto[]"
                  checked={auto || false}
                  errors={null}
                  touched={null}
                  onChange={(evt) =>
                    handleOnChange(
                      index,
                      'auto',
                      readOnly ? auto : evt.target.checked
                    )
                  }
                />

                <Checkbox
                  label="Unique"
                  name="unique[]"
                  checked={unique || false}
                  errors={null}
                  touched={null}
                  onChange={(evt) =>
                    handleOnChange(
                      index,
                      'unique',
                      readOnly ? unique : evt.target.checked
                    )
                  }
                />
              </Row>

              <TextInput
                readOnly={readOnly}
                name="label[]"
                label="label"
                value={label}
                errors={null}
                touched={null}
                onChange={(evt) =>
                  handleOnChange(index, 'label', evt.target.value)
                }
                onBlur={() => {}}
                placeholder="eg. Title"
              />

              <TextInput
                readOnly={readOnly}
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
                isDisabled={readOnly}
                label="type"
                options={dataTypes}
                name="type[]"
                value={
                  dataTypes
                    ? dataTypes.find((option) => option.value === type)
                    : ''
                }
                onChange={(option) =>
                  handleOnChange(index, 'type', option.value)
                }
                onBlur={() => {}}
              />

              {ctrlEnabled && (
                <Select
                  isDisabled={readOnly}
                  label="Control"
                  options={ctrlTypes}
                  name="ctrl[]"
                  value={
                    ctrlTypes
                      ? ctrlTypes.find((option) => option.value === ctrl)
                      : ''
                  }
                  onChange={(option) =>
                    handleOnChange(index, 'ctrl', option.value)
                  }
                  onBlur={() => {}}
                />
              )}

              {ctrl === 'Resource' && (
                <Column>
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
                </Column>
              )}

              {lengthEnabled && (
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
              )}
            </Column>
          );
        }
      )}

      <AddNewButton onClick={handleAddNew}>+ Add new</AddNewButton>

      <Button type="button" onClick={onUpdateSchemaHandler}>
        Save
      </Button>
    </Wrapper>
  );
}
