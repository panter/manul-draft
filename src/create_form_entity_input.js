import React from 'react';

import EntityForm from './components/entity_form';
import wrapInSimpleSchema from './utils/wrap_in_simpleschema';

export default ({ schema }) => {
  const FormEntityInput = props => (
    <EntityForm {...props} schema={wrapInSimpleSchema(schema)} />);
  FormEntityInput.displayName = 'FormEntityInput';
  return FormEntityInput;
};
