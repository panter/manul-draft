import React from 'react';
import { T } from '@panter/manul-i18n';
import { shouldUpdate, compose, withHandlers } from 'recompose';
import FormEntity from './form_entity';
import Heading from './heading';
import Button from './button';

const enhance = compose(
  shouldUpdate(() => false), // not perfect, but avoids some big troubles with file upload entities or so
  withHandlers({
    onSubmit: ({ cancelEntity, setEntity, schema }) => data => {
      cancelEntity();
      setEntity(schema.clean(data));
    }
  })
);
const FOCUS_FIX = event => {
  // dirty workaround for https://github.com/globocom/megadraft/issues/188
  event.target.focus();
};
const DialogEntity = enhance(
  ({
    entityType,
    onSubmit,
    removeEntity,
    schema,
    // unused
    /* eslint-disable no-unused-vars*/
    cancelError,
    cancelEntity,
    setEntity,
    editorState,
    entity,
    onChange,
    setError,
    /* eslint-enable no-unused-vars*/
    ...props
  }) => {
    const formData = schema.clean(props);

    return (
      <div
        style={{
          padding: 5,
          minWidth: 300
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: 15
          }}
        >
          <Heading style={{ marginTop: 0 }} level={3}>
            <T>{`cm.entities.${entityType}.label`}</T>
          </Heading>
          <FormEntity
            i18nNamespace={`cm.entities.${entityType}`}
            additionalActions={
              <Button small onClick={removeEntity}>
                Remove
              </Button>
            }
            model={formData}
            schema={schema}
            autosave={false}
            onClick={FOCUS_FIX}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    );
  }
);

export default DialogEntity;
