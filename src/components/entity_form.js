import React from 'react';
import { T } from '@panter/manul-i18n';

import Immutable from 'immutable';
import FormEntity from './form_entity';
import Heading from './heading';
import Button from './button';

const EntityForm = ({ entityType, setEntity, cancelEntity, removeEntity, schema, ...props }) => {
  const dataMap = new Immutable.Map(props);
  return (
    <div
      style={{
        padding: 5,
        minWidth: 240,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: 15,
        }}
      >
        <Heading style={{ marginTop: 0 }} level={3}>
          <T>{`cm.entities.${entityType}`}</T>
        </Heading>
        <FormEntity
          additionalActions={
            <Button small onClick={removeEntity}>Remove</Button>
          }
          dataMap={dataMap.toJS()}
          schema={schema}
          autosave={false}
          onSubmit={(data) => {
            cancelEntity();
            setEntity(schema.clean(data));
          }}
        />
      </div>
    </div>

  );
};


export default EntityForm;
