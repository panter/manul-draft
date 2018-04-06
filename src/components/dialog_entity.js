import React from 'react';
import { T } from '@panter/manul-i18n';

import Immutable from 'immutable';
import FormEntity from './form_entity';
import Heading from './heading';
import Button from './button';

const DialogEntity = ({
  entityType,
  setEntity,
  cancelEntity,
  removeEntity,
  schema,
  ...props
}) => {
  const dataMap = new Immutable.Map(props);
  let formRef;
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
          innerRef={el => (formRef = el)}
          i18nNamespace={`cm.entities.${entityType}`}
          additionalActions={
            <Button
              small
              onClick={() => {
                removeEntity();
              }}
            >
              Remove
            </Button>
          }
          model={dataMap.toJS()}
          schema={schema}
          autosave={false}
          onClick={event => {
            // dirty workaround for https://github.com/globocom/megadraft/issues/188
            event.target.focus();
          }}
          onSubmit={data => {
            cancelEntity();
            setEntity(schema.clean(data));
          }}
        />
      </div>
    </div>
  );
};

export default DialogEntity;
