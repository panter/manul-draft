import { T } from '@panter/manul-i18n';
import { isEqual } from 'lodash/fp';
import { shouldUpdate } from 'recompose';
import React from 'react';

import Button from './button';
import ButtonGroup from './button_group';
import FormPlugin from './form_plugin';
import HeadingDialog from './heading_dialog';
import fromContextOr from '../component_from_context_or';


const DialogPlugin = shouldUpdate(
  // we need that because draftjs/megadraft update quite often
  // which messes with things like the file-picker-dialog from the browser
  (props, nextProps) => !isEqual(props.dataMap, nextProps.dataMap),
)(fromContextOr('DialogPlugin', ({ i18nNamespace, dataMap, schema, cancel, remove, updateData }) => (
  <div>
    <HeadingDialog>
      <T>{`${i18nNamespace}.label`}</T>
    </HeadingDialog>
    <ButtonGroup>
      <Button onClick={remove} >Delete</Button>
      <Button onClick={cancel}>Close</Button>
    </ButtonGroup>
    <FormPlugin
      i18nNamespace={i18nNamespace}
      autosave
      model={dataMap.toJS()}
      schema={schema}
      onSubmit={updateData}
    />
  </div>
  ),
));

export default DialogPlugin;
