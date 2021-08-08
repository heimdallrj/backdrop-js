import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
  const [resourcesOpt, setResourcesOpt] = useState([]);

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
      _schema.push({
        name: '',
        label: '',
        type: '',
        ctrl: '',
        length: '',
        relationship: {},
      });
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

  const handleRelationshipHandler = (name, resource) => {
    const targetIndex = schema.findIndex((s) => s.name === name);
    const _schema = [...schema];
    _schema[targetIndex].relationship = {
      ..._schema[targetIndex].relationship,
      type: 'resource',
      name: resource.value,
      selector: '',
    };
    setSchema(_schema);
  };

  const onSelectorHandler = (name, selector) => {
    const targetIndex = schema.findIndex((s) => s.name === name);
    const _schema = [...schema];
    _schema[targetIndex].relationship = {
      ..._schema[targetIndex].relationship,
      selector: selector.value,
    };
    setSchema(_schema);
  };

  const onUpdateSchemaHandler = () => {
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
        resources.map(({ name, schema }) => ({
          label: name,
          value: name,
          fields: Object.keys(schema)
            .filter((f) => f !== '_id')
            .map((f) => ({ label: f, value: f })),
        }))
      );
    }
  }, [resources]);

  return (
    <Wrapper>
      {schema.map(
        (
          {
            auto,
            unique,
            required,
            readOnly,
            name,
            label,
            type,
            ctrl,
            length,
            relationship = {},
          },
          index
        ) => {
          const lengthEnabled =
            length !== false ? ['number', 'string'].includes(type) : false;
          const ctrlEnabled = ctrl !== null;

          const relationshipResource = resourcesOpt
            ? resourcesOpt.find((option) => option.value === relationship.name)
            : '';
          const relationshipSelector =
            relationship && relationship.selector
              ? { label: relationship.selector, value: relationship.selector }
              : '';
          const relationshipSelectorOptions =
            (relationshipSelector && relationshipSelector.fields) || [];

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
                    value={relationshipResource}
                    onChange={(option) =>
                      handleRelationshipHandler(name, option)
                    }
                    onBlur={() => {}}
                  />

                  <Select
                    label="Selector"
                    options={relationshipSelectorOptions}
                    name="type.resource.selectorId[]"
                    value={relationshipSelector}
                    onChange={(option) => onSelectorHandler(name, option)}
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
