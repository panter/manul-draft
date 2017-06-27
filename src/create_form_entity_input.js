import React from 'react';
import Draggable from 'react-draggable';

import DialogEntity from './components/dialog_entity';
import wrapInSimpleSchema from './utils/wrap_in_simpleschema';


export default ({ schema }) => {
  const FormEntityInput = props => (
    <Draggable>
      <DialogEntity {...props} schema={wrapInSimpleSchema(schema)} />
    </Draggable>);
  FormEntityInput.displayName = 'FormEntityInput';
  return FormEntityInput;
};
