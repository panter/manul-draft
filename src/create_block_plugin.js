import { T } from '@panter/manul-i18n';
import { insertDataBlock } from 'megadraft';
import React from 'react';

import Immutable from 'immutable';

import ButtonAddPlugin from './components/button_add_plugin';
import PluginEditableComponent from './containers/plugin_editable_component';
import wrapInSimpleSchema from './utils/wrap_in_simpleschema';

const BlockComponent = ({
  isEditing,
  Component,
  blockPluginProps,
  data,
  container,
  schema,
  i18nNamespace,
  hasCustomHover
}) => {
  const dataMap = Immutable.fromJS(data);
  const component = (
    <Component {...blockPluginProps} {...data} isEditing={isEditing} />
  );

  // show the render-component when not in editmode or if the plugin has no schema
  if (!isEditing) {
    return component;
  }
  return (
    <PluginEditableComponent
      schema={schema}
      i18nNamespace={i18nNamespace}
      dataMap={dataMap}
      container={container}
      hasCustomHover={hasCustomHover}
    >
      {component}
    </PluginEditableComponent>
  );
};

const ButtonComponent = ({
  i18nNamespace,
  showDialogInitially,
  type,
  schema,
  onChange,
  editorState
}) => {
  const addPlugin = () => {
    const data = {
      type,
      showDialog: showDialogInitially,
      ...(schema ? schema.clean({}) : {})
    };

    // Calls the onChange method with the new state.
    onChange(insertDataBlock(editorState, data));
  };
  return (
    <ButtonAddPlugin
      onClick={e => {
        e.preventDefault();
        addPlugin({ onChange, editorState });
      }}
    >
      <T _id={[`${i18nNamespace}.add`, `${i18nNamespace}.label`]} />
    </ButtonAddPlugin>
  );
};
/* eslint react/display-name: 0*/
export default ({
  type,
  i18nNamespace = `cm.${type}`,
  schema: schemaDef = null,
  Component,
  hasCustomHover
}) => pppp => {
  const { blockPluginProps, isEditing } = pppp;
  const schema = schemaDef && wrapInSimpleSchema(schemaDef);

  const showDialogInitially = Boolean(schema); // if has schema

  return {
    // A unique plugin name used to identify the plugin and its blocks
    type,
    // React component to be rendered in the block sidebar
    buttonComponent: ({ onChange, editorState }) => (
      <ButtonComponent
        showDialogInitially={showDialogInitially}
        i18nNamespace={i18nNamespace}
        onChange={onChange}
        editorState={editorState}
        type={type}
        schema={schema}
      />
    ),
    // React component for rendering the content block
    blockComponent: ({ data, container }) => (
      <BlockComponent
        key={isEditing}
        schema={schema}
        isEditing={isEditing}
        data={data}
        container={container}
        Component={Component}
        blockPluginProps={blockPluginProps}
        hasCustomHover={hasCustomHover}
        i18nNamespace={i18nNamespace}
      />
    )
  };
};
