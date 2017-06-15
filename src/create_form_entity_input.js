import React from 'react';

import DialogEntity from './components/dialog_entity';
import wrapInSimpleSchema from './utils/wrap_in_simpleschema';

export default ({ schema }) => {
  const FormEntityInput = props => (
    <DialogEntity {...props} schema={wrapInSimpleSchema(schema)} />);
  FormEntityInput.displayName = 'FormEntityInput';
  return FormEntityInput;
};
